/// <reference path="../../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/all-definitions.d.ts" />
/// <reference path="../../helpers/notifications/notifications.ts" />
/// <reference path="../../../lib/constants.ts" />
/// <reference path="../../../lib/collections/posts.ts" />
/// <reference path="../../../definitions/materialize.d.ts" />

Template['NewPost'].onRendered(() => {
	$('select').material_select();
	$('textarea').characterCounter();
});

Template['NewPost'].events({
	'click .new-post-button': function(e: Event) {
		e.preventDefault();
		
		$('.post-message').fadeOut(() => {
			$('.hidden').fadeIn();
		});
	},
	'click .cancel-post': function(e: Event) {
		e.preventDefault();
		
		$('.hidden').fadeOut(() => {
			$('.post-message').fadeIn();
		});
	},
	'click .post-submit': function(e: Event) {
		e.preventDefault();
		
		var language: string = $('select[name=post_language]').val();
		var post: string = $('textarea[name=post_content]').val();
		
		if (!language) {
			Notifications.showError('You must select a language for the post.');
			return;
		}
		if (post.length === 0) {
			Notifications.showError('You must write something for the post.');
			return;
		}
		if (post.length > PostLength) {
			Notifications.showError(`Your post is longer than ${PostLength} characters.`);
			return;
		}
		
		var postAttributes : PostAttributes = {
			language: language,
			post: post
		}
		
		Meteor.call('createPost', postAttributes, function(error: Meteor.Error, result: any) {
			if (error) {
				Notifications.showError(error.reason);
				return;
			}
			
			$('select').val(null);
			$('select').material_select();
			$('textarea').val('');
			
			$('.hidden').fadeOut(() => {
				$('.post-message').fadeIn();
			});
			
			Notifications.showSuccess('Your post is now live!');
		});
	}
});