(function(){
  var Router = require("./routes");
  var BlogCollection = require("../collections/blogs");

  var App = window.App = {};
  App.router = new Router();
  App.collections.blogs = new BlogCollection();


})();