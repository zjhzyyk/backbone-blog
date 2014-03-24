var Model = require("../framework/model");

module.exports = Model.extend({
	initialize: function(){
		if (!(this.createTime instanceof Date)) this.createTime = new Date(this.createTime);
		this.year = this.createTime.getFullYear();
		this.month = this.createTime.getMonth()+1;
		this.dashTitle = this.title.replace(/&nbsp;/, " ").split(/\s+/).join("-").toLowerCase();
		this.time = this.getTime();
	},
	getMonth: function(){
		var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
		return monthNames[this.createTime.getMonth()];
	},
	getDate: function(){
		return this.createTime.getDate();
	},
	getLink: function(){
		return "/blog/" + this.year + "/" + this.month + "/" + this.dashTitle;
	},
	daySuffix: function(day){
		if (day>=11 && day <=13) return "th";
		if (day%10==1) return "st";
		if (day%10==2) return "nd";
		if (day%10==3) return "rd";
		return "th";
	},
	getTime: function(){
		return this.getMonth()+" "+this.getDate()+this.daySuffix(this.getDate())+", "+this.year;
	}
});