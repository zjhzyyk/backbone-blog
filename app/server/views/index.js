var ServerView = require("../../../framework/server_view");
var User = require("../../api/user");
var _ = require("underscore");
var JST = require("../../templates/templates")(_);

module.exports = ServerView.extend({
  template: "index",
  getModel: function(){
    this.session = {
      loggedIn: User.isAuth(this.req, this.res),
      username: this.req.session.username
    };
    return {
      bootData: _.extend(this.data, {session: this.session}),
      session: this.session
    };
  },
  afterBuild: function(){
    this.$el.find(".nav-right").html(JST['dropdown']({
      text: this.session.username,
      options: [
        {text: "Change password", url: "/change-password"},
        {text: "Logout", url: "/logout"}
      ]
    }));
  }
});