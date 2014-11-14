/**
 * Created by jiamiu on 14-8-9.
 * use crud-config="{json}" to specify config, use crud-params="{json}" to specify params
 */
var app = angular.module('node.crud',['util','ngResource','ngSanitize'])
  .controller('node.crud',function($scope,$resource,crud,$location,$attrs,util ){
    //this controller is respond for node list query, create, and update.

    //parse config
    var parsedConfig = util.parseJSON($attrs['crudConfig'],$scope)
    if( !parsedConfig.type ){
      return console.log("You need to use attr `node-config={json}` to specify which type of node you want to operate.")
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

    var preload = util.inject("preload","preload")
    var records = false
    var search = util.parseQuery(window.location.href.split("?").pop() )

    if( preload && preload.data( config.type )){
      //if there preload data
      params = _.extend( params, preload.query() )
      records = preload.data(config.type)

    }else{
      //read configuration from search and attributes
      var crudSearchOptions = $attrs['crudSearchFields']?util.parseJSON($attrs['crudSearchFields'],$scope): []
      var crudSearch = _.pick( search , crudSearchOptions)

      //console.log( crudSearchOptions, search )

      params = _.extend(params, _.pick(crudSearch , crudSearchOptions))
    }

    //expose model
    $scope.crud = crud(config, params, records )


    //if it is create page, we need to rewrite create method
    if( $attrs['redirect'] ){
      $scope.crud._create = $scope.crud.create
      $scope.crud.create = function( node ){
        return $scope.crud._create(node).then(function(){
          window.location.href = $attrs['redirect']
        })
      }
    }


    //if it is update page, we need to get the node
    var id
    if( id = (config.id || ( config.hrefId && matchHref( window.location.pathname + window.location.hash, config.hrefId )['id'] ))) {
      //pick useful param from search
      $scope.crud.get(id, _.pick(search,['populate']))
    }


    //api
    $scope.$on( config.type+'.query',function(){
      $scope.crud.query()
    })



    //utillities
    function matchHref( href, wildcard ){
      var tokenRex = /\/:([a-zA-Z0-9_-]+)/g,
        matches = wildcard.match( tokenRex),
        tokens = matches ? matches.map(function( str ){
          return str.slice(2)
        }) : [],
        hrefMatchRex = new RegExp( wildcard.replace(tokenRex,"/(\\w+)")),
        hrefMatches = href.match( hrefMatchRex),
        results = {}


      hrefMatches = hrefMatches && hrefMatches.slice(1)
      //console.log( tokens,hrefMatches, wildcard,tokenRex, wildcard.replace(tokenRex,"/(\\w+)"),href )
      for( var i in tokens ){
        results[tokens[i]] = hrefMatches[i]
      }
      return results

    }
  })
