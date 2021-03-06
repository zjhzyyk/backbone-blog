var Router = require("./framework/router");

module.exports = Router.extend({
	routes: {
		"/": "blogs/index",
    "/compose": "blogs/compose",
		"/blog/:year/:month/:title": "blogs/show",
		"/blog/:year/:month/:title/edit": "blogs/edit",
    "/404": "404",
    "/login": "user/login"
	}
});