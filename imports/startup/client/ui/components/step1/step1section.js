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
    // svgWidth(name) {
    //     const _id = this.collectionID;
    //     const collection = this.collection;
    //     const query = { fields: {} };
    //     query.fields[`container${name}width`] = 1;
    //     const column = collection.findOne({ _id }, query);
    //     return column[`container${name}width`];
    // },
    isSelected(collection, _id, field, subfield, perfilName) {
        const query = { fields: {} };
        query.fields[`${field}.${subfield}`] = 1;
        const column = collection.findOne({ _id }, query);
        return typeof column === 'object'
            && typeof column[field] === 'object'
            && column[field][subfield] === perfilName;
    },
    perfilBean(name) {
        const _id = this.collectionID;
        const collection = this.collection;
        const query = { fields: {} };
        query.fields[`${name}.perfil`] = 1;
        const column = collection.findOne({ _id }, query);
        const perfilObj = new PerfilClass(column[name].perfil);
        return {
            width: perfilObj.getWidth(),
            heigth: perfilObj.getHeight(),
            x0: perfilObj.getProporcionatedPoint(0, 'x'),
            y0: perfilObj.getProporcionatedPoint(0, 'y'),
            x1: perfilObj.getProporcionatedPoint(1, 'x'),
            y1: perfilObj.getProporcionatedPoint(1, 'y'),
            x2: perfilObj.getProporcionatedPoint(2, 'x'),
            y2: perfilObj.getProporcionatedPoint(2, 'y'),
            x3: perfilObj.getProporcionatedPoint(3, 'x'),
            y3: perfilObj.getProporcionatedPoint(3, 'y'),
            x4: perfilObj.getProporcionatedPoint(4, 'x'),
            y4: perfilObj.getProporcionatedPoint(4, 'y'),
            x5: perfilObj.getProporcionatedPoint(5, 'x'),
            y5: perfilObj.getProporcionatedPoint(5, 'y'),
            x6: perfilObj.getProporcionatedPoint(6, 'x'),
            y6: perfilObj.getProporcionatedPoint(6, 'y'),
            x7: perfilObj.getProporcionatedPoint(7, 'x'),
            y7: perfilObj.getProporcionatedPoint(7, 'y'),
            x8: perfilObj.getProporcionatedPoint(8, 'x'),
            y8: perfilObj.getProporcionatedPoint(8, 'y'),
            x9: perfilObj.getProporcionatedPoint(9, 'x'),
            y9: perfilObj.getProporcionatedPoint(9, 'y'),
            x10: perfilObj.getProporcionatedPoint(10, 'x'),
            y10: perfilObj.getProporcionatedPoint(10, 'y'),
            x11: perfilObj.getProporcionatedPoint(11, 'x'),
            y11: perfilObj.getProporcionatedPoint(11, 'y'),
            x12: perfilObj.getProporcionatedPoint(12, 'x'),
            y12: perfilObj.getProporcionatedPoint(12, 'y'),
            x13: perfilObj.getProporcionatedPoint(13, 'x'),
            y13: perfilObj.getProporcionatedPoint(13, 'y'),
            x14: perfilObj.getProporcionatedPoint(14, 'x'),
            y14: perfilObj.getProporcionatedPoint(14, 'y'),
            x15: perfilObj.getProporcionatedPoint(15, 'x'),
            y15: perfilObj.getProporcionatedPoint(15, 'y')
        };
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
        console.log(collection.findOne());
    }
});

// Template.step1section.onRendered(function step1onRendered() {
//     const _id = this.data.collectionID;
//     const collection = this.data.collection;
//     const width = document.getElementById(this.data.elementID).offsetWidth - 30;
//     const action = { $set: {} };
//     action.$set[`container${this.data.name}width`] = width;
//     collection.update({ _id }, action);
// });
