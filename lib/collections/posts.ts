/// <reference path="../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/all-definitions.d.ts" />
/// <reference path="../constants.ts" />

if (Meteor.isClient) {
	Session.setDefault('postLimit', 25);
}

interface Post {
	userId: string,
	creator: string,
	language: string,
	post: string,
	submitted: Date,
	correctionsCount: number,
	tags: string[]
};

interface PostAttributes {
	language: string,
	post: string,
	tags: string[]
};

declare var Posts: Mongo.Collection<Post>;
Posts = new Mongo.Collection<Post>('posts');

Meteor.methods({
	createPost: function(postAttributes: PostAttributes) {
		check(postAttributes, {
			language: String,
			post: String,
			tags: [String]
		});
		
		if (!postAttributes.language) throw new Meteor.Error('no-language', 'You must select a language for the post.');
		if (!postAttributes.post) throw new Meteor.Error('no-post-content', 'You must write something for the post.');
		if (postAttributes.post.length > PostLength) throw new Meteor.Error('post-length', `Your post is longer than ${PostLength} characters.`);
		
		var user: Meteor.User = Meteor.user();
		var post = _.extend(postAttributes, {
			userId: user._id,
			creator: `${user.profile.first_name} ${user.profile.last_name}`,
			submitted: new Date(),
			correctionsCount: 0
		});
		
		Posts.insert(post);
		return;
	}
});