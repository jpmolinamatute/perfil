import './classifications.html';

const SLENDER = 'Slender Element';
const NONSLENDER = 'Nonslender Element';
const COMPACT = 'Compact Element';
const NONCOMPACT = 'Noncompact Element';
const HIGHLYDUCTILE = 'Highly ductile';
const MODERATELYDUCTILE = 'Moderately ductile';
const NONDUCTILE = 'Nonductile';

// Template.classifications.events({

// });


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
        const ealma = (this.perfil.d - (2 * (this.perfil.tf + this.perfil.r))) / this.perfil.tw;
        const lealmaD = 1.57 * this.square;
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
    }
});

Template.classifications.onCreated(function classificationsonCreated() {
    this.data.V = Math.sqrt(this.data.material.E / this.data.material.Fy);
    this.data.square = Math.sqrt(this.data.material.E / (this.data.material.Fy * this.data.material.Ry));
    // const lealaHD = 0.32 * this.data.square;
    const lealaMD = 0.4 * this.data.square;
    const lealmaD = 1.57 * this.data.square;
});
