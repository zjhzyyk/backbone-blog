var _ = require('underscore');
var extend = require('./extend');

module.exports = Router;

function Router(options){
  console.log("router options", options);
  _.extend(this, options);
  console.log("router this.server", this.server);
  this.handlers = [];
  if (!this.server)
    this.initialize();
};

_.extend(Router.prototype, {
  initialize: function(){
    this.start();
  },
  checkUrl: function(e){
    console.log("start checking url");
    var current = decodeURI(window.location.pathname + window.location.search);
    if (current===this.prevURL) return;
    this.navigate(current);
    this.prevURL = current;
  },
  start: function(){
    $(document).on('popstate', this.checkUrl);
  },
  stop: function(){
    $(document).off('popstate', this.checkUrl);
  },
  bindRoute: function(route, callback){
    this.handlers.unshift({route: route, callback: callback});
  },
  route: function(key, value){
    var self = this;
    var url = key.trim();
    var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    var namedParam    = /:\w+/g;
    url = url.replace(escapeRegExp, '\\$&').replace(namedParam, '(.*?)');
    var hashIndex = value.indexOf("#");
    if (hashIndex<0) {
      var view = value;
    } else {    
      var view = value.slice(0,value.indexOf("#"));
      var method = value.slice(value.indexOf("#")+1);
    }
    this.bindRoute(new RegExp("^"+url+'(?:\\?([\\s\\S]*))?$'), function(args){
      console.log("server in router", self.server);
      var viewPath = self.server ? "../server/views/" : "../client/views/";
      if (hashIndex<0)
        viewPath += view;
      else 
        viewPath += (view+"/"+method);
      console.log("initialize", viewPath);
      var SubView = require(viewPath);
      var appView = new SubView({server: self.server});
      console.log("appView init finishes");
      if (self.server) appView.build(args);
    });
  },
  navigate: function(url, res) {
    _.any(this.handlers, function(handler) {
      var args = handler.route.exec(url);
      if (args) {
        if (res) _.extend(args, {res: res});
        handler.callback(args);
        return true;
      }
    });
    return false;
  }
});

Router.extend = extend;