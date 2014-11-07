angular.module('setting.crud',[]).controller("setting.crud",function($scope, $http){

  var originConfig

  $http.get('/config/list').success(function(config){
    originConfig = config
    $scope.config = pickLeaves(config)
  })

  $scope.add = function( key, v ){
    if( $scope.config[key] ) return console.log(key+"exist")

    $scope.config[key] = v
  }

  $scope.delete = function( key ){
    delete $scope[key]
  }

  $scope.reset = function(){
    $scope.config = originConfig
  }

  $scope.save = function(){
    $scope.saved = false
    $http.put('/config/save',{config:toObject($scope.config)}).success(function(){
      console.log( $scope.config)
      $scope.saved =true
      console.log( "saved")
    }).error(function(err){
      console.log( err )
    })
  }


  function pickLeaves( obj, preffix){
    preffix= preffix || ''
    var res = {}

    _.forEach( obj, function( v, k){
      if(_.isObject(v)){
        _.merge( res, pickLeaves(v,preffix?preffix+"."+k:k))
      }else{
        res[preffix?preffix+"."+k:k] = v
      }
    })

    return res
  }

  function toObject( obj ){
    var result = {}

    _.forEach(obj,function(v,k){
      if(k.indexOf(".")!==-1){
        var t = result
        var ks= k.split(".")
        ks.forEach(function(kk,i){
          if(  i!=ks.length-1){
            if(t[kk] === undefined ) t[kk] = {}
            t = t[kk]
          }else{
            t[kk] = v
          }
        })
      }else{
        result[k] = v
      }
    })

    walk(result, function( v, k, parent){
      if(_.isObject(v)){
        var isArray = Object.keys( v).every(function( key){
          return isIntStrStrict(key)
        })

        if( isArray ){
          parent[k] = _.values( v )
        }
      }
    })


    return result
  }


  function isIntStrStrict(key){
    return /(^[1-9][0-9]+|[0-9])/.test(key)
  }

  function walk( obj, cb){
    _.any( obj, function( v, k){
      if( cb( v, k, obj ) === false ) return true

      if( _.isObject( v)) walk( v, cb)
    })
  }
})