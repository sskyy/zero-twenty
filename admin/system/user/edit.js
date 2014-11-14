angular.module('user.edit',['user.session']).controller('user.edit',function($scope,$http,session,$attrs){

  $scope.user = session.item('user')
  $scope.omitFields = $attrs['omit'] ? $attrs['omit'].split(",") : []

  $scope.isOmitField = function( name ){
    return _.indexOf($scope.omitFields, name) !== -1
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