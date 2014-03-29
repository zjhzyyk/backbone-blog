require("../models/blog");

var _ = require('underscore');
var Events = require ('./events');
var extend = require('./extend');

module.exports = Collection;

function Collection(options){
  if (!this.model) throw new Error("model is not specified");
  _.extend(this, options);
  this.models = [];
}

_.extend(Collection.prototype, Events, {
  add: function(models, noDup){
    //TODO: when noDup, avoid duplication
    var Model = require("../models/"+this.model);
    var len = models.length;
    var i = 0;
    for (;i<len; i++) models[i] = new Model(models[i]);
    this.models = this.models.concat(models);
  },
  boot: function(models) {
    console.log("start bootstrap")
    this.add(models);
    this.trigger("ready");
  },
  where: function(opt) {
    var ret = _.find(this.models, function(model){
      var keys = _.keys(opt);
      var i=0,len=keys.length;
      for (;i<len;i++) if (!model[keys[i]] || model[keys[i]].toString()!==opt[keys[i]]) return false;
      return true;
    });
    console.log("find", ret, "in collection find");
    return ret;
  }
});

Collection.extend = extend;