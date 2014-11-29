angular.module('admin',['ui.router',
  'post',
  'user',
  'user.session',
  'statistic',
  'setting'])
  .config(function(){

  })
  .controller( 'admin',function($scope,session,$rootScope){
      $scope.user = session.item('user')

    //global helper
    $scope.focus = function( selector ){
      $(selector).focus()
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
  }).filter('markdown',function(){
    var converter = new Showdown.converter()

    return function( content ){
      var marked = content
      try{
        marked = "<div>" + converter.makeHtml(content) +"</div>"
      }catch(e){
        console.log( "makeHtml failed", e)
      }
      return marked
    }

  }).directive('markdownWithImage',function (){

    var converter = new Showdown.converter({ extensions: ['imageupload'] })

    return function( scope, ele, attrs){
      var config = scope.$eval( attrs['markdownWithImage'] )
      var $content = $("<div></div>")

      ele.append($content)

      scope.$watch( config.model, function( content){
        if( content ){
          $content.html( converter.makeHtml( content ) )

          $content.find(".image-uploader").each(function() {
            var lineNumber = $(this).data("line")

            $(this).find(".fileupload").fileupload().fileupload('option',{
              url: config.url,
              autoUpload: true,
              add: function (e, data) {
                data.submit()
              },
              done: function (e, data) {
                var model = scope.$eval(config.model)
                var replacedWithImage = model.split("\n")
                replacedWithImage[lineNumber] = replacedWithImage[lineNumber].replace(/\(.*\)/,'') + "(/"+ data.result.path+")"
                scope.$apply(function(){
                  scope.$eval( config.model + "='" + replacedWithImage.join("\n")+"'" )
                })
              }
            })
          })
        }
      })
    }
  }).directive("confirmClose", function(){
    return function( scope, ele, attrs){

      //window.onbeforeunload = function (e) {
      //  return attrs['confirmClose'] || "Are you sure you want to leave?"
      //}

        scope.$on('$destroy', function(){
          window.onbeforeunload = null
      })
    }
  })



