var Blog = require("../model/blog");
var config = require("../config");
var xss = require('xss');

function getPage(num, succeed, fail){
	var perpage = config.blogsPerPage;
	Blog.find({})
		.sort('-createTime')
		.skip((num-1)*perpage)
		.limit(perpage)
		.exec(function(err, blogs){
			if (err) {
				fail(err);
			} else {
				succeed(blogs);
			}
		});
}

module.exports.getPage = getPage;

module.exports.getBlogs = function(req, res) {
	if (!req.query.page || typeof parseInt(req.query.page)!=="number") {
		res.send(404);
		return;
	}
	var pageid = parseInt(req.query.page) - 1;
	if (pageid<0) {
		res.send(404);
		return;
	}
	var perpage = config.blogsPerPage;
	Blog.find({})
		.sort('-createTime')
		.skip(pageid*perpage)
		.limit(perpage)
		.exec(function(err, blogs){
			if (err) {
				res.json(500, {
					error: err
				});
			} else {
				Blog.count({}, function(err, count){
					var totalPages = count/config.blogsPerPage;
					if (totalPages*config.blogsPerPage<count) totalPages++;
					res.json(200, {data: blogs, total: totalPages});	
				});
			}
		});
}

module.exports.create = function(req, res) {
	var blog = new Blog({
		createTime: new Date(req.body.createTime),
		title: xss(req.body.title),
		content: xss(req.body.content)
	});
	blog.save(function (err) {
		if (err) {
			res.json(500,{
				error: err,
				success: false
			});
		} else {
			res.json(200,{
				message: "success",
				success: true
			});
		}
	});
};

module.exports.modify = function(req, res){
	Blog.update({_id: req.params.id}, {title: xss(req.body.title), content: xss(req.body.content)}, function(err){
		if (err)
			console.log("update err");
		else
			res.json(200, {success: true});
	});
};

module.exports.delete = function(req, res) {
	Blog.remove({_id: req.params.id}, function(err){
		if (err) {
			res.json(500, {error: err});
		}
		else {
			res.json(200, {id: req.params.id});
		}
	});
};
