(function () {
  var showdownImageUpload = function () {
    return [
      // ![] image syntax
      {
        type: 'lang',
        filter: function (text) {
          console.log( text )
          var imageMarkdownRegex = /^!(?:\[([^\n\]]*)\])(?:\(([^\n\]]*)\))?$/gim,
          /* regex from isURL in node-validator. Yum! */
            uriRegex = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i,
            pathRegex = /^(\/)?([^\/\0]+(\/)?)+$/i;


          return text.split('\n').map(function( line, lineNumber){
            console.log( lineNumber,"lineNumber")
            if( !imageMarkdownRegex.test( line) ) return line

            return  line.replace(imageMarkdownRegex, function (match, alt, src) {
              var result = '',
                output;

              if (src && (src.match(uriRegex) || src.match(pathRegex))) {
                result = '<img class="js-upload-target" upload-target src="' + src + '"/>';
              }

              //this is strange, showdown will add empty line the text
              output = '<section data-line="'+(lineNumber-2)+'" class="image-uploader image-uploader-need-init">' +
              result + '<div class="description">Add image of <strong>' + alt + '</strong></div>' +
              '<input class="fileupload" type="file" name="media">' +
              '</section>';

              return output;
            });
          }).join('\n')

          //var r =  text.replace(imageMarkdownRegex, function (match, key, alt, src) {
          //  var result = '',
          //    output;
          //
          //  if (src && (src.match(uriRegex) || src.match(pathRegex))) {
          //    result = '<img class="js-upload-target" upload-target src="' + src + '"/>';
          //  }
          //
          //  output = '<section id="image_upload_' + key + '" class="image-uploader image-uploader-need-init">' +
          //  result + '<div class="description">Add image of <strong>' + alt + '</strong></div>' +
          //  '<input data-url="upload" class="js-fileupload main fileupload" type="file" name="media">' +
          //  '</section>';
          //
          //  console.log("replace img",output)
          //  return output;
          //});
          //console.log( r)
          //return r
        }
      }
    ];
  };

  window.Showdown.extensions.imageupload = showdownImageUpload;
  console.log( "loaded")
}());