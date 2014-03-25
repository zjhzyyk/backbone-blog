var express = require("express");
var mongoose = require("mongoose");
var Preloader = require("./preloader");
var blogs = require('./api/blog');
var app = express();
mongoose.connect("mongodb://localhost/emblog");

app.configure(function(){
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.disable('x-powered-by');
  app.use(new Preloader());
});

app.configure('development', function(){
  app.use(express.logger('dev'));
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));
});

app.get('/blogs/index', blogs.getBlogIndex);

app.listen(3000);

console.log("Http server listening on port 3000");