var Collection = require("../framework/collection");
var config = require("../config");

module.exports = Collection.extend({
  model: 'blog',
  page: function(num) {
    var perpage = config.blogsPerPage;
    return this.models.slice((num-1)*perpage, num*perpage);
  }
});