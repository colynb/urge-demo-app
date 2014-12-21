define(function(require, exports, module) {
  var MD5 = require('md5');

  return {
    getUrl: function(obj) {
      var url = 'http://www.gravatar.com/avatar/'+MD5(obj.email)+'?d=identicon';
      if (obj.size) {
        url += '&s=' + obj.size;
      }
      return url;
    }
  };
});
