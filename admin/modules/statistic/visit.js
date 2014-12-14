angular.module('statistic.visit',['ngResource']).controller('visits',function( $scope, $http,$resource ){

  var type = 'GET /post/*-dailyView',
    url = '/statistic',
    limit = 7,
    sort = 'key DESC',
    Visit = $resource( url ,{type:type,limit:limit,sort:sort})


  Visit.query().$promise
    .then(function(data){
      $scope.today = data[0].value

      $scope.week = data.reduce(function(a, b){
        return a + b.value
      },0)
    })

})