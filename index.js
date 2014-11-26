var config = require("./config")
var Promise = require('bluebird')

var twentyModule = {
  models : require('./models'),
  config : config,
  i18n : require("./dict"),
  theme : [{
    directory : "admin",
    prefix : "admin",
    locals : config.locals
  },config.theme],
  listen : {
    "user.register.after" : function addRoleAdmin(){
      var bus = this
      var respond = bus.data("respond.data")
      if( respond && respond.id ){
        return bus.fire("user.update",{id:respond.id},{roles:["admin"]})
      }
    }
  },
  acl : {
    routes : {
      "/twenty/admin/index" : [{
        role:"admin",
        "redirect":"/twenty/admin/login"
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
  },
  route : {
    "GET /user/logout" : function(req, res){
      req.session = null
      res.redirect("/")
    }
  }
}

module.exports = twentyModule