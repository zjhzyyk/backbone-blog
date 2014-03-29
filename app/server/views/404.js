var _ = require("underscore");
var NotFound = require("../../client/views/404");
var JST = require("../../templates/templates")(_);
var $ = require("cheerio");

module.exports = NotFound.extend({
  build: function(args){
    var index = $(JST['index']({bootData:{}}));
    index.find("#main").append(JST[this.template]());
    args.res.send(index.toString());
  }
});