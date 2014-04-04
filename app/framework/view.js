var _ = require('underscore');
var extend = require("./extend");
var JST = require("../templates/templates")(_);
var app = require("../client/store");

function View(options){
  this.model = {};
  _.extend(this, options);
  if (!this.server) {
    this.cid = _.uniqueId('view');
    this.wrapper = "#main";
    this.initialize();
  }
};

var delegateEventSplitter = /^(\S+)\s*(.*)$/;

_.extend(View.prototype, {
  initialize: function(){
    this.render();
    this.afterRender();
    this.delegateEvents();
  },
  $: function(selector) {
    return this.$el.find(selector);
  },
  render: function(){
    if (!this.template) throw new Error("template not specified");
    this.$el = $(this.wrapper);
    this.$el.html(JST[this.template](this.model));
  },
  afterRender: function(){},
  //'mousedown .title':  'edit',
  delegateEvents: function(events) {
    // console.log("events:", this.events);
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
        // console.log(eventName, selector, method, "attached");
      }
    }
    return this;
  },
  undelegateEvents: function() {
    this.$el.off('.delegateEvents' + this.cid);
    return this;
  },
  dispose: function(){
    console.log("start undelegating"+this.cid);
    this.undelegateEvents();
    this.$el = null;
  },
  go: function(url){
    app.router.navigate(url);
  }
});

View.extend = extend;

module.exports = View;