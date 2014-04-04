var View = require("../../framework/view");

module.exports = View.extend({
  template: "dropdown",
  //must put all events in a function other than delegateEvents. Otherwise, override initialize function.
  attachEvents: function(){
    if (!this.dropdownLink || !this.dropdownMenu) throw new Error("please specify selectors of dropdownLink and dropdownMenu");
    _.bindAll(this, "closeDropdown", "toggleDropdown");
    $("body").on("click", this.closeDropdown);
    this.$(this.dropdownLink).on("click", this.toggleDropdown);
  },
  closeDropdown: function(e){
    this.$(this.dropdownMenu).hide();
  },
  toggleDropdown: function(e){
    e.preventDefault();
    e.stopPropagation();
    this.$(this.dropdownMenu).toggle();
  },
  dispose: function(){
    $("body").off("click", this.closeDropdown);
    this.$(this.dropdownLink).off("click", this.toggleDropdown);
    this.$el = null;
  }
});