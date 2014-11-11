angular.module('admin',['ui.router',
  'admin.post.manage',
  'index.crud',
  'user.edit',
  'user.session',
  'upload',
  'statistic',
  'setting.crud'])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      var path = window.location.pathname
      $stateProvider
        .state('posts', {
          url : "/posts",
          templateUrl: './templates/posts.html'
        })
        .state('create', {
          url : "/create",
          templateUrl: './templates/create.html'
        })
        .state('edit', {
          url : "/edit/:id",
          templateUrl: './templates/edit.html'
        })
        .state('statistics',{
          url : '/statistics',
          templateUrl : './templates/statistics.html',
          controller: function(){}
        })
        .state('user',{
          url : '/user',
          templateUrl : './templates/user.html',
        })
        .state('setting',{
          url : '/setting',
          templateUrl : './templates/setting.html'
        })

      $urlRouterProvider.otherwise("/posts");
    }]).controller( 'admin',function($scope,session,$rootScope){
      $scope.user = session.item('user')

    //global helper
    $scope.focus = function( selector ){
      $(selector).focus()
    }


  }).filter('markdown',function(){
    return function( content ){
      return markdown.toHTML(content)
    }
  })
