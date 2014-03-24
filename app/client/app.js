(function(){
  var Router = require("../routes");
  var BlogCollection = require("../collections/blogs");
  var App = window.App = require("./store");
  App.router = new Router();
  App.collections.blogs = new BlogCollection();
  console.log("blogs collection init finish");
})();