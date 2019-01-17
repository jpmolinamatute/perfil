import './perfil.html';
import './classifications.js';
import { perfil, units, materials } from '../../../../both/collections.js';
import { PerfilClass, BuiltIn, CustomPerfil } from '../../components/perfilClass';

// @TODO: remove weight and area from collection

// Template.perfil.onRendered(function perfilonRendered() {
//     console.log(perfil.find().fetch());
//     console.log(units.find().fetch());
// });

function getValue(rawValue) {
    let value = false;
    const re = /\d\.\d/;

    if (rawValue.length > 0) {
        if (re.test(rawValue)) {
            value = Number.parseFloat(rawValue);
        } else {
            value = Number.parseInt(rawValue, 10);
        }

        value = Number.isNaN(value) ? false : value;
        value = value <= 0 ? false : value;
    }

    return value;
}

function checkValue(value, element) {
    const className = 'is-invalid';
    if (typeof value === 'number') {
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    }
}

Template.perfil.events({
    'change select#perfil-list': (event, templateInstance) => {
        const perfilName = event.currentTarget.value.length > 0 ? event.currentTarget.value : false;
        const obj = typeof perfilName === 'string' ? new BuiltIn(perfilName) : false;
        templateInstance.perfilSelected.set(perfilName);
        templateInstance.perfilClass.set(obj);
    },
    'change select#material-list': (event, templateInstance) => {
        const materialName = event.currentTarget.value.length > 0 ? event.currentTarget.value : false;
        templateInstance.materialSelected.set(materialName);
    },
    'change input#perfil-custom': (event, templateInstance) => {
        const checked = event.currentTarget.checked;
        templateInstance.perfilSelected.set(false);
        templateInstance.perfilClass.set(false);
        templateInstance.perfilCustom.set(checked);
    },
    'click button#save-custom': (event, templateInstance) => {
        const d = document.getElementById('custom-d');
        const bf = document.getElementById('custom-bf');
        const tw = document.getElementById('custom-tw');
        const tf = document.getElementById('custom-tf');
        const name = document.getElementById('custom-name').value;
        const validName = typeof name === 'string' && name.length > 0;

        const dValue = getValue(d.value);
        checkValue(dValue, d);

        const bfValue = getValue(bf.value);
        checkValue(bfValue, bf);

        const twValue = getValue(tw.value);
        checkValue(twValue, tw);

        const tfValue = getValue(tf.value);
        checkValue(tfValue, tf);

        if (typeof dValue === 'number'
            && typeof bfValue === 'number'
            && typeof twValue === 'number'
            && typeof tfValue === 'number'
            && validName) {
            const obj = new CustomPerfil(name, bfValue, tfValue, dValue, twValue);
            templateInstance.perfilClass.set(obj);
            templateInstance.perfilSelected.set(name);
        } else {
            templateInstance.perfilClass.set(false);
        }
        event.stopPropagation();
    }
});

Template.perfil.helpers({
    perfilCustom() {
        return Template.instance().perfilCustom.get();
    },
    canDownloadCustom() {
        return Template.instance().perfilClass.get() && Template.instance().perfilSelected.get();
    },
    perfilList() {
        return perfil.find({}, { fields: { _id: 1 }, sort: { _id: 1 } });
    },
    materialList() {
        return materials.find({}, { fields: { _id: 1 }, sort: { _id: 1 } });
    },
    perfilSelected() {
        return Template.instance().perfilSelected.get() || Template.instance().perfilCustom.get();
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
    this.perfilCustom = new ReactiveVar(false);
    this.perfilClass = new ReactiveVar(false, (old, newer) => {
        let equal = false;
        if (old instanceof PerfilClass && newer instanceof PerfilClass) {
            equal = old.name === newer.name;
        }
        return equal;
    });
});
