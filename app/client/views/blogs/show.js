var View = require("../../../framework/view");
var app = require("../../store");
var _ = require("underscore");
var DropdownView = require("../dropdown");
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
    this.userDropDown = new DropdownView({
      model: {
        text: app.session.username,
        options: [
          {text: "Change password", url: "/change-password"},
          {text: "Logout", url: "/logout"}
        ]
      },
      dropdownLink: ".dropdown-link",
      dropdownMenu: ".dropdown-menu"
    });
    if (this.navigate) {
      this.$el.html(JST[self.template]({
        blog: app.collections.blogs.where({
          year: self.year,
          month: self.month,
          dashTitle: self.title
        }),
        session: app.session
      }));
      if (app.session.loggedIn) {
        $(".nav-right").html(this.userDropDown.$el);
      }
    }
    this.userDropDown.attachEvents();
  },
  edit: function(){

  },
  delete: function(){

  },
  dispose: function(){
    this.userDropDown.dispose();
    View.prototype.dispose.call(this);
  }
});