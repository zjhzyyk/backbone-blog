var _ = require("underscore");
var ServerView = require("../../../framework/server_view");
var Blogs = require("../../api/blog");
var Blog = require("../../../models/blog");
var JST = require("../../../templates/templates")(_);

module.exports = ServerView.extend({
	parent: "../server/views/index",
	build: function(){
		var self = this;
		Blogs.getPage(1, function(blogs){
			var index = self.getParent({blogs: blogs});
			var num = blogs.length;
			var i = 0;
			for (; i<num; i++) {
				blogs[i] = new Blog(blogs[i]);
			}
			content = JST['blogs/index']({blogs: blogs});
			index.find("#main").append(content);
			self.res.send(index.toString());
		});
	}
});