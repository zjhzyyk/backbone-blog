var _ = require('underscore');
var extend = require("./extend");
var JST = require("../templates/templates")(_);
var app = require("../client/store");

function View(options){
  _.extend(this, options);
  if (!this.server) {
    this.cid = _.uniqueId('view');
    this.initialize();
    this.render();
  }
};

var delegateEventSplitter = /^(\S+)\s*(.*)$/;

_.extend(View.prototype, {
  initialize: function(){},
  $: function(selector) {
    return this.$el.find(selector);
  },
  render: function(){},
  afterCreate: function(){},
  //'mousedown .title':  'edit',
  delegateEvents: function(events) {
    this.$el.on("click", "a", "navigate")
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
  navigate: function(e){
    e.preventDefault();
    console.log("navigate to", $(e.target).attr("href"));
    app.router.navigate($(e.target).attr("href"));
  },
  undelegateEvents: function() {
    this.$el.off('.delegateEvents' + this.cid);
    return this;
  }
});

View.extend = extend;

module.exports = View;