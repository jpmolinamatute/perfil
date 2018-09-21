import './perfil.html';
import { perfil, units } from '../../../../both/collections.js';
import PerfilClass from '../../components/perfilClass';

// Template.perfil.onRendered(function perfilonRendered() {
//     console.log(perfil.find().fetch());
//     console.log(units.find().fetch());
// });

Template.perfil.events({
    'change select#perfil-list': (event, templateInstance) => {
        let perfilObj;

        if (event.currentTarget.value.length > 0) {
            perfilObj = new PerfilClass(event.currentTarget.value);
        } else {
            perfilObj = false;
        }
        templateInstance.perfilSelected.set(perfilObj);
    }
});

Template.perfil.helpers({
    perfilList() {
        return perfil.find({}, { fields: { _id: 1 }, sort: { _id: 1 } });
    },
    perfilSelected() {
        return Template.instance().perfilSelected.get();
    },
    perfilRow() {
        const perfilInstance = Template.instance().perfilSelected.get();
        return perfil.findOne({ _id: perfilInstance.name }, {
            fields: {
                _id: 0,
                d: 1,
                bf: 1,
                tw: 1,
                r: 1,
                Area: 1,
                Peso: 1
            },
            reactive: false
        });
    },
    getunit(_id) {
        const unitObj = units.findOne({ _id });
        return unitObj.unit;
    },
    perfilFile() {
        const perfilInstance = Template.instance().perfilSelected.get();
        return perfilInstance.getBlob();
    },
    fileName() {
        const perfilInstance = Template.instance().perfilSelected.get();

        return `${perfilInstance.name}.scr`;
    }
});

Template.perfil.onCreated(function perfilononCreated() {
    this.perfilSelected = new ReactiveVar(false);
});
