var View = require("../../../framework/view");
var Blog = require("../../../models/blog");

module.exports = View.extend({
  template: "blogs/compose",
  events: {
    "click .save-blog": "save"
  },
  initialize: function(){
    this.model = {
      blog: new Blog()
    };
    this.render();
    this.delegateEvents();
    var options = {
      editor: document.getElementById("blog-content"),
      debug: true,
      list: [
        'blockquote', 'h2', 'h3', 'p', 'insertorderedlist', 'insertunorderedlist',
        'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'
      ]
    };
    this.pen = new Pen(options);
  },
  save: function(e){
    e.preventDefault();
    var self = this;
    $.post("/compose", {
      title: this.$("#blog-title").text(),
      content: this.$("#blog-content").html(),
      createTime: self.model.blog.createTime
    }).then(function(response){
      // self.set('errorMessage', response.message);
      if (response.success) {
        self.go('/');
      }
    });
  }
});