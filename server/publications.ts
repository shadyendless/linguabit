/// <reference path="../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/all-definitions.d.ts" />
/// <reference path="../lib/collections/posts.ts" />
/// <reference path="../definitions/publish-composite.d.ts" />
//

Meteor.publish('ownPosts', function(limit: number) {
	check(this.userId, String);
	check(limit, Number);
	
	return Posts.find({userId: this.userId}, {sort: {submitted: -1}, limit: limit});
});

Meteor.publishComposite('posts', function(userId: string, limit: number) {
	check(userId, String);
	check(limit, Number);
	
	return {
		find: function() {
			var languages = Meteor.users.findOne(userId).profile.languages;
			return Posts.find({language: {$in: languages}}, {sort: {submitted: -1, correctionsCount: 1}, limit: limit});
		},
		children: [
			{
				find: function(post) {
					return Meteor.users.find({ _id: post.userId }, { limit: 1, fields: { profile: 1 }});
				}
			}
		]
	};
});