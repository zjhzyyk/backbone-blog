var Router = require("./framework/router");

module.exports = Router.extend({
	routes: {
		"/": "blogs/index",
		"/blog/:year/:month/:title": "blogs/show",
		"/blog/:year/:month/:title/edit": "blogs/edit",
    "/404": "404"
	}
});