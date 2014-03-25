(function(){
  var App = window.App = require("./store");
  var BlogCollection = require("../collections/blogs");
  App.collections.blogs = new BlogCollection();
  var Router = require("../routes");  
  App.router = new Router();
})();