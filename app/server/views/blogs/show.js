var _ = require("underscore");
var JST = require("../../../templates/templates")(_);
var ServerView = require("../../../framework/server_view");
var Blogs = require("../../api/blog");
var Blog = require("../../../models/blog");

module.exports = ServerView.extend({
  parent: "../server/views/index",
  build: function(){
    var self = this;
    var year = parseInt(this.args[1]);
    var month = parseInt(this.args[2]);
    var title = this.args[3];
    if (!(_.isNumber(year)) || !(_.isNumber(month)) || !title.length) {
      self.res.redirect('/404');
      return;
    }
    console.log("year", year, "month", month-1, "title", title);
    Blogs.find({
      year: year,
      month: month-1,
      ititle: title
    }, function(blog){
      if (!blog) {
        self.res.redirect('/404');
        return;
      }
      console.log(blog);
      blog = new Blog(blog);
      var index = self.getParent({blogs: [blog]});
      content = JST['blogs/show']({blog:blog, session: session});
      index.find("#main").append(content);
      self.res.send(index.toString());
    }, function(err){
      console.log(err);
    });
  }
});