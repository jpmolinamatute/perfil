import './step1section.html';
import { perfil, materials } from '../../../../both/collections.js';
import PerfilClass from '../perfilClass.js';

Template.step1section.helpers({
    perfilList() {
        return perfil.find({}, { fields: { _id: 1 }, sort: { _id: 1 } });
    },
    materialList() {
        return materials.find({}, { fields: { _id: 1 }, sort: { _id: 1 } });
    },
    showSVG(name) {
        const _id = this.collectionID;
        const collection = this.collection;
        const query = { fields: {} };
        query.fields[`${name}.perfil`] = 1;
        const column = collection.findOne({ _id }, query);
        return typeof column === 'object'
            && typeof column[name] === 'object'
            && typeof column[name].perfil === 'string';
    },
    isSelected(collection, _id, field, subfield, perfilName) {
        const query = { fields: {} };
        query.fields[`${field}.${subfield}`] = 1;
        const column = collection.findOne({ _id }, query);
        const test1 = typeof column === 'object'
            && typeof column[field] === 'object'
            && column[field][subfield] === perfilName;
        return test1 || (!test1 && typeof perfilName === 'undefined');
    },
    perfilBean(name) {
        const _id = this.collectionID;
        const collection = this.collection;
        const query = { fields: {} };
        query.fields[`${name}.perfil`] = 1;
        const column = collection.findOne({ _id }, query);
        const perfilObj = new PerfilClass(column[name].perfil);
        return perfilObj.getSVG();
    }
});

Template.step1section.events({
    'change select': (event, templateInstance) => {
        const _id = templateInstance.data.collectionID;
        const collection = templateInstance.data.collection;
        const value = event.currentTarget.value;
        const field = event.currentTarget.dataset.field;
        const subField = event.currentTarget.dataset.subfield;
        let action;

        if (value.length > 0) {
            action = { $set: {} };
            action.$set[`${field}.${subField}`] = value;
        } else {
            action = { $unset: {} };
            action.$unset[`${field}.${subField}`] = 1;
        }

        collection.update({ _id }, action);
    }
});
