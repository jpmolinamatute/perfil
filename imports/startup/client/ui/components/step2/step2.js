import './step2.html';
import './step2section.js';
import { perfil, materials } from '../../../../both/collections.js';

Template.step2.helpers({
    left() {
        const doc = this.collection.findOne({ _id: this._id }, { fields: { leftbeam: 1 } });
        let data = false;
        if (typeof doc === 'object' && typeof doc.leftbeam === 'object' && typeof doc.leftbeam.material === 'string') {
            data = materials.findOne({ _id: doc.leftbeam.material },
                {
                    fields: {
                        _id: 0,
                        Fy: 1,
                        Fu: 1,
                        Ry: 1
                    },
                    reactive: false
                });
            if (typeof doc.leftbeam.perfil === 'string') {
                const zx = perfil.findOne({ _id: doc.leftbeam.perfil }, { fields: { _id: 0, Zx: 1 }, reactive: false });
                if (typeof zx === 'object' && typeof zx.Zx === 'number') {
                    data.Zx = zx.Zx;
                }
            }
            data.material = doc.leftbeam.material;
            data.name = 'Left Bean';
        }

        return data;
    },
    right() {
        const doc = this.collection.findOne({ _id: this._id }); // , { fields: { rightbeam: 1 } }
        let data = false;

        if (typeof doc === 'object'
            && typeof doc.rightbeam === 'object'
            && typeof doc.rightbeam.material === 'string') {
            data = materials.findOne({ _id: doc.rightbeam.material },
                {
                    fields: {
                        _id: 0,
                        Fy: 1,
                        Fu: 1,
                        Ry: 1
                    },
                    reactive: false
                });
            if (typeof doc.rightbeam.perfil === 'string') {
                const zx = perfil.findOne({ _id: doc.rightbeam.perfil }, { fields: { _id: 0, Zx: 1 }, reactive: false });
                if (typeof zx === 'object' && typeof zx.Zx === 'number') {
                    data.Zx = zx.Zx;
                }
            }
            data.material = doc.rightbeam.material;
            data.name = 'Right Bean';
        }

        return data;
    }
});
