/// <reference path="../../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/all-definitions.d.ts" />
/// <reference path="../../../definitions/materialize.d.ts" />
/// <reference path="../../../definitions/moment.d.ts" />
/// <reference path="../../../lib/collections/posts.ts" />

Template['Post'].onRendered(function() {
	$('.tooltipped').tooltip();
});

Template['PostList'].helpers({
	posts: function() {
		return Posts.find();
	}
});

Template['Post'].helpers({
	author: function() {
		return Meteor.users.findOne(this.userId);
	},
	date: function() {
		return moment(this.submitted).format('MMMM DD, YYYY');
	},
	tags: function() {
		return this.tags.join(', ');
	}
});