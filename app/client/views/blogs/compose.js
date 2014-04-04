var View = require("../../../framework/view");
var Blog = require("../../../models/blog");

module.exports = View.extend({
  template: "blogs/compose",
  initialize: function(){
    this.model = {
      blog: new Blog()
    };
    this.render();
    var options = {
      editor: document.getElementById("blog-content"),
      debug: true,
      list: [
        'blockquote', 'h2', 'h3', 'p', 'insertorderedlist', 'insertunorderedlist',
        'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'
      ]
    };
    this.pen = new Pen(options);
  }
});