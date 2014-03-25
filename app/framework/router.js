require("../client/views/blogs/index");  
require("../client/views/blogs/show");
require("../client/views/404");

var _ = require('underscore');
var extend = require('./extend');
var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
var namedParam    = /:\w+/g;

module.exports = Router;

function Router(options){
  // console.log("router options", options);
  _.extend(this, options);
  this.handlers = [];
  this.initialize();
  this.inInit = false;
  if (!this.server)
    this.start();
};

_.extend(Router.prototype, {
  initialize: function(){
    if (!this.routes) throw new Error("no routes specified");
    var route, routes = _.keys(this.routes);
    while ((route = routes.pop()) != null) {
      this.route(route, this.routes[route]);
    }
  },
  checkUrl: function(e){
    console.log("url changes to", window.location.pathname + window.location.search);
    var current = decodeURI(window.location.pathname + window.location.search);
    if (current===this.prevURL) return;
    this.navigate(current);
    this.prevURL = current;
  },
  start: function(){
    this.inInit = true;
    this.checkUrl();
    $(document).on('popstate', this.checkUrl);
  },
  stop: function(){
    $(document).off('popstate', this.checkUrl);
  },
  bindRoute: function(route, callback){
    this.handlers.unshift({route: route, callback: callback});
  },
  route: function(url, view){
    var self = this;
    url = url.replace(escapeRegExp, '\\$&').replace(namedParam, '(.*?)');
    this.bindRoute(new RegExp("^"+url+'(?:\\?([\\s\\S]*))?$'), function(args){
      var viewPath = self.server ? "../server/views/" : "../client/views/";
      viewPath += view;
      console.log("initialize", viewPath);
      var SubView = require(viewPath);
      _.extend(args, {server: self.server});
      var appView = new SubView(args);
      if (self.server) appView.build(args);
    });
  },
  navigate: function(url, res) {
    var self = this;
    return _.any(this.handlers, function(handler) {
      console.log("start checking", handler.route);
      var args = handler.route.exec(url);
      if (args) {
        args = {args: args, navigate: !self.inInit};
        self.inInit = false;
        if (res) _.extend(args, {res: res});
        handler.callback(args);
        if (!self.server) window.history.pushState({}, document.title, url);
        return true;
      }
    });
  }
});

Router.extend = extend;