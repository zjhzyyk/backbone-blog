var mongoose = require("mongoose");

var BlogSchema = mongoose.Schema({
	title: String,
  ititle: String,
	content: String,
	createTime: { type: Date, default: Date.now },
  year: Number,
  month: Number
});

BlogSchema.pre('save',function(next){
  this.year = this.createTime.getFullYear();
  this.month = this.createTime.getMonth();
  this.title = this.title.replace(/&nbsp;/g, " ");
  this.ititle = this.title.replace(/\s/g, "-").toLowerCase();
  next();
});

var Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;