/// <reference path="../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/all-definitions.d.ts" />

Router.route('/', function() {
	this.render('Home');
}, {
	name: 'Home'
});

Router.route('/welcome', function() {
	this.render('Landing');
}, {
	name: 'Landing'
});

function requiresLogin() {
	if (Meteor.userId() === null) {
		this.render('Landing');
	} else {
		this.next();
	}
}

function canViewLoggedIn() {
	if (Meteor.userId()) {
		Router.go('Home');
	} else {
		this.next();
	}
}

Router.onBeforeAction(requiresLogin, { except: ['Landing'] });
Router.onBeforeAction(canViewLoggedIn, { only: ['Landing'] });