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

function setPerfilName(perfilName, templateInstance) {
    const obj = new BuiltIn(perfilName);
    templateInstance.perfilSelected.set(perfilName);
    templateInstance.perfilClass.set(obj);
    templateInstance.searchPatter.set(false);
    document.getElementById('show-perfil-list').style.display = 'none';
    document.getElementById('custom-name').value = perfilName;
}

Template.perfil.events({
    'focus input#custom-name': (event, templateInstance) => {
        const custom = templateInstance.perfilCustom.get();
        if (!custom) {
            const list = document.getElementById('show-perfil-list');
            const width = document.getElementById('custom-name').clientWidth;
            list.style.display = 'block';
            list.style.width = `${width}px`;
        }
    },
    'click ul#perfil-list button': (event, templateInstance) => {
        const perfilName = event.currentTarget.dataset.value;
        setPerfilName(perfilName, templateInstance);
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
    },
    'change input#user-input': (event, templateInstance) => {
        templateInstance.needInput.set(event.currentTarget.checked);
        templateInstance.phi.set(0.9);
        templateInstance.pu.set(0);
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
    },
    'keyup input#custom-name': (event, templateInstance) => {
        const custom = templateInstance.perfilCustom.get();
        if (!custom) {
            let value = event.currentTarget.value;
            if (typeof value === 'string' && value.trim().length > 0) {
                value = value.trim();
                if (event.key === 'Enter') {
                    value = value.toUpperCase();
                    if (perfil.find({ _id: value }).count() === 1) {
                        setPerfilName(value, templateInstance);
                        templateInstance.notFound.set(false);
                    } else {
                        templateInstance.notFound.set(value);
                        templateInstance.perfilClass.set(false);
                    }
                } else {
                    templateInstance.searchPatter.set(value);
                }
            } else {
                templateInstance.searchPatter.set(false);
            }
        }
    }
});

Template.perfil.helpers({
    notFound() {
        return Template.instance().notFound.get();
    },
    perfilCustom() {
        return Template.instance().perfilCustom.get();
    },
    canDownloadCustom() {
        return Template.instance().perfilClass.get() && Template.instance().perfilSelected.get();
    },
    perfilList() {
        let data = false;
        const custom = Template.instance().perfilCustom.get();

        if (!custom) {
            const pattern = Template.instance().searchPatter.get();
            const query = {};
            if (typeof pattern === 'string') {
                query._id = { $regex: pattern, $options: 'i' };
            }
            data = perfil.find(query, { fields: { _id: 1 }, sort: { _id: 1 } });
        }
        return data;
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
    data(material) {
        const perfilClass = Template.instance().perfilClass.get();
        return {
            material,
            ready: Template.instance().perfilSelected.get() && Template.instance().materialSelected.get(),
            perfil: perfilClass instanceof PerfilClass ? perfilClass.getData() : false,
            perfilCustom: Template.instance().perfilCustom.get(),
            phic: Template.instance().phi.get(),
            Pu: Template.instance().pu.get(),
            needInput: Template.instance().needInput.get()
        };
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
    },
    userInput() {
        return Template.instance().needInput.get();
    },
    invalid(material, perfilData) {
        let invalid = false;
        const pu = Template.instance().pu.get();

        if (typeof pu === 'number' && typeof material === 'object' && typeof perfilData === 'object') {
            invalid = pu > (material.Ry * material.Fy * perfilData.area);
        }

        return invalid;
    }
});

Template.perfil.onCreated(function perfilononCreated() {
    this.needInput = new ReactiveVar(false);
    this.pu = new ReactiveVar(0);
    this.phi = new ReactiveVar(0.9);
    this.perfilSelected = new ReactiveVar(false);
    this.materialSelected = new ReactiveVar(false);
    this.perfilCustom = new ReactiveVar(false);
    this.searchPatter = new ReactiveVar(false);
    this.notFound = new ReactiveVar(false);
    this.perfilClass = new ReactiveVar(false, (old, newer) => {
        let equal = false;
        if (old instanceof PerfilClass && newer instanceof PerfilClass) {
            equal = old.name === newer.name;
        }
        return equal;
    });
});
