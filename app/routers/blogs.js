var Router = require("../framework/router");
var JST = require("../views/templates.js").JST;
var Blog = require("../models/blog");

module.exports = Router.extend({
	routes: {
		"/": "index",
		"/blogs/:id": "show",
		"/blogs/:id/edit": "edit"
	},
	index: function(){
		var self = this;
		Blog.where({page: 1}, function(data){
			var blogs = "";
			var perpage = data.blogs.length;
			var i = 0;
			for (;i<perpage;i++) {
				blogs+=JST['blog/summary'](data.blogs[i]);
			}
			$("#main").after(blogs);
		});
	},
	show: function(id){
		var self = this;
		Blog.where({id: id}, function(data){
			var blog = JST['blog'](data.blog);
			$("#main").after(blog);
		});
	},
	edit: function(id) {
		show(id);
	}
});