import './wizard.html';
import '../step1/step1.js';
import '../step2/step2.js';
import '../step3/step3.js';
import { Mongo } from 'meteor/mongo';

Template.wizard.helpers({
    contentTemplate() {
        const index = Template.instance().index.get();
        let name;

        if (typeof this.list[index].template === 'string') {
            name = this.list[index].template;
        }
        return name;
    },
    getTitle() {
        const index = Template.instance().index.get();
        let title;

        if (typeof this.list[index].subTitle === 'string') {
            title = this.list[index].subTitle;
        }
        return title;
    },
    isActive(index) {
        return Template.instance().index.get() === index;
    },
    showPrev() {
        return Template.instance().index.get() > 0;
    },
    isLast() {
        const index = Template.instance().index.get() + 1;
        return index === this.list.length;
    },
    showHelp() {
        return Template.instance().showHelp.get();
    },
    help() {
        const index = Template.instance().index.get();
        let help;

        if (typeof this.list[index].help === 'string') {
            help = this.list[index].help;
        }
        return help;
    },
    track() {
        return {
            _id: Template.instance().docID,
            collection: Template.instance().collection
        };
    },
    isDisabled() {
        return true;
    }
});

Template.wizard.events({
    'click div#wizard-left-panel button': (event, templateInstance) => {
        let index = event.currentTarget.dataset.index;
        index = parseInt(index, 10);
        templateInstance.index.set(index);
        event.stopPropagation();
    },
    'click div#wizard-control button[data-action="next"]': (event, templateInstance) => {
        const index = templateInstance.index.get() + 1;
        const length = templateInstance.data.list.length;
        if (index < length) {
            templateInstance.index.set(index);
        }
        event.stopPropagation();
    },
    'click div#wizard-control button[data-action="prev"]': (event, templateInstance) => {
        const index = templateInstance.index.get() - 1;
        if (index >= 0) {
            templateInstance.index.set(index);
        }
        event.stopPropagation();
    },
    'click div#wizard-header > button[data-action="help"]': (event, templateInstance) => {
        const showHelp = templateInstance.showHelp.get();
        templateInstance.showHelp.set(!showHelp);
        event.stopPropagation();
    }
});

Template.wizard.onCreated(function wizardOnCreated() {
    this.index = new ReactiveVar(0);
    this.collection = new Mongo.Collection(null);
    this.showHelp = new ReactiveVar(false);
    this.docID = this.collection.insert({});
});
