var View = require("../../framework/view");
var _ = require("underscore");
var JST = require("../../templates/templates")(_);

/*
this is like an interface or mixin. can't instantiate from here. 
must extend, specify template, and then instantiate
*/
module.exports = View.extend({
  events: {
    "click .alert-close": "clearMessage",
    "click .save-btn": "save"
  },
  clearMessage: function(e){
    $(e.target).parent().remove();
  },
  clearAllMessages: function(){
    this.$(".alert").remove();
  },
  addMessage: function(str){
    this.$el.prepend(JST['form/message']({message: str}));
  }
});