/**
 * Created by jiamiu on 14-8-9.
 */
angular.module('user.login',['util'])
  .controller('login',function( $scope, $http ){


    $scope.login = function(user){
      $http.post('/user/login',user).success(function(){
        window.location.href= '/page/static/admin'
      }).error(function(data, status){
        $scope.failedCode = status
      })
    }
  })
  .controller('register',function( $scope, $http){

    $scope.register = function(user){
      $http.post('/user/register',$scope.user).success(function(){
        window.location.href= '/'
      }).error(function(data, status){
        $scope.failedCode = status
      })
    }
  })
