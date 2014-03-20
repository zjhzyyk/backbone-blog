var Router = require("../framework/router");
var JST = require("../views/templates.js").JST;
var Blog = require("../models/blog");
if (typeof exports !== 'undefined') {
	var $ = require("cheerio");
	var inNode = true;
}
else inNode = false;

module.exports = Router.extend({
	routes: {
		"/": "index",
		"/blogs/:id": "show",
		"/blogs/:id/edit": "edit"
	},
	update: function(content, res){
		if (inNode && res) {
			var index = $(JST['index']());
			index.find("#main").after(content);
			res.send(index.toString());
		} else if (!inNode) {
			$("#main").after(blogs);
		}
	}
	index: function(res){
		var self = this;
		Blog.where({page: 1}, function(data){
			var blogs = "";
			var perpage = data.blogs.length;
			var i = 0;
			for (;i<perpage;i++) {
				blogs+=JST['blog/summary'](data.blogs[i]);
			}
			self.update(blogs, res);
		});
	},
	show: function(id, res){
		var self = this;
		Blog.where({id: id}, function(data){
			var blog = JST['blog'](data.blog);
			self.update(blog, res);
		});
	},
	edit: function(id, res) {
		show(id);
	}
});