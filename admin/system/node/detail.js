angular.module("node.detail",[]).controller("node.detail",function($scope,$attrs,$http){
  if( !$attrs['nodeType'] ){
    return console.log('you must use node-url to specify the node type and id')
  }

  $scope.get = function( id ){
    $http.get("/"+$attrs['nodeType']+"/"+id).success(function( res){
      $scope.node = res
    })
  }
})