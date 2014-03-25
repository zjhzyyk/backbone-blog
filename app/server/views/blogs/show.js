var _ = require("underscore");
var JST = require("../../../templates/templates")(_);
var $ = require("cheerio");
var BlogShow = require("../../../client/views/blogs/show");
var Blogs = require("../../api/blog");

module.exports = BlogShow.extend({
  build: function(args){
    // Blogs.find()
  }
});