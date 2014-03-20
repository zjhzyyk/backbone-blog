(function(){
	var App = window.App = {routers: {}};
	var BlogRouter = require("../routers/blogs");
	App.routers.blog = new BlogRouter();
})();

