/// <reference path="../../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/all-definitions.d.ts" />
/// <reference path="../../helpers/notifications/notifications.ts" />
/// <reference path="../../../definitions/materialize.d.ts" />
/// <reference path="../../../lib/constants.ts" />

Template["Settings"].onRendered(function() {
	$('.collapsible').collapsible();
});

Template["Settings"].helpers({
	getLanguages: function() {
		var user = Meteor.user();
		var outputString: string = '';
		var leftColumn: string = '<div class="col m4 s12">';
		var rightColumn: string = '<div class="col m4 s12">';
		var middleColumn: string = '<div class="col m4 s12">';
		
		var perColumn: number = Math.floor(Languages.length / 3);
		
		outputString += '<div class="row">';
		_.each(Languages, function(language: string, index: number) {
			if (index < 33) {
				leftColumn += `<input type="checkbox" id="${language}" name="${language}" ${_.contains(user.profile.languages, language) ? 'checked' : ''} />`;
				leftColumn += `<label for="${language}">${language}</label><br>`;
			} else if (index >= 33 && index < 66) {
				middleColumn += `<input type="checkbox" id="${language}" name="${language}" ${_.contains(user.profile.languages, language) ? 'checked' : ''} />`;
				middleColumn += `<label for="${language}">${language}</label><br>`;
			} else {
				rightColumn += `<input type="checkbox" id="${language}" name="${language}" ${_.contains(user.profile.languages, language) ? 'checked' : ''} />`;
				rightColumn += `<label for="${language}">${language}</label><br>`;
			}
		});
		
		leftColumn += '</div>';
		middleColumn += '</div>';
		rightColumn += '</div>';
		
		outputString += `${leftColumn}${middleColumn}${rightColumn}</div>`;
		return outputString;
	}
});

Template["Settings"].events({
	'click .save-changes': function(e: Event) {
		e.preventDefault();
		
		var user = Meteor.user();
		var checkedLanguages = _.map($('input:checked'), function(checkbox: any) {
			return $(checkbox).prop('name');
		});
		
		var changed: boolean = (_.difference(checkedLanguages, user.profile.languages).length > 0 || _.difference(user.profile.languages, checkedLanguages).length > 0);
		if (changed) {
			Meteor.users.update(
				{_id: user._id}, {$set: {'profile.languages': checkedLanguages}},
				function(error: Meteor.Error) {
					if (error) Notifications.showError(error.reason);
					else Notifications.showSuccess('Languages saved.');
				});
		}
		
		var old_password = $('input[name=old_password]').val();
		var new_password =$('input[name=new_password]').val();
		
		if (old_password.length === 0 && new_password.length > 0) {
			Notifications.showError('You must enter your old password.');
			return;
		}
		
		if (old_password.length > 0 && new_password.length > 0) {
			Accounts.changePassword(old_password, new_password, function(error: Meteor.Error) {
				if (error) {
					Notifications.showError(error.reason);
					return;
				}
				
				Notifications.showSuccess('Password changed.');
			});
		}
	}
});