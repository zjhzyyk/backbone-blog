var _ = require('underscore');
var extend = require('./extend');

module.exports = Model;

function Model(option) {
	_.extend(this, option);
	this.initialize.apply(this, arguments);
}

_.extend(Model.prototype, {
	initialize: function(){}
});

Model.extend = extend;