var mongoose = require("mongoose");

var BlogSchema = mongoose.Schema({
	title: String,
	content: String,
	createTime: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;