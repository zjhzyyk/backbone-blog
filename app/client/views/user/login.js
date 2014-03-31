var FormView = require("../form");
var _ = require('underscore');
var app = require("../../store");

module.exports = FormView.extend({
  template: "user/login",
  afterRender: function(){
    $("nav li").removeClass("active");
    $("#login-link").addClass("active");
  },
  save: function(e){
    e.preventDefault();
    console.log("start submitting username and password in", this.cid);
    var self = this;
    this.clearAllMessages();
    var data = {
      username: this.$("#login-username").val(),
      password: this.$("#login-password").val(),
      rememberme: this.$("#login-rememberme").prop("checked")
    };
    $.post('/login', data).then(function(response) {
      if (response.message)
        self.addMessage(response.message);
      if (response.success) {
        console.log('Login succeeded!');
        app.session.loggedIn = true;
        app.session.username = data.username;
        self.go("/");
      } else {
        app.session.loggedIn = false;
      }
    }, function(){
      app.session.loggedIn = false;
    });
  }
});