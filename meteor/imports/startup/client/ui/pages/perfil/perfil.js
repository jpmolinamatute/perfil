import './perfil.html';
import { perfil, units, materials } from '../../../../both/collections.js';
import PerfilClass from '../../components/perfilClass';

// Template.perfil.onRendered(function perfilonRendered() {
//     console.log(perfil.find().fetch());
//     console.log(units.find().fetch());
// });

Template.perfil.events({
    'change select#perfil-list': (event, templateInstance) => {
        const perfilName = event.currentTarget.value.length > 0 ? event.currentTarget.value : false;
        const obj = typeof perfilName === 'string' ? new PerfilClass(perfilName) : false;
        templateInstance.perfilSelected.set(perfilName);
        templateInstance.perfilClass.set(obj);
    },
    'change select#material-list': (event, templateInstance) => {
        const materialName = event.currentTarget.value.length > 0 ? event.currentTarget.value : false;
        templateInstance.materialSelected.set(materialName);
    }
});

Template.perfil.helpers({
    perfilList() {
        return perfil.find({}, { fields: { _id: 1 }, sort: { _id: 1 } });
    },
    materialList() {
        return materials.find({}, { fields: { _id: 1 }, sort: { _id: 1 } });
    },
    perfilSelected() {
        return Template.instance().perfilSelected.get();
    },
    materialSelected() {
        return Template.instance().materialSelected.get();
    },

    isPerfilSelected(current) {
        return Template.instance().perfilSelected.get() === current;
    },
    isMaterialSelected(current) {
        return Template.instance().materialSelected.get() === current;
    },
    perfilRow() {
        const perfilClass = Template.instance().perfilClass.get();
        return perfilClass instanceof PerfilClass ? perfilClass.getData() : false;
    },
    materialRow() {
        const perfilInstance = Template.instance().materialSelected.get();
        return materials.findOne({ _id: perfilInstance }, {
            fields: {
                Fu: 1,
                Fy: 1,
                E: 1
            },
            reactive: false
        });
    },
    section() {
        let section = false;
        const both = Template.instance().perfilSelected.get() && Template.instance().materialSelected.get();
        if (both) {
            section = {};
            const materialInstance = Template.instance().materialSelected.get();
            const material = materials.findOne({ _id: materialInstance }, {
                fields: {
                    Fu: 1,
                    Fy: 1,
                    E: 1
                },
                reactive: false
            });
            const perfilInstance = Template.instance().perfilSelected.get();
            const singlePerfil = perfil.findOne({ _id: perfilInstance }, {
                fields: {
                    _id: 0,
                    'd.standard': 1,
                    'bf.standard': 1,
                    'tw.standard': 1,
                    'tf.standard': 1,
                    'r.standard': 1,
                    'area.standard': 1,
                    'weight.standard': 1
                },
                reactive: false
            });
            const eala = (singlePerfil.bf.standard / 2) / singlePerfil.tf.standard;
            const ealma = (singlePerfil.d.standard - (2 * (singlePerfil.tf.standard + singlePerfil.r.standard))) / singlePerfil.tw.standard;
            const V = Math.sqrt(material.E / material.Fy);
            const lealacomp = 0.56 * V;
            const lealmacomp = 1.49 * V;
            const lealaflexcn = 0.38 * V;
            const lealmaflexcn = 3.76 * V;
            const lealmaflexne = 5.70 * V;
            const slender = 'Slender element';
            const nonslender = 'Nonslender element';
            const compact = 'Compact element';
            const noncompact = 'Noncompact element';

            if (eala <= lealacomp) {
                section.flange1 = nonslender;
            } else {
                section.flange1 = slender;
            }

            if (ealma <= lealmacomp) {
                section.web1 = nonslender;
            } else {
                section.web1 = slender;
            }

            if (eala <= lealacomp && ealma <= lealmacomp) {
                section.section1 = nonslender;
            } else {
                section.section1 = slender;
            }

            if (eala <= lealaflexcn) {
                section.flange2 = compact;
            } else if (eala <= V) {
                section.flange2 = noncompact;
            } else {
                section.flange2 = slender;
            }

            if (ealma <= lealmaflexcn) {
                section.web2 = compact;
            } else if (ealma <= lealmaflexne) {
                section.web2 = noncompact;
            } else {
                section.web2 = slender;
            }


            if (section.flange2 === compact) {
                if (section.web2 === compact) {
                    section.section2 = compact;
                } else if (section.web2 === noncompact) {
                    section.section2 = noncompact;
                } else {
                    section.section2 = slender;
                }
            } else if (section.flange2 === noncompact) {
                if (section.web2 === compact || section.web2 === noncompact) {
                    section.section2 = noncompact;
                } else {
                    section.section2 = slender;
                }
            } else {
                section.section2 = slender;
            }

            console.log(`eala: ${eala} bf: ${singlePerfil.bf.standard} tf: ${singlePerfil.tf.standard}`);
            console.log(`ealma: ${ealma}`);
            console.log(`lealacomp: ${lealacomp}`);
            console.log(`lealmacomp: ${lealmacomp}`);
            console.log(`V: ${V}`);
        }

        return section;
    },
    getunit(_id) {
        const unitObj = units.findOne({ _id });
        return unitObj.unit;
    },
    perfilFile() {
        let obj = false;
        const perfilClass = Template.instance().perfilClass.get();
        if (perfilClass instanceof PerfilClass) {
            obj = perfilClass.getBlob();
        }
        return obj;
    },
    fileName() {
        const perfilInstance = Template.instance().perfilSelected.get();
        return typeof perfilInstance === 'string' ? `${perfilInstance}.scr` : false;
    }
});

Template.perfil.onCreated(function perfilononCreated() {
    this.perfilSelected = new ReactiveVar(false);
    this.materialSelected = new ReactiveVar(false);
    this.perfilClass = new ReactiveVar(false, (old, newer) => {
        let equal = false;
        if (old instanceof PerfilClass && newer instanceof PerfilClass) {
            equal = old.name === newer.name;
        }
        return equal;
    });
});
