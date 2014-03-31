require("../client/views/blogs/index");  
require("../client/views/blogs/show");
require("../client/views/404");
require("../client/views/user/login");

var _ = require('underscore');
var extend = require('./extend');
var app  = require("../client/store");
var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
var namedParam    = /:\w+/g;

module.exports = Router;

function Router(options){
  // console.log("router options", options);
  _.extend(this, options);
  _.bindAll(this, 'checkUrl', 'onLinkClick');
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
    if (this.alreadyInit) {
      this.alreadyInit = false;
      return;
    }
    console.log("url changes to", window.location.pathname + window.location.search);
    var current = decodeURI(window.location.pathname + window.location.search);
    if (current===this.prevURL) return;
    // if (!this.inInit) {
    //   console.log("push", current, "in checkUrl")
    //   window.history.pushState({}, document.title, current);
    // }
    this.loadUrl(current);
  },
  loadUrl: function(url, res) {
    var self = this;
    return _.any(this.handlers, function(handler) {
      console.log("start checking", handler.route);
      var args = handler.route.exec(url);
      if (args) {
        args = {args: args, navigate: !self.inInit};
        self.inInit = false;
        if (res) _.extend(args, {res: res});
        handler.callback(args);
        this.prevURL = url;
        return true;
      }
    });
  },
  start: function(){
    this.inInit = true;
    this.checkUrl();
    this.alreadyInit = true;
    $('body').on('click', "a[href^='/']", this.onLinkClick);
    $(window).on('popstate', this.checkUrl);
  },
  stop: function(){
    $(window).off('popstate', this.checkUrl);
    $('body').off('click', "a[href^='/']", this.onLinkClick);
  },
  onLinkClick: function(e){
    e.preventDefault();
    console.log("navigate to", $(e.target).attr("href"));
    this.navigate($(e.target).attr("href"));
  },
  bindRoute: function(route, callback){
    this.handlers.unshift({route: route, callback: callback});
  },
  route: function(url, viewName){
    var self = this;
    url = url.replace(escapeRegExp, '\\$&').replace(namedParam, '(.*?)');
    this.bindRoute(new RegExp("^"+url+'(?:\\?([\\s\\S]*))?$'), function(args){
      var viewPath = self.server ? "../server/views/" : "../client/views/";
      viewPath += viewName;
      console.log("initialize", viewPath);
      var View = require(viewPath);
      _.extend(args, {server: self.server});
      var view = new View(args);
      if (app.currentView) app.currentView.dispose();
      if (!self.server) app.currentView = view;
      if (self.server) view.build(args);
    });
  },
  navigate: function(url) {
    var self = this;
    if (self.loadUrl(url) && !self.server) {
      console.log("push", url, "in navigate");
      window.history.pushState({}, document.title, url);
    }
  }
});

Router.extend = extend;