import './step1section.html';
import { perfil, materials } from '../../../../both/collections.js';
// import PerfilClass from '../perfilClass.js';

Template.step1section.helpers({
    perfilList() {
        return perfil.find({}, { fields: { _id: 1 }, sort: { _id: 1 } });
    },
    materialList() {
        return materials.find({}, { fields: { _id: 1 }, sort: { _id: 1 } });
    },
    isSelected(selected, value) {
        return selected === value;
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
