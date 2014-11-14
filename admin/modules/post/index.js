angular.module('post',['post.create','post.edit','post.upload','ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('posts', {
        url : "/posts",
        templateUrl: './modules/post/posts.html'
      })
      .state('create', {
        url : "/create",
        templateUrl: './modules/post/create.html'
      })
      .state('edit', {
        url : "/edit/:id",
        templateUrl: './modules/post/edit.html'
      })
    $urlRouterProvider.otherwise("/posts");

  })