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
		_.any(this.router.handlers, function(handler) {
			var args = handler.route.exec(req.url);
			_.extend(args, {res: res});
			if (args!==null) {
				handler.callback(args);
				next();
				return;
			}
		});
		next();
	}
};