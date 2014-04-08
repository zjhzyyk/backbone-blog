var User = require("../model/user");
var timeout = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days

var isAuth = function(req){
	if (req.session.username) {
		console.log("username exists");
		if (req.session.rememberme) {
			// console.log(typeof(req.session.tokenGenTime));
			var time = new Date();
			var loginTime = new Date(req.session.loginTime);
			if (time - loginTime < timeout) {
				return true; 
			} else {
				return false;
			}
		}
		else {
			console.log("not rememberme");
			return false;
		}
	} else {
		console.log("token doesn't exist");
		return false;
	}
};

module.exports.isAuth = isAuth;

module.exports.login = function(req, res){
	console.log("start checking login");
	var username = req.body.username;
	var password = req.body.password;
	var rememberme = req.body.rememberme;
	User.findOne({username: username}, function(err, user){
		console.log("find user in login function");
		if (err) {
			console.log("database find error", err);
			res.json(200, {message: "database find error", success: false});
		} else if (!user) {
			//invalid username, but should return incorrect password
			res.json(200, {message: "Incorrect password", success: false});
		} else {
			user.comparePassword(password, function(err, isMatch){
				if (err) {
					console.log("comparePassword error", err);
					res.json(200, {message: "comparePassword err", success: false});
				} else if (isMatch) {
					req.session.loginTime = new Date();
					req.session.username = username;
					if (rememberme) {
						req.session.cookie.maxAge = timeout;
						req.session.rememberme = true;
					}
					else {
						req.session.cookie.expire = false;
						req.session.rememberme = false;
					}
					res.json(200, {success: true});
				}
				else res.json(200, {message: "Incorrect password", success: false});
			});
		}
	});
};

module.exports.logout = function(req, res) {
	req.session.token = null;
	req.session.username = null;
	res.send(200);
};

// module.exports.isAuth = isAuth;

module.exports.register = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var usr = new User({ username: username, email: email, password: password });
	usr.save(function(err) {
		if(err) {
			console.log("database save error", err);
		} else {
			res.send(200);
		}
	});
};

module.exports.changePassword = function(req, res) {
	if (isAuth(req, res)) {
		var newPassword = req.body.newPassword;
		var oldPassword = req.body.oldPassword;

		User.findOne({username: req.session.username}, function(err, user){
			if (err) {
				console.log("database find error", err);
				res.json(200, {message: "database find error", success: false});
			} else if (!user) {
				res.json(200, {message: "invalid username", success: false});
			} else {
				user.comparePassword(oldPassword, function(err, isMatch){
					if (err) {
						console.log("comparePassword error", err);
						res.json(200, {message: "comparePassword err", success: false});
					} else if (isMatch) {
						user.password = newPassword;
						user.save(function (err) {
							if (err) {
								console.log("save error", err);
							} else {
								res.json(200, {success: true});
								console.log("change password successfully.");
							}
						});
					} else {
						res.json(200, {message: "incorrect password", success: false});
					}
				});
			}
		});
	}
};

module.exports.getUser = function(req, res) {
	console.log("starts getUser");
	if (isAuth(req, res)) {
		res.json(200, {username: req.session.username});
	} else {
		console.log("unauth in getUser");
		res.json(200, {});
	}
};