import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates

import '../../ui/layouts/body.js';
import '../../ui/pages/perfil/perfil.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/components/wizard/wizard.js';

// Set up all routes in the app
FlowRouter.route('/', {
    name: 'App.home',
    action() {
        BlazeLayout.render('App_body', { main: 'perfil' });
    }
});


FlowRouter.route('/wizard', {
    name: 'App.wizard',
    action() {
        BlazeLayout.render('App_body', { main: 'wizard' });
    }
});

FlowRouter.notFound = {
    action() {
        BlazeLayout.render('App_body', { main: 'App_notFound' });
    }
};
