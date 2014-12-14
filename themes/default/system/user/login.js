/**
 * Created by jiamiu on 14-8-9.
 */
angular.module('user.login',['util'])
  .controller('login',function( $scope, $http,$attrs ){
    $scope.login = function(user){
      $http.post('/user/login',user).success(function(){
        window.location.href= $attrs['redirect']
      }).error(function(data, status){
        $scope.failedCode = status
      })
    }
  })
  .controller('register',function( $scope, $http,$attrs){
    $scope.register = function(user){
      $http.post('/user/register',$scope.user).success(function(){
        window.location.href= $attrs['redirect']
      }).error(function(data, status){
        $scope.failedCode = status
      })
    }
  })
