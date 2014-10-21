/**
 * Created by jiamiu on 14-8-9.
 */

angular.module('util',['ngResource'])
  .filter('time',function(){
    return function( input,format){
      return moment(input).format( format || 'MM-DD hh:mm:ss')
    }
  })
  .filter('countChildren',function(){
    function count( input ){
      var num = 0
      _.forEach( input, function( child ){
        if(_.isObject( child ) ){
          num += count( child)
        }else{
          num++
        }
      })
      return num
    }

    return count
  })
  .service('util',function(){
    function parseJSON( str, scope ){
      return scope.$eval(str)
    }

    return {
      parseQuery : function( queryStr ){
        return _.reduce(queryStr.split("&"),function(a, b){
          b = b.split("=")
          a[b[0]] = b[1]
          return a
        },{})
      },
      makeQuery : function( obj ){
        return _.reduce(obj,function(a,v,k){a.push(k+"="+v);return a},[]).join("&")
      },
      inject : function( module, wanted ){
        var injected
        try{
          angular.module(module) && angular.injector([module]).invoke([wanted,function( $wanted ){ injected = $wanted}])
        }catch(e){
          console.log("module preload not loaded",e)
          return undefined
        }
        return injected
      },
      parseJSON : parseJSON
    }
  })
  .factory('crud',function( $resource,$http,pagination,util ){

    function append( arr1, arr2 ){
      arr2.forEach(function(i){
        arr1.push(i)
      })
    }

    function replace( arr1, arr2 ){
      arr1.splice(0)
      append( arr1, arr2)
    }
    /**
     * @param options object. keys:{
     *  resource : object,
     *  removeCallback : function,
     *  edit : function
     * }
     */
    return function( config, params, data ){
      if( !config.type ){
        console.log( 'you need to specify the type of node')
        return false
      }

      config = _.defaults(config,{
        range:3,
        url : "/"+config.type,
        advancedPage : true
      })

      params = _.defaults( params,{
        skip : 0,
        limit : 10,
        sort : 'id DESC'
      })

      var crud = _.defaults( config, {
        Resource :  $resource( config.url+'/:id', params),
        pagination : {
          index:null,
          count:null,
          display : []
        },
        data : {
          cache:null,
          cacheIndex : null,
          unCountable : null,
          count : null,
          records : []
        },
        params : params,
        query : function( params, useCache ){
          params = params || {}
          _.extend( crud, params )

          //first time
          if( crud.data.count === null){
            crud.count(function(count){
              if( count ){
                crud.updatePagination()
              }
            })
          }

          if( useCache ){
            if( !(params.skip < crud.data.cacheIndex ) && !(params.skip + params.limit > crud.data.cacheIndex + crud.data.cache.length ) ){
              crud.updateData()
              crud.updatePagination()
            }
          }else{
            crud.Resource.query(params).$promise.then(function(data){
              if( data.length < crud.params.limit && crud.data.unCountable ){
                crud.data.unCountable = false
              }
              crud.updateData(data)
              crud.updatePagination()
            })
          }

          return crud.data.records
        },
        updateData : function( records ){
          if( !records){
            replace( crud.data.records, crud.data.cache.slice( params.skip - crud.data.cacheIndex, params.limit) )
          }else{
            replace( crud.data.records, records)
          }
          if( ( crud.data.count===null || crud.data.count<(crud.params.skip+crud.data.records.length)) ){
            crud.data.count = crud.params.skip+crud.data.records.length
            console.log("update ")
          }
        },
        edit : function(){
          console.log("you need to implement edit function")
        },
        remove : function( r, $index, refresh){
          var promise = crud.Resource.remove({id:r.id}).$promise
          if( refresh ){
            crud.query()
          }
          return promise
        },
        create : function( item, refresh ){
          var promise =$http.post('/'+crud.type,item)
          if( refresh ){
            crud.query()
          }
          return promise
        },
        next:function( useCache ){
          if(!crud.data.unCountable && !((crud.pagination.index+1)<crud.pagination.count) ){ return false }
          crud.params.skip = crud.pagination.index * crud.params.limit
          crud.query( {},useCache )
          return true
        },
        count : function( cb ){
          var extraParams = _.pick( crud.params, _.without.apply(_,[Object.keys(crud.params),'limit','skip','sort']))
          var extraParamsString = Object.keys(extraParams)? "?"+ util.makeQuery( extraParams ) : ""

          console.log("sending query",'/count'+extraParamsString)
          $http({method:'get',url:config.url+'/count'+extraParamsString}).success(function(data){
            crud.data.count = data.count


            crud.data.unCountable = false

            if( cb ) cb(crud.data.count)
          }).error(function(){
            crud.data.unCountable = true
            if( cb ) cb(false)
          })
        },
        prev : function( useCache ){

        },
        goto : function( page, useCache ){
          crud.params.skip = page * crud.params.limit
          crud.query({},useCache)
        },
        updatePagination : function(){
          //init pagination
          crud.pagination.index = Math.floor(crud.params.skip / crud.params.limit)

          if( !crud.data.unCountable ){
            crud.pagination.count = Math.ceil( crud.data.count/ crud.params.limit )
            console.log("setting pagination count", crud.pagination.count)
          }else{
            if( crud.pagination.count === null || crud.pagination.count < crud.pagination.index+1){
              crud.pagination.count = crud.pagination.index+1
              console.log("setting pagination count", crud.pagination.count)
            }
          }

          if( config.advancedPage ){
            pagination( crud.pagination, config,  crud.data.unCountable )
          }
        }
      })

      if( data) _.extend( crud.data, data)
      return crud
    }
  })
.factory('pagination',function(){
    /**
     * options : {
     *  limit,
     *  count,
     *  range,
     *  current
     *  }
     */
    return function( pagination, config, unCountable ){

        pagination.display.splice(0)
        pagination.display.push( pagination.index )

        var min = pagination.index - 1,
          max = pagination.index +1

        while( min > -1 && min > (pagination.index- config.range)){
          pagination.display.unshift(min)
          min--
        }

        while( max < pagination.count  && max < (pagination.index + config.range)){
          pagination.display.push(max)
          max++
        }

        if( unCountable ){
          pagination.display.push( max )
        }

      console.log("update pagination.display", pagination.display)
      return pagination.display
    }
  })
  .factory('session',function(){
    var session = {},
      registered = {}
    return {
      item : function( name, setObj ){
        if( setObj ){

          if(_.isObject( session[name])){
            _.forEach( session[name],function(v,k){
              delete session[name][k]
            })
            _.extend( session[name], setObj )

          }else if(_.isArray(session[name])){
            session[name].splice(0)
            setObj.forEach(function(o){
              session[name].push(o)
            })

          }else{
            session[name] = setObj
          }

          return session[name]
        }else{

          if( session[name] === undefined ){
            console.log("no handler registered for ",name,session)
            return false
          }
          //need construct
          if( session[name] === null ){
            session[name] = registered[name].origin
            registered[name].handler( session[name] )
            return (_.isObject(session[name]) || _.isArray(session[name])) ? session[name]: session

          }else{
            return session[name]
          }
        }
      },
      register : function(name , origin, handler){
        registered[name] = {
          origin : origin,
          handler : handler
        }
        session[name] = null
      }
    }
  })
.filter('size',function(){
    function readablizeBytes(bytes) {
      var s = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
      var e = Math.floor(Math.log(bytes)/Math.log(1024));
      return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+" "+s[e];
    }
    return function( size ){
      return readablizeBytes(size)
    }
  })