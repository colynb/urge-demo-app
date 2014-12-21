define(function(require, exports, module){
  var FB = require('facebook');
  var Parse = require('parse');
  var Gravitar = require ('helpers/gravitar');

  return {
    login: function(cb){
      var self = this;
      Parse.FacebookUtils.logIn("email", {
        success: function(user) {
          FB.api(
            "/me?fields=first_name,email,picture",
            // "/me",
            function (response) {
              if (response && !response.error) {
                var avatar;
                if (response.picture && ! response.picture.data.is_silhouette) {
                  avatar = response.picture.data.url;
                } else {
                  avatar = Gravitar.getUrl({email: response.email});
                }

                // if (!user.existed()) {
                  user.set({
                    'avatar': avatar,
                    'username': response.email,
                    'displayName': response.first_name,
                    'email': response.email
                  });
                  user.save(null, {
                    success: function(user) {
                      cb(null, user);
                    },
                    error: function(user, error) {
                      cb(error);
                    }
                  });
                // }
              } else {
                cb(response.error);
              }
            }
          );
        },
        error: function(user, error) {
          cb(error);
        }
      });
    }
  };
});