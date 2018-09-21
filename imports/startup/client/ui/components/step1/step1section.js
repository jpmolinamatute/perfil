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
        query.fields[`${name}perfil`] = 1;
        const column = collection.findOne({ _id }, query);
        return typeof column === 'object' && typeof column[`${name}perfil`] === 'string';
    },
    containerWidth() {
        const _id = this.collectionID;
        const collection = this.collection;
        const field = `container${this.name}with`;
        const action = { fields: {} };
        action.fields[field] = 1;
        let width = collection.findOne({ _id }, action);
        if (typeof width === 'object' && typeof width[field] === 'number') {
            width = width[field];
        } else {
            width = 100;
        }
        return width;
    }
});

Template.step1section.events({
    'change select': (event, templateInstance) => {
        const _id = templateInstance.data.collectionID;
        const collection = templateInstance.data.collection;
        const value = event.currentTarget.value;
        const field = event.currentTarget.dataset.field;
        let action;

        if (value.length > 0) {
            action = { $set: {} };
            action.$set[field] = value;
        } else {
            action = { $unset: {} };
            action.$unset[field] = 1;
        }
        collection.update({ _id }, action);
    }
});


Template.step1section.onRendered(function step1onRendered() {
    const _id = this.data.collectionID;
    const collection = this.data.collection;
    const width = document.getElementById(this.data.elementID).offsetWidth - 30;
    const action = { $set: {} };
    action.$set[`container${this.data.name}with`] = width;
    collection.update({ _id }, action);
});
