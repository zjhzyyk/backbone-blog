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
    if (_.isArray(models)) this.models.concat(models);
    else this.models.push(models);
  },
});

Collection.extend = extend;