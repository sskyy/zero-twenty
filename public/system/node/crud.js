/**
 * Created by jiamiu on 14-8-9.
 * You must use `angular.module('node.curd').value('config',{})` to specify which type of node you want to operate.
 */
var app = angular.module('node.crud',['util','ngResource','ngSanitize'])
  .controller('node.crud',function($scope,$resource,crud,$location,$attrs,util ){
    var parsedConfig = util.parseJSON($attrs['crudConfig'],$scope)

    if( !parsedConfig.type ){
      return console.log("You must use attr `node-type=[type]` to specify which type of node you want to operate.")
    }

    var config = _.defaults( parsedConfig,{
      range:3,
      url : "/"+parsedConfig.type,
      advancedPage : true
    })

    var params = _.defaults( $attrs['crudParams']?util.parseJSON($attrs['crudParams'],$scope):{},{
      limit: 10,
      skip : 0,
      sort : "id DESC"
    })


    console.log( params, $scope, $scope.$parent )

    var preload = util.inject("preload","preload")
    var records = false

    if( preload && preload.data( config.type )){
      //if there preload data
      params = _.extend( params, preload.query() )
      records = preload.data(config.type)

    }else{
      //read configuration from search and attributes
      var crudSearchOptions = $attrs['crudSearchFields']?util.parseJSON($attrs['crudSearchFields'],$scope): []
      var search = _.pick( util.parseQuery(window.location.search.slice(1) ), crudSearchOptions)

      params = _.extend(params, _.pick(search , crudSearchOptions))
    }

    $scope.crud = crud(config, params, records )

    //api
    $scope.$on( config.type+'.query',function(){
      $scope.crud.query()
    })

  })
