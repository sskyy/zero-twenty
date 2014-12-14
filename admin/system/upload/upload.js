angular.module('upload',[])
.directive('nodeUpload', function () {
  return function (scope, element, attrs) {
    var config;
    config = scope.$eval(attrs['nodeUpload']);
    console.log( $(element).find("[browse-trigger]"))
    var uploader = new plupload.Uploader({
      runtimes: 'html5,flash,html4',
      url : config.url,
      browse_button: $(element).find("[browse-trigger]")[0],
      container : element[0],
      max_file_size: '100mb',
      flash_swf_url: 'lib/Moxie.swf',
      max_retries: 1,
      chunk_size: '4mb',
      init: {
        'FilesAdded': function(up, files) {
          scope.$apply(function(){
            var attachedObj = scope.$eval(config.attach)

            if( files.length ==1){
              attachedObj[config.field] = files[0]
            }else{
              attachedObj[config.field] = files
            }
            console.log(attachedObj)
          })

          if(config.auto){
            scope.upload()
          }
        },
        'BeforeUpload': function(up, file) {
          //console.log( file.getSource(), file.getNative())
          //var attachedObj = scope.$eval(config.attach)
          //
          //if( config.multiple ){
          //  attachedObj[config.field] = scope.node[config.attach] || []
          //  attachedObj[config.field].push( _.extend(file,{status:'uploading'}) )
          //}else{
          //  attachedObj[config.field] = _.extend(file,{status:'uploading'})
          //}
        },
        'UploadProgress': function(up, file) {
        },
        'FileUploaded': function(up, file, info) {
          scope.$apply(function(){
            console.log( up, file, info)

            var res = JSON.parse(info.response)
            file.status = 'uploaded'
            var attachedObj = scope.$eval(config.attach)

            if( config.multiple ){
              attachedObj[config.field]= [res]
            }else{
              attachedObj[config.field] = res
            }

            if( config.cb ){
              scope.$eval( config.cb)
            }
          })

        },
        'Error': function(up, err, errTip) {
          console.log( arguments)
        },
        'UploadComplete': function() {
        }
      }
    });
    uploader.init()
    scope.upload = function(){
      uploader.start()
    }
  };
});


