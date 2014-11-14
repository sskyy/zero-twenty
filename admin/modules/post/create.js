/**
 * Created by jiamiu on 14-8-9.
 * You must use `angular.module('node.crud').value('nodeConfig',{})` to specify which type of node you want to operate.
 * and use `angular.module('node.crud').value('indexConfig',[])` to specify which indexes node may have
 */


angular.module('post.create', ['ui.codemirror','ngTagEditor','node.crud'])
  .controller( 'post.create', function( $http, $attrs,$scope){

  }).directive("scrollSync",function(){

    return function( scope, ele, attrs){
      var $target = $(attrs['scrollSync']);

      var sync = function(e){
        var percentage = this.scrollTop / (this.scrollHeight - this.offsetHeight);
        ele[0].scrollTop = percentage * (ele[0].scrollHeight - ele[0].offsetHeight);
      }
      $target.on( 'scroll', sync);
    }

  })
