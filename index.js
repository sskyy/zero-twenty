module.exports = {
  models : require('./models'),
  theme : {
    directory : 'public',
    mock : {
      "/post/:id" : "post.jade"
    },
    locals : {
      '*' : {
        duoshuo : 'twenty'
      }
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