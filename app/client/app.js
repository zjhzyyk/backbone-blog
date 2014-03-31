(function(){
  var App = window.App = require("./store");
  var BlogCollection = require("../collections/blogs");
  var Router = require("../routes");  
  App.collections.blogs = new BlogCollection();
  App.session = {loggedIn: false, username: ""};
  App.router = new Router();
})();