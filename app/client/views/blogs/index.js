var View = require("../../../framework/view");
var app = require("../../store");
var _ = require('underscore');

module.exports = View.extend({
  template: "blogs/index",
  events: {
    "click a": "jump"
  },
  initialize:function(){
    var self = this;
    app.collections.blogs.on("ready", function(){
      self.render();
    });
    if (this.navigate) {
      console.log("fetch blogs/index");
      $.getJSON('/blogs/index').then(function(res){
        app.collections.blogs.boot(res.blogs);
      });
    }
  },
  jump: function(e){
    e.preventDefault();
    console.log("navigate to", $(e.target).attr("href"));
    app.router.navigate($(e.target).attr("href"));
  },
  render: function() {
    this.$el = $('body');
    this.delegateEvents();
    if (this.navigate) {
      console.log("render blog index");
      var _ = require("underscore");
      var JST = require("../../../templates/templates")(_);
      $("#main").html(JST['blogs/index']({blogs: app.collections.blogs.page(1)}));
    }
  }
});