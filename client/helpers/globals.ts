/// <reference path="../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/all-definitions.d.ts" />
/// <reference path="../../lib/constants.ts" />

declare var SiteName : string;
SiteName =  'LinguaBit';

Handlebars.registerHelper('SiteName', () => {
	return SiteName;
});

Handlebars.registerHelper('PostLength', () => {
	return PostLength;
});

Handlebars.registerHelper('activeRoute', (..._arguments) => {
	var args = Array.prototype.slice.call(_arguments, 0);
	args.pop();
	
	var active : boolean = _.any(args, name => {
		return Router.current() && Router.current().route.getName() === name; 
	});
	
	return active && 'active';
});

Handlebars.registerHelper('languages', () => {
	return Languages;
});