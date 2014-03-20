var Model = require("../framework/model");

module.exports = Model.extend({
	initialize: function(){
		if (!this.createTime instanceof Date) this.createTime = new Date(this.createTime);
	},
	getYear: function(){
		return this.createTime.getFullYear();
	},
	getMonth: function(){
		var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
		return monthNames[this.createTime.getMonth()];
	},
	getDate: function(){
		return this.createTime.getDate();
	}
});