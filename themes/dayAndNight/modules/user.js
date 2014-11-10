angular.module('user',['ngSanitize']).controller('me',function($scope, $http){


  $http.get('/user/1').success(function(user){
    $scope.me = user
    $scope.me.about = markdown.toHTML($scope.me.about)

    console.log( $scope.me.about)
  })
})