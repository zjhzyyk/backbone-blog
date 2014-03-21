var _ = require('underscore');
var extend = require("./extend");
var JST = require("../templates/templates")(_);

function View(options){
  _.extend(this, options);
  if (!this.server) {
    this.cid = _.uniqueId('view');
    this.initialize();
    this.render();
    this.delegateEvents();
    this.afterCreate();
  }
};

var delegateEventSplitter = /^(\S+)\s*(.*)$/;

_.extend(View.prototype, {
  initialize: function(){
    if (!this.template && !this.id && !this.tagName) {
      throw new Error("element not specified");
      return;
    }
    if (this.template && !JST[this.template] && !this.id && !this.tagName) {
      throw new Error("template not exists or template name is wrong");
      return;
    }
    if (this.id) {
      this.$el = $("#"+this.id);
      console.log("get element from DOM, id is", this.id);
    }
    if (!this.$el || !this.$el.length) {
      if (this.template) {
        this.$el = $(JST[this.template](this));
        console.log("get element from template", this.template);
      } else if (this.tagName) {
        this.$el = $('<'+this.tagName+'>');
      }
      if (this.id) this.$el.attr("id", this.id);
    }
    if (this.$el) this.el = this.$el[0];
  },
  $: function(selector) {
    return this.$el.find(selector);
  },
  render: function(){},
  afterCreate: function(){},
  //'mousedown .title':  'edit',
  delegateEvents: function(events) {
    if (!(events || (events = _.result(this, 'events')))) return this;
    this.undelegateEvents();
    for (var key in events) {
      var method = events[key];
      if (!_.isFunction(method)) method = this[events[key]];
      if (!method) continue;

      var match = key.match(delegateEventSplitter);
      var eventName = match[1], selector = match[2];
      method = _.bind(method, this);
      eventName += '.delegateEvents' + this.cid;
      if (selector === '') {
        this.$el.on(eventName, method);
      } else {
        this.$el.on(eventName, selector, method);
      }
    }
    return this;
  },
  undelegateEvents: function() {
    this.$el.off('.delegateEvents' + this.cid);
    return this;
  }
});

View.extend = extend;

module.exports = View;