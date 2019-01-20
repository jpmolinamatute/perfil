import './classifications.html';

const SLENDER = 'Slender Element';
const NONSLENDER = 'Nonslender Element';
const COMPACT = 'Compact Element';
const NONCOMPACT = 'Noncompact Element';
const HIGHLYDUCTILE = 'Highly ductile';
const MODERATELYDUCTILE = 'Moderately ductile';
const NONDUCTILE = 'Nonductile';


Template.classifications.helpers({
    classType() {
        return this.perfilCustom ? 'Built-up' : 'Rolled';
    },
    flange1() {
        const eala = (this.perfil.bf / 2) / this.perfil.tf;
        let V;
        let lealacomp;
        if (this.perfilCustom) {
            const kc = 4 / Math.sqrt((this.d - 2 * this.perfil.tf) / this.perfil.tw);
            V = Math.sqrt(kc * (this.material.E / this.material.Fy));
            lealacomp = 0.64 * V;
        } else {
            V = Math.sqrt(this.material.E / this.material.Fy);
            lealacomp = 0.56 * V;
        }

        return eala <= lealacomp ? NONSLENDER : SLENDER;
    },
    web1() {
        const V = Math.sqrt(this.material.E / this.material.Fy);
        const ealma = (this.perfil.d - (2 * (this.perfil.tf + this.perfil.r))) / this.perfil.tw;
        const lealmacomp = 1.49 * V;
        return ealma <= lealmacomp ? NONSLENDER : SLENDER;
    },
    section1() {
        const eala = (this.perfil.bf / 2) / this.perfil.tf;
        const V = Math.sqrt(this.material.E / this.material.Fy);
        const ealma = (this.perfil.d - (2 * (this.perfil.tf + this.perfil.r))) / this.perfil.tw;

        const lealmacomp = 1.49 * V;
        let lealacomp;
        if (this.perfilCustom) {
            const kc = 4 / Math.sqrt((this.d - 2 * this.perfil.tf) / this.perfil.tw);
            lealacomp = 0.64 * Math.sqrt(kc * this.material.E / this.material.Fy);
        } else {
            lealacomp = 0.56 * V;
        }

        return eala <= lealacomp && ealma <= lealmacomp ? NONSLENDER : SLENDER;
    },
    flange2() {
        let clas = false;
        const eala = (this.perfil.bf / 2) / this.perfil.tf;
        const V = Math.sqrt(this.material.E / this.material.Fy);
        const lealaflexcn = 0.38 * V;
        let lealaflexne;
        if (this.perfilCustom) {
            const kc = 4 / Math.sqrt((this.d - 2 * this.perfil.tf) / this.perfil.tw);
            lealaflexne = 0.95 * Math.sqrt(kc * (this.material.E / this.material.Fy));
        } else {
            lealaflexne = V;
        }


        if (eala <= lealaflexcn) {
            clas = COMPACT;
        } else if (eala <= lealaflexne) {
            clas = NONCOMPACT;
        } else {
            clas = SLENDER;
        }
        return clas;
    },
    web2() {
        let clas = false;
        const V = Math.sqrt(this.material.E / this.material.Fy);
        const ealma = (this.perfil.d - (2 * (this.perfil.tf + this.perfil.r))) / this.perfil.tw;
        const lealmaflexcn = 3.76 * V;
        const lealmaflexne = 5.70 * V;

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
        const square = Math.sqrt(this.material.E / (this.material.Fy * this.material.Ry));
        const lealaHD = 0.32 * square;
        const lealaMD = 0.4 * square;

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
        const ealma = (this.perfil.d - (2 * (this.perfil.tf + this.perfil.r))) / this.perfil.tw;
        const square = Math.sqrt(this.material.E / (this.material.Fy * this.material.Ry));
        const lealmaD = 1.57 * square;
        const phic = this.phi;
        const Pu = this.pu;
        let txt = false;


        if (this.needInput && phic >= 0.75) {
            const Py = this.material.Ry * this.material.Fy * this.perfil.area;
            const aConstant = Math.sqrt(this.material.E / (this.material.Ry * this.material.Fy));
            let leesphd;
            let leespmd;
            const ca = Pu / (phic * Py);
            console.log('#########################################################################################');
            console.log(' ');
            console.log('Py = Ry * Fy * Area');
            console.log(`${Py} = ${this.material.Ry} * ${this.material.Fy} * ${this.perfil.area}`);
            console.log('Ca = Pu /( Phic * Py)');
            console.log(`${ca} = ${Pu} /(${phic} * ${Py})`);

            if (ca <= 0.114) {
                console.log('Ca es MENOR O IGUAL a 0.114');
                leesphd = (2.57 * aConstant) * (1 - 1.04 * ca);
                leespmd = (3.96 * aConstant) * (1 - 3.04 * ca);
            } else {
                console.log('Ca es MAYOR a 0.114');
                leesphd = (0.88 * aConstant) * (2.68 - ca);
                leespmd = (1.29 * aConstant) * (2.12 - ca);
            }
            console.log(`leesphd = ${leesphd}`);
            console.log(`leespmd = ${leespmd}`);
            console.log(`ealma = ${ealma}`);


            console.log(`before floor leesphd is ${leesphd}`);

            if (leesphd <= lealmaD) {
                leesphd = lealmaD;
            }
            if (leespmd <= lealmaD) {
                leespmd = lealmaD;
            }
            console.log(`after floor leesphd is ${leesphd}`);
            console.log(ealma, leesphd, ealma <= leesphd);
            if (ealma <= leesphd) {
                txt = HIGHLYDUCTILE;
            } else if (ealma > leesphd && ealma <= leespmd) {
                txt = MODERATELYDUCTILE;
            } else {
                txt = NONDUCTILE;
            }
            console.log(' ');
            console.log('#########################################################################################');
        } else if (ealma <= lealmaD) {
            txt = HIGHLYDUCTILE;
        } else {
            txt = NONDUCTILE;
        }

        return txt;
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
    }
});

// Template.classifications.events({
//     'click div#both-info': function clickBackground(event, templateInstance) {
//         console.log(templateInstance.data);
//         templateInstance.ready = false;
//     }
// });
