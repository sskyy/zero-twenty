angular.module('statistic',['statistic.visit','statistic.duoshuo.newest','statistic.board']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('statistic', {
        url: '/statistic',
        templateUrl: './modules/statistic/statistic.html',
        controller: function () {}
      })
  })