var Router = require("../framework/router");

module.exports = Router.extend({
	routes: {
		"/": "blogs#index",
		"/blogs/:id": "blogs#show",
		"/blogs/:id/edit": "blogs#edit"
	}
});