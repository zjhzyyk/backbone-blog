var View = require("../framework/view");

var LoginView = View.extend({
	parent: "index",
	parentMethod: "index",
	template: "login"
});

module.exports = LoginView;