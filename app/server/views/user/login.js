var User = require("../../api/user");
var ServerView = require("../../../framework/server_view");

module.exports = ServerView.extend({
  parent: "../index",
  wrapper: "#main",
  template: "user/login",
  beforeBuild: function(){
    if (User.isAuth(this.req, this.res)) {
      this.res.redirect("/");
      return true;
    }
    return false;
  }
});