var View = require("../../../framework/view");
var app = require("../../store");
var _ = require("underscore");
var JST = require("../../../templates/templates")(_);

module.exports = View.extend({
  template: "blogs/show",
  events: {
    "click .blog-edit": "edit",
    "click .blog-delete": "delete"
  },
  initialize: function(){
    this.year = this.args[1];
    this.month = this.args[2];
    this.title = this.args[3];
    console.log("render", this.year, this.month, this.title);
    this.render();
    if (app.session.loggedIn) this.delegateEvents();
  },
  render: function(){
    var self = this;
    this.$el = $("#main");
    $("nav li").removeClass("active");
    $("body").on("click", this.closeDropdown);
    $(".dropdown-link").on("click", this.toggleDropdown);
    if (this.navigate) {
      this.$el.html(JST[self.template]({
        blog: app.collections.blogs.where({
          year: self.year,
          month: self.month,
          dashTitle: self.title
        }),
        session: app.session
      }));
    }
  },
  edit: function(){

  },
  delete: function(){

  },
  closeDropdown: function(e){
    $(".dropdown-menu").hide();
  },
  toggleDropdown: function(e){
    e.preventDefault();
    e.stopPropagation();
    $(".dropdown-menu").toggle();
  }
});