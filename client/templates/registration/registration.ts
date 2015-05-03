/// <reference path="../../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/all-definitions.d.ts" />
/// <reference path="../../helpers/notifications/notifications.ts" />
/// <reference path="../../../lib/constants.ts" />
/// <reference path="../../../lib/collections/posts.ts" />
/// <reference path="../../../definitions/materialize.d.ts" />

Template['Registration'].onRendered(() => {
	$('select').material_select();
	Session.set('registrationErrors', []);
});

Template['Registration'].helpers({
	errors: function() {
		return Session.get('registrationErrors');
	}
});

Template['Registration'].events({
	'submit form.registrationForm': function(e: Event) {
		e.preventDefault();
		var errors: string[] = [];
		
		var first_name = $('input[name=first_name]').val();
		var last_name = $('input[name=last_name]').val();
		var native_language = $('select[name=native_language]').val();
		var email = $('input[name=register_email]').val();
		var password = $('input[name=register_password]').val();
		
		if (first_name.length === 0) {
			errors.push('You must enter a first name.');
			$('input[name=first_name]').addClass('invalid');
		}
		if (last_name.length === 0) {
			errors.push('You must enter a last name.');
			$('input[name=last_name]').addClass('invalid');
		}
		if (native_language === null) errors.push('You must choose a native language.');
		if (email.length === 0) {
			errors.push('You must enter an email.');
			$('input[name=register_email]').addClass('invalid');
		}
		if (password.length === 0) {
			errors.push('You must enter a password.');
			$('input[name=register_password]').addClass('invalid');
		}
		
		if (errors.length > 0) {
			Session.set('registrationErrors', errors);
			return;
		}
		
		Accounts.createUser({
			email: email,
			password: password,
			profile: {
				first_name: first_name,
				last_name: last_name,
				native_language: native_language,
				languages: []
			}
		}, (error) => {
			if (error) {
				Notifications.showError(error.reason);
				return;
			}
			
			Notifications.showSuccess(`Welcome ${first_name}!`);
			$('#registrationModal').closeModal();
			
			$('input[name=first_name]').val('');
			$('input[name=last_name]').val('');
			$('select[name=native_language]').val(null);
			$('select[name=native_language]').material_select();
			$('input[name=register_email]').val('');
			$('input[name=register_password]').val('');
		});
	}
});