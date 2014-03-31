var _ = require('underscore');
var Router = require("../routes");

module.exports = Preloader;

function Preloader (){
	this.router = new Router({server: true});
};

Preloader.prototype = {
	handle: function(req, res, next){
    if (req.method !== "GET") next();
		console.log("get url", req.url);
		if (!this.router.loadUrl(req.url, res))
			this.router.loadUrl('/404',res);
	}
};