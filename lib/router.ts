/// <reference path="../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/all-definitions.d.ts" />

Router.configure({
	loadingTemplate: 'Loading'
});

Router.route('/', function() {
	this.layout('Layout');
	this.render('Home');
}, {
	name: 'Home',
	waitOn: function() {
		if (Meteor.userId() === null) return;
		return Meteor.subscribe('posts', Meteor.userId(), Session.get('postLimit'));
	}
});

Router.route('/posts/mine', function() {
	this.layout('Layout');
	this.render('PostList');
}, {
	name: 'OwnPosts',
	waitOn: function() {
		if (Meteor.userId() === null) return;
		return Meteor.subscribe('ownPosts', Session.get('postLimit'));
	}
});

Router.route('/welcome', function() {
	this.render('Landing');
}, {
	name: 'Landing'
});

Router.route('/settings', function() {
	this.layout('Layout');
	this.render('Settings');
}, {
	name: 'Settings'
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