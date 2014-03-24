var _ = require('underscore');
var Router = require("../routes");

module.exports = Preloader;

function Preloader (){
	this.router = new Router({server: true});
};

Preloader.prototype = {
	handle: function(req, res, next){
		console.log("get url", req.url);
		if (!this.router.navigate(req.url, res))
			this.router.navigate('/404',res);
	}
};