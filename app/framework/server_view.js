var _ = require('underscore');
var extend = require("./extend");
var JST = require("../../../templates/templates")(_);
var $ = require("cheerio");

function ServerView(options){
  if (this.beforeBuild()) return;
  _.extend(this, options);
  this.build();
}

_.extend(ServerView.prototype, {
  beforeBuild: function(){
    return false; //false means continue. true means break.
  },
  afterBuild: function(){},
  build: function(){
    if (this.parent && !this.wrapper) throw new Error("server view wrapper not defined.");
    if (!this.template) throw new Error("template not defined");
    if (!this.res) throw new Error("res not passed in");
    this.$el = $(JST[this.template](this.getModel()));
    if (this.parent) {
      var pel = this.getParent();
      if (pel) {
        pel.find(this.wrapper).html(this.$el);
        this.$el = pel;
      } else {
        this.$el = null;
      }
    }
    if (this.$el) this.afterBuild();
    if (!this.nosend && this.$el) this.res.send(this.$el.toString());
  },
  getModel: function(){
    return {};
  },
  getParent: function(data){
    var ParentView = require(this.parent);
    var p = new ParentView({nosend: true, data: data});
    return p.$el;
  }
});

ServerView.extend = extend;

module.exports = ServerView;