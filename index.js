var config = require("./config")
var Promise = require('bluebird')

var twentyModule = {
  models : require('./models'),
  config : config,
  theme : {
    directory : 'public',
    mock : {
      "/post/:id" : "post.jade"
    },
    locals : config.locals,
    index : "/twenty/index"
  },
  listen : {
    "user.register.after" : function addRoleAdmin(){
      var bus = this
      var respond = bus.data("respond.data")
      if( respond && respond.id ){
        return bus.fire("user.update",{id:respond.id},{roles:["admin"]})
      }
    }
  },
  route : {
    "GET /user/logout" : function(req, res){
      req.session = null
      res.redirect("/")
    }
  },
  acl : {
    roles : {
      "loggedIn" : function(req){
        return req.session.user && req.session.user.id
      }
    },
    routes : {
      "/twenty/admin" : [{
        role:"loggedIn",
        "redirect":"/twenty/login"
      }]
    }
  },
  statistics : {
    log : {
      "GET /*" : "daily",
      "rest.fire.after" : {
        strategy : "feed",
        argv : ["post"]
      }
    }
  }
}

module.exports = twentyModule