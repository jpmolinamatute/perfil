import './appbody.html';
import './pages/perfil/perfil.js';
import './components/wizard/wizard.js';
import './pages/login/login';
import { Meteor } from 'meteor/meteor';

Template.appbody.helpers({
    language() {
        return Template.instance().language.get();
    },
    name() {
        return location.pathname === '/' ? 'perfil' : 'wizard';
    },
    obj() {
        return {
            list: [
                {
                    subTitle: 'Step 1: Select column and beams with their respective material.',
                    template: 'step1',
                    help: `<p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam natus,
                                necessitatibus obcaecati eveniet harum impedit molestiae! Rerum veniam, perferendis
                                dicta nam recusandae voluptatem? Corrupti tempore velit quia laborum et debitis!</p>`,
                    validate() {

                    },
                    onStart() {

                    }
                },
                {
                    subTitle: 'Step 2',
                    template: 'step2',
                    help: `<p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam natus,
                                necessitatibus obcaecati eveniet harum impedit molestiae! Rerum veniam, perferendis
                                dicta nam recusandae voluptatem? Corrupti tempore velit quia laborum et debitis!</p>`,
                    validate() {

                    },
                    onStart() {

                    }
                },
                {
                    subTitle: 'Step 3',
                    template: 'step3',
                    help: `<p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam natus,
                                necessitatibus obcaecati eveniet harum impedit molestiae! Rerum veniam, perferendis
                                dicta nam recusandae voluptatem? Corrupti tempore velit quia laborum et debitis!</p>`,
                    validate() {

                    },
                    onStart() {

                    }
                }
            ],
            title: 'test',
            onDone() {
                console.log('hola');
                console.log('done');
            },
            onCancel() {
                console.log('hola');
                console.log('cancel');
            }
        };
    }
});

Template.appbody.events({
    'change input#language-toggle': (event, templateInstance) => {
        templateInstance.language.set(event.currentTarget.checked);
    },
    'click button#logout': (event) => {
        Meteor.logout();
        event.stopPropagation();
    }
});

Template.appbody.onCreated(function appbodyonCreated() {
    this.language = new ReactiveVar(true);
    this.subscribe('perfil');
    this.subscribe('materials');
    this.subscribe('units');
});
