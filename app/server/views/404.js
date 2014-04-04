var ServerView = require("../../framework/server_view");

module.exports = ServerView.extend({
  parent: "./index",
  wrapper: "#main",
  template: "404"
});