var express = require("express");
var mongoose = require("mongoose");
var MongoStore = require('connect-mongo')(express);
var Preloader = require("./preloader");
var blogs = require('./api/blog');
var user = require("./api/user");
var helmet = require('helmet');
var app = express();
mongoose.connect("mongodb://localhost/emblog");

app.configure(function(){
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(helmet.xframe());
  app.use(helmet.iexss());
  app.use(helmet.contentTypeOptions());
  app.use(helmet.cacheControl());
  app.use(express.cookieParser('notagoodserectkey'));
  app.use(express.session({
    store: new MongoStore({
      url: 'mongodb://localhost/session',
      auto_reconnect: true
    }),
    secret: 'notagoodserectkey',
    cookie: {httpOnly: true}
  }));
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
app.post('/login', user.login);

app.listen(3000);

console.log("Http server listening on port 3000");