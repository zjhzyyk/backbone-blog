var View = require("../../../framework/view");

module.exports = View.extend({
	template: "blogs/index",
  initialize:function(){
    
  },
  render: function() {
    this.$el = $('body');
    this.delegateEvents();
  }
});