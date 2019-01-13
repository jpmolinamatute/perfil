import './classifications.html';

const SLENDER = 'Slender Element';
const NONSLENDER = 'Nonslender Element';
const COMPACT = 'Compact Element';
const NONCOMPACT = 'Noncompact Element';
const HIGHLYDUCTILE = 'Highly ductile';
const MODERATELYDUCTILE = 'Moderately ductile';
const NONDUCTILE = 'Nonductile';

Template.classifications.events({
    'change input#user-input': (event, templateInstance) => {
        templateInstance.needInput.set(event.currentTarget.checked);
    },
    'keyup input#pu': (event, templateInstance) => {
        const input = event.currentTarget.value;
        let value = 0;

        if (input.length > 0 && !Number.isNaN(input)) {
            value = Number.parseInt(input, 10);
        }

        templateInstance.pu.set(value);
    },
    'keyup input#phi': (event, templateInstance) => {
        const input = event.currentTarget.value;
        let value = 0.9;
        if (input.length >= 0.75 && !Number.isNaN(input)) {
            value = Number.parseInt(input, 10);
        }
        templateInstance.phi.set(value);
    }
});


Template.classifications.helpers({
    flange1() {
        const eala = (this.perfil.bf / 2) / this.perfil.tf;
        const lealacomp = 0.56 * this.V;

        return eala <= lealacomp ? NONSLENDER : SLENDER;
    },
    web1() {
        const ealma = (this.perfil.d - (2 * (this.perfil.tf + this.perfil.r))) / this.perfil.tw;
        const lealmacomp = 1.49 * this.V;

        return ealma <= lealmacomp ? NONSLENDER : SLENDER;
    },
    section1() {
        const eala = (this.perfil.bf / 2) / this.perfil.tf;
        const lealacomp = 0.56 * this.V;
        const ealma = (this.perfil.d - (2 * (this.perfil.tf + this.perfil.r))) / this.perfil.tw;
        const lealmacomp = 1.49 * this.V;

        return eala <= lealacomp && ealma <= lealmacomp ? NONSLENDER : SLENDER;
    },
    flange2() {
        let clas = false;
        const eala = (this.perfil.bf / 2) / this.perfil.tf;
        const lealaflexcn = 0.38 * this.V;
        if (eala <= lealaflexcn) {
            clas = COMPACT;
        } else if (eala <= this.V) {
            clas = NONCOMPACT;
        } else {
            clas = SLENDER;
        }
        return clas;
    },
    web2() {
        let clas = false;
        const ealma = (this.perfil.d - (2 * (this.perfil.tf + this.perfil.r))) / this.perfil.tw;
        const lealmaflexcn = 3.76 * this.V;
        const lealmaflexne = 5.70 * this.V;

        if (ealma <= lealmaflexcn) {
            clas = COMPACT;
        } else if (ealma <= lealmaflexne) {
            clas = NONCOMPACT;
        } else {
            clas = SLENDER;
        }
        return clas;
    },
    section2(flange, web) {
        let clas = false;
        if (flange === COMPACT) {
            if (web === COMPACT) {
                clas = COMPACT;
            } else if (web === NONCOMPACT) {
                clas = NONCOMPACT;
            } else {
                clas = SLENDER;
            }
        } else if (flange === NONCOMPACT) {
            if (web === COMPACT || web === NONCOMPACT) {
                clas = NONCOMPACT;
            } else {
                clas = SLENDER;
            }
        } else {
            clas = SLENDER;
        }
        return clas;
    },
    flange3() {
        let clas = false;
        const eala = (this.perfil.bf / 2) / this.perfil.tf;
        const lealaHD = 0.32 * this.square;
        const lealaMD = 0.4 * this.square;

        if (eala <= lealaHD) {
            clas = HIGHLYDUCTILE;
        } else if (eala <= lealaMD) {
            clas = MODERATELYDUCTILE;
        } else {
            clas = NONDUCTILE;
        }
        return clas;
    },
    web3() {
        const needinput = Template.instance().needInput.get();
        const ealma = (this.perfil.d - (2 * (this.perfil.tf + this.perfil.r))) / this.perfil.tw;
        let lealmaD = 1.57 * this.square;
        const phic = Template.instance().phi.get();
        const Pu = Template.instance().pu.get();

        if (needinput && phic >= 0.75) {
            const Py = this.material.Ry * this.material.Fy * this.perfil.area;

            let leesp;
            const ca = Pu / (phic * Py);
            console.log('#########################################################################################');
            console.log(' ');
            console.log('Py = Ry * Fy * Area');
            console.log(`${Py} = ${this.material.Ry} * ${this.material.Fy} * ${this.perfil.area}`);
            console.log('Ca = Pu /( Phic * Py)');
            console.log(`${ca} = ${Pu} /(${phic} * ${Py})`);

            if (ca <= 0.114) {
                console.log('Ca es MENOR O IGUAL a 0.114');
                leesp = (2.57 * Math.sqrt(this.material.E / (this.material.Ry * this.material.Fy))) * (1 - 1.04 * ca);
            } else {
                console.log('Ca es MAYOR a 0.114');
                leesp = (0.88 * Math.sqrt(this.material.E / (this.material.Ry * this.material.Fy))) * (2.68 - ca);
            }
            console.log(`leesp = ${leesp}`);
            console.log(' ');
            console.log('#########################################################################################');

            if (typeof leesp === 'number' && leesp >= lealmaD) {
                lealmaD = leesp;
            }
        }


        return ealma <= lealmaD ? HIGHLYDUCTILE : NONDUCTILE;
    },
    section3(flange, web) {
        let clas = false;
        if (flange === HIGHLYDUCTILE && web === HIGHLYDUCTILE) {
            clas = HIGHLYDUCTILE;
        } else if (flange === NONDUCTILE || web === NONDUCTILE) {
            clas = NONDUCTILE;
        } else {
            clas = MODERATELYDUCTILE;
        }

        return clas;
    },
    userInput() {
        return Template.instance().needInput.get();
    },
    invalid() {
        const pu = Template.instance().pu.get();
        const Py = this.material.Ry * this.material.Fy * this.perfil.area;
        return pu > Py;
    }
});

Template.classifications.onCreated(function classificationsonCreated() {
    this.needInput = new ReactiveVar(false);
    this.pu = new ReactiveVar(0);
    this.phi = new ReactiveVar(0.9);
    this.data.V = Math.sqrt(this.data.material.E / this.data.material.Fy);
    this.data.square = Math.sqrt(this.data.material.E / (this.data.material.Fy * this.data.material.Ry));
});
