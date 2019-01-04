import { Meteor } from 'meteor/meteor';
import { perfil, units, materials } from '../both/collections.js';

Meteor.publish('perfil', () => perfil.find({}));
Meteor.publish('units', () => units.find());
Meteor.publish('materials', () => materials.find());
Meteor.publish('pictures', function () {
    let cursor;
    if (typeof this.userId === 'string') {
        cursor = Meteor.users.find({ _id: this.userId }, { fields: { 'services.google.picture': 1 } });
    } else {
        this.stop();
    }
    return cursor;
});
