var _ = require('underscore');
// var Events = require ('./events');
var extend = require('./extend');

module.exports = Collection;

function Collection(){
}

_.extend(Collection.prototype, {
	where: function(options, succeed, fail){
		data = {};
		succeed(data);
	}
});

Collection.extend = extend;