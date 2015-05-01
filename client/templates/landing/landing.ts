/// <reference path="../../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/all-definitions.d.ts" />
/// <reference path="../../../definitions/materialize.d.ts" />

Template['Landing'].events({
	'click .register': function(e: Event) {
		e.preventDefault();
		$('#registrationModal').openModal();
	},
	'click .login': function(e: Event) {
		$('#loginModal').openModal();
	}
});