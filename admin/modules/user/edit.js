angular.module('user.edit',['user.session']).controller('user.edit',function($scope,$http,session){

  $scope.user = session.item('user')
  $scope.systemFields = ['id','name','email','createdAt','updatedAt','lastLogin']

  $scope.isSystemField = function( name ){
    return _.indexOf($scope.systemFields, name) !== -1
  }

  $scope.update = function(){
    if( !$scope.user || !$scope.user.id ){
      return alert('user not logged in')
    }

    $scope.saved = false
    var user = JSON.parse(angular.toJson($scope.user))
    $http.put('/user/'+$scope.user.id,user).success(function(savedUser){
      $scope.user = savedUser
      $scope.saved = true
    })
  }

})