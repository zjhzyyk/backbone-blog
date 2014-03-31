var View = require("../../../framework/view");
var app = require("../../store");
var _ = require("underscore");
var JST = require("../../../templates/templates")(_);

module.exports = View.extend({
  template: "blogs/show",
  initialize: function(){
    this.year = this.args[1];
    this.month = this.args[2];
    this.title = this.args[3];
    console.log("render", this.year, this.month, this.title);
    this.render();
  },
  render: function(){
    var self = this;
    this.$el = $("#main");
    $("nav li").removeClass("active");
    if (this.navigate) {
      this.$el.html(JST[self.template](app.collections.blogs.where({
        year: self.year,
        month: self.month,
        dashTitle: self.title
      })));
    }
  }
});