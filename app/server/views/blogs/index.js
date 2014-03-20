var BlogIndex = require("../../../client/views/blog/index");
var Blogs = require("../../api/blog");
var Blog = require("../../../model/blog");
var JST = require("../../../templates/templates").JST;

module.exports = BlogIndex.extend({
	build: function(args){
		var index = $(JST['index']());
		Blogs.getPage(1, function(blogs){
			var num = blogs.length;
			var i = 0;
			for (; i<num; i++) {
				blogs[i] = new Blog(blog[i]);
			}
			content = JST('blogs/index')(blogs);
			index.find("#main").after(content);
			args.res.send(index.toString());
		});
	}
});