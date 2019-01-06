import './step1.html';
import './step1section.js';
import '../step2/step2section.js';
import PerfilClass from '../perfilClass.js';
import { perfil, materials } from '../../../../both/collections.js';

Template.step1.helpers({
    column() {
        const _id = this._id;
        const collection = this.collection;
        const data = {
            title: 'Column',
            name: 'column',
            collection: this.collection,
            collectionID: this._id
        };
        const query = {
            fields: {
                column: 1
            }
        };

        const column = collection.findOne({ _id }, query);
        if (typeof column.column === 'object') {
            if (typeof column.column.perfil === 'string') {
                const perfilObj = new PerfilClass(column.column.perfil);
                data.perfilBean = perfilObj.getSVG();
                data.perfilSelected = column.column.perfil;
            }

            data.materialSelected = column.column.material;
        }
        return data;
    },
    left() {
        const _id = this._id;
        const collection = this.collection;
        const data = {
            title: 'Left Beam',
            name: 'leftbeam',
            collection: this.collection,
            collectionID: this._id
        };
        const query = {
            fields: {
                leftbeam: 1
            }
        };

        const column = collection.findOne({ _id }, query);
        if (typeof column.leftbeam === 'object') {
            if (typeof column.leftbeam.material === 'string') {
                data.materialSelected = column.leftbeam.material;
                data.material = materials.findOne({ _id: column.leftbeam.material },
                    {
                        fields: {
                            _id: 0,
                            Fy: 1,
                            Fu: 1,
                            Ry: 1
                        },
                        reactive: false
                    });
            }

            if (typeof column.leftbeam.perfil === 'string') {
                const perfilObj = new PerfilClass(column.leftbeam.perfil);
                data.perfilBean = perfilObj.getSVG();
                data.perfilSelected = column.leftbeam.perfil;
                const zx = perfil.findOne({ _id: column.leftbeam.perfil }, {
                    fields: { _id: 0, Zx: 1 },
                    reactive: false
                });

                if (typeof zx === 'object' && typeof zx.Zx === 'number' && typeof data.material === 'object') {
                    data.material.Zx = zx.Zx;
                }
            }
        }


        return data;
    },
    right() {
        const _id = this._id;
        const collection = this.collection;
        const data = {
            title: 'Right Beam',
            name: 'rightbeam',
            collection: this.collection,
            collectionID: this._id
        };
        const query = {
            fields: {
                rightbeam: 1
            }
        };

        const column = collection.findOne({ _id }, query);
        if (typeof column.rightbeam === 'object') {
            if (typeof column.rightbeam.material === 'string') {
                data.materialSelected = column.rightbeam.material;
                data.material = materials.findOne({ _id: column.rightbeam.material },
                    {
                        fields: {
                            _id: 0,
                            Fy: 1,
                            Fu: 1,
                            Ry: 1
                        },
                        reactive: false
                    });
            }

            if (typeof column.rightbeam.perfil === 'string') {
                const perfilObj = new PerfilClass(column.rightbeam.perfil);
                data.perfilBean = perfilObj.getSVG();
                data.perfilSelected = column.rightbeam.perfil;
                const zx = perfil.findOne({ _id: column.rightbeam.perfil }, {
                    fields: { _id: 0, Zx: 1 },
                    reactive: false
                });

                if (typeof zx === 'object' && typeof zx.Zx === 'number' && typeof data.material === 'object') {
                    data.material.Zx = zx.Zx;
                }
            }
        }
        return data;
    }

});
