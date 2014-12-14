angular.module('user',['user.edit','upload']).config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    var path = window.location.pathname
    $stateProvider
      .state('user', {
        url: '/user',
        templateUrl: './modules/user/user.html'
      })
  }])