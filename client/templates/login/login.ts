/// <reference path="../../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/all-definitions.d.ts" />
/// <reference path="../../helpers/notifications/notifications.ts" />

Template['Login'].events({
	'submit form.loginForm': function(e: Event) {
		e.preventDefault();
		
		var errors: string[];
		
		var email: string = $('input[name=login_email]').val();
		var password: string = $('input[name=login_password]').val();
		
		Meteor.loginWithPassword(email, password, (error: Meteor.Error) => {
			if (error) {
				Notifications.showError(error.reason);
				return;
			}
			
			Notifications.showSuccess(`Welcome back ${Meteor.user().profile.first_name} ${Meteor.user().profile.last_name}.`);
			$('#loginModal').closeModal();
			Router.go('Home');
		});
	}
});