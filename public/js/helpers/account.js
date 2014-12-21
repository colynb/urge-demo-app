define(function(require, exports, module){
  var Parse = require('parse');
  var Gravitar = require('helpers/gravitar');

  return {
    login: function(fields, cb) {
      Parse.User.logIn(fields.email, fields.password, {
        success: function(user) {
          cb(null, user);
          // user.set('avatar', Gravitar.getUrl({email: fields.email}));
          // user.save(null, {
          //   success: function(user) {
          //     cb(null, user);
          //   },
          //   error: function(user, error) {
          //     cb(error);
          //   }
          // });
        },
        error: function(user, error) {
          cb(error);
        }
      });
    },

    signup: function(fields, cb) {
      var user = new Parse.User();

      user.set({
        password: fields.password,
        email: fields.email,
        username: fields.email,
        displayName: fields.displayName,
        avatar: Gravitar.getUrl({email: fields.email})
      });

      user.signUp(null, {
        success: function(user) {
          cb(null, user);
        },
        error: function(user, error) {
          cb(error);
        }
      });
    }
  }
});