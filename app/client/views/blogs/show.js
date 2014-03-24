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
  },
  render: function(){
    this.$el = $("#main");
    this.$el.html(JST[this.template](app.collections.blogs.where({
      year: this.year,
      month: this.month,
      dashTitle: this.title
    })));
  }
});