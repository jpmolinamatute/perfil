import './appbody.html';
import './pages/perfil/perfil.js';
import './components/wizard/wizard.js';

Template.appbody.helpers({
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


Template.appbody.onCreated(function step1onCreated() {
    this.subscribe('perfil');
    this.subscribe('materials');
    this.subscribe('units');
});
