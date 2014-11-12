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
      return "<div>" + markdown.toHTML(content) + "</div>"
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
  }).directive('elastic', [
    '$timeout',
    function($timeout) {
      return {
        restrict: 'A',
        link: function($scope, element) {
          var resize = function() {
            return element[0].style.height = "" + element[0].scrollHeight + "px";
          };
          element.on("blur keyup change", resize);
          $timeout(resize, 0);
        }
      };
    }
  ]);
