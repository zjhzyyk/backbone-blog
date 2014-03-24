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
    if (_.isArray(models)) {
      var len = models.length;
      var i = 0;
      for (;i<len; i++) models[i] = new Model(models[i]);
      this.models = this.models.concat(models);
    }
    console.log("add finish");
  },
  boot: function(models) {
    this.add(models);
    this.trigger("ready");
  },
  where: function(opt) {
    return _.find(this.models, function(model){
      _.each(opt, function(value, key){
        if (model[key].toString()!==value) return false;
      })
      return true;
    });
  }
});

Collection.extend = extend;