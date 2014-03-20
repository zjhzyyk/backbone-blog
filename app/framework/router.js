var _ = require('underscore');
var extend = require('./extend');

module.exports = Router;

function Router(options){
  _.extend(this, options);
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
    _.any(this.handlers, function(handler) {
      var args = handler.route.exec(current);
      if (args) {
        handler.callback(args);
        return true;
      }
    });
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
    var url = key.trim();
    var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    var namedParam    = /:\w+/g;
    url = url.replace(escapeRegExp, '\\$&').replace(namedParam, '(.*?)');
    var view = value.slice(0,value.indexOf("#"));
    var method = value.slice(value.indexOf("#")+1);
    this.bindRoute(new RegExp("^"+url+'(?:\\?([\\s\\S]*))?$'), function(args){
      //TODO: check if view exists in file system
      var viewPath = this.server ? "../server/views/" : "../client/views/";
      if (method.length) viewPath += (view+"/"+method);
      console.log("initialize", viewPath);
      var SubView = require(viewPath);
      var appView = new SubView({server: this.server});
      if (this.server) appView.build(args);
    });
  }
});

Router.extend = extend;