import { perfil, units, materials } from '../both/collections.js';

Meteor.publish('perfil', () => perfil.find({}));
Meteor.publish('units', () => units.find());
Meteor.publish('materials', () => materials.find());
