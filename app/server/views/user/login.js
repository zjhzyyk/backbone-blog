var _ = require("underscore");
var UserLogin = require("../../../client/views/user/login");
var JST = require("../../../templates/templates")(_);
var $ = require("cheerio");

module.exports = UserLogin.extend({
  build: function(args){
    var index = $(JST['index']({bootData: {}}));
    var login = $(JST['user/login']());
    index.find("#main").append(login);
    args.res.send(index.toString());
  }
});