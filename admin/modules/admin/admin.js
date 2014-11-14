angular.module('admin',['ui.router',
  'post',
  'user.edit',
  'user.session',
  'statistic',
  'setting.crud'])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      var path = window.location.pathname
      $stateProvider
        .state('statistics',{
          url : '/statistics',
          templateUrl : './templates/statistics.html',
          controller: function(){}
        })
        .state('user',{
          url : '/user',
          templateUrl : './templates/user.html'
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
      return "<div>" + (content?markdown.toHTML(content):"") + "</div>"
    }
  }).directive('autoFocus', function($timeout) {
    return {
      link: function ( scope, element, attrs ) {
        scope.$watch( attrs.autoFocus, function ( val ) {
          console.log( val)
          if ( angular.isDefined( val ) && val ) {
            $timeout( function () { element[0].focus(); } );
          }
        }, true);

        element.bind('blur', function () {
          if ( angular.isDefined( attrs.autoFocusLost ) ) {
            scope.$apply( attrs.autoFocusLost );

          }
        });
      }
    };
  })
