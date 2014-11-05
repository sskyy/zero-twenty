(function(){

  var module = angular.module('i18n',[])
  module.run(function($rootScope,$http){

    function parseQuery( queryStr ){
      var query = {}
      queryStr.split("&").forEach(function(a){
        a = a.split("=")
        query[a[0]] = a[1]
      },{})
      console.log( query)
      return query
    }

    var lang = "en"
    if( window.location.search.slice(1) ){
      lang = parseQuery(window.location.search.slice(1)).lang || lang
    }else{
      console.log( window.location.search,window.location.search.slice(1))
    }

    $http.get("/i18n/dict/"+lang).success( function( r){
      var resStore = {}
      resStore[lang] = r
      i18n.init({
        lng: lang,
        resStore: resStore,
        fallbackLng: 'en',
        debug:true
      })
      $rootScope.$broadcast("i18n")
    })

  }).directive('i18n',function(){
      return function( $scope, ele, attrs){
        console.log( ele.text())
        $scope.$on("i18n", function(){
          ele.html(i18n.t( attrs['ns']+":"+ ele.text() ))
        })
      }
  })
})()

