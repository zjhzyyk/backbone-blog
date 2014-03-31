var View = require("../../../framework/view");
var app = require("../../store");
var _ = require('underscore');

module.exports = View.extend({
  template: "blogs/index",
  initialize:function(){
    var self = this;
    app.collections.blogs.once("ready", function(){
      console.log("call render in", self.cid);
      self.render();
    });
    if (this.navigate) {
      console.log("fetch blogs/index");
      $.getJSON('/blogs/index').then(function(res){
        app.collections.blogs.boot(res.blogs);
      });
    }
  },
  render: function() {
    console.log("start rendering blog index");
    this.$el = $('body');
    $("nav li").removeClass("active");
    $("#archives-link").addClass("active");
    this.delegateEvents();
    if (this.navigate) {
      console.log("render blog index");
      var JST = require("../../../templates/templates")(_);
      $("#main").html(JST['blogs/index']({blogs: app.collections.blogs.page(1)}));
    }
  }
});