/// <reference path="../../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/all-definitions.d.ts" />
/// <reference path="../../../definitions/materialize.d.ts" />
/// <reference path="../../helpers/notifications/notifications.ts" />

Template['TopBar'].onRendered(() => {
	$('.button-collapse').sideNav();
});

Template['TopBar'].events({
	'click a': function(e: Event) {
			$('.side-nav').sideNav('hide');
	},
	'click .sign-out': function(e: Event) {
		e.preventDefault();
		
		Meteor.logout(function(error?: Meteor.Error) {
			if (error) {
				Notifications.showError(error.reason);
				return;
			}
			
			Notifications.showMessage('Goodbye! Come back soon.');
		});
	}
});