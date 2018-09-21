import './step1.html';
import './step1section.js';

Template.step1.helpers({
    beans() {
        return [
            {
                elementID: 'step1-column',
                title: 'Column',
                name: 'column',
                collection: this.collection,
                collectionID: this._id
            },
            {
                elementID: 'step1-left-beam',
                title: 'Left Beam',
                name: 'leftbeam',
                collection: this.collection,
                collectionID: this._id
            },
            {
                elementID: 'step1-right-beam',
                title: 'Right Beam',
                name: 'rightbeam',
                collection: this.collection,
                collectionID: this._id
            }
        ];
    }
});
