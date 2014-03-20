this["JST"] = this["JST"] || {};

this["JST"]["blogs/index"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += 'blog index';}return __p};

this["JST"]["blogs/show"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += 'single blog';}return __p};

this["JST"]["index"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<!doctype html>\n<html>\n<head>\n\t<link href=\'http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,700\' rel=\'stylesheet\' type=\'text/css\'>\n\t<link rel="stylesheet" type="text/css" href="dist/style.css">\n</head>\n<body>\n\t<header>\n\t\t<h1>My blog</h1>\n\t</header>\n\t<nav>\n\t\t<ul>\n\t\t\t<li><a href="">projects</a></li>\n\t\t\t<li><a href="">about</a></li>\n\t\t\t<li><a href="/login">login</a></li>\n\t\t</ul>\n\t</nav>\n\t' +((__t = ( partial )) == null ? '' : __t) +'\n\t<footer>\n\t\t<p>Copyright &copy; 2014 - daxuegou</p>\n\t</footer>\n\t<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>\n  \t<script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js"></script>\n\t<script type="text/javascript" src="dist/main.js"></script>\n</body>\n</html>';}return __p};

this["JST"]["login"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<form>\n<input type="text">\n<input type="text">\n<input type="button">\n</form>';}return __p};