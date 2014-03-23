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
		console.log("get url", req.url);
		if (!this.router.navigate(req.url, res))
			this.router.navigate('/404',res);
	}
};