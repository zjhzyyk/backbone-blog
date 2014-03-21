var _ = require('underscore');
var map = require("./routes");
var Router = require("../framework/router");

module.exports = Preloader;

function Preloader (){
	this.router = new Router({server: true});
	var route, routes = _.keys(map);
	while ((route = routes.pop()) != null) {
		this.router.route(route, map[route]);
	}
};
Preloader.prototype = {
	handle: function(req, res, next){
		if (!this.router.navigate(req.url, res))
			this.router.navigate('/404',res);
		// _.any(this.router.handlers, function(handler) {
		// 	console.log("req.url", req.url);
		// 	var args = handler.route.exec(req.url);
		// 	console.log("args in url", args);
		// 	if (args!==null) {
		// 		_.extend(args, {res: res});
		// 		handler.callback(args);
		// 		return;
		// 	}
		// });
	}
};