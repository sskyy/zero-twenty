angular.module("node.detail",[]).controller("node.detail",function($scope,$attrs){
  if( !$attrs['nodeUrl'] ){
    return console.log('you must use node-url to specify the node type and id')
  }

  var config = {
    type : "post",
    id : "1"
  }

  $http.get("/"+config.type+"/"+config.id).success(function( res){
    $scope.node = res
  })
})