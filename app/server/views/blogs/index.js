var _ = require("underscore");
var BlogIndex = require("../../../client/views/blogs/index");
var Blogs = require("../../api/blog");
var Blog = require("../../../models/blog");
var JST = require("../../../templates/templates")(_);
var $ = require("cheerio");

module.exports = BlogIndex.extend({
	build: function(args){
		Blogs.getPage(1, function(blogs){
			var index = $(JST['index']({bootData: {"blogs": blogs}}));
			var num = blogs.length;
			var i = 0;
			for (; i<num; i++) {
				blogs[i] = new Blog(blogs[i]);
			}
			content = JST['blogs/index']({blogs: blogs});
			index.find("#main").append(content);
			args.res.send(index.toString());
		});
	}
});