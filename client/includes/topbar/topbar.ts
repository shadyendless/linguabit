/// <reference path="../../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/all-definitions.d.ts" />
/// <reference path="../../../definitions/materialize.d.ts" />
/// <reference path="../../helpers/notifications/notifications.ts" />

Template['TopBar'].onRendered(() => {
	$('.button-collapse').sideNav();
});

Template['TopBar'].events({
	'click .sign-out': (e: Event) => {
		e.preventDefault();
		
		Meteor.logout((error?: Meteor.Error) => {
			if (error) {
				Notifications.showError(error.reason);
				return;
			}
			
			$('.side-nav').sideNav('hide');
			Notifications.showMessage('Goodbye! Come back soon.');
		});
	}
});