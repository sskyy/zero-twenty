angular.module('user.edit',['user.session']).controller('user.edit',function($scope,$http,session){

  $scope.user = session.item('user')
  $scope.systemFields = ['id','name','password','email','createdAt','updatedAt','lastLogin']

  $scope.isSystemField = function( name ){
    return _.indexOf($scope.systemFields, name) !== -1
  }

  $scope.update = function( updateObj ){
    if( !$scope.user || !$scope.user.id ){
      return alert('user not logged in')
    }

    $scope.saved = false

    updateObj = JSON.parse(angular.toJson(updateObj))
    $http.put('/user/'+$scope.user.id,updateObj).success(function(savedUser){
      $scope.user = savedUser
      $scope.saved = true
    })
  }
})