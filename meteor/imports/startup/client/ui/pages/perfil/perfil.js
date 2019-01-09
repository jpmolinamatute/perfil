import './perfil.html';
import './classifications.js';
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
                E: 1,
                Ry: 1
            },
            reactive: false
        });
    },
    both() {
        return Template.instance().perfilSelected.get() && Template.instance().materialSelected.get();
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
