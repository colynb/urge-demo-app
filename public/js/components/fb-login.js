define(function(require, exports, module){
  var FB = require('facebook');
  var Parse = require('parse');
  var React = require('react');
  var Button = require('components/button');

  return React.createClass({
    doLogin: function(){
      var self = this;
      Parse.FacebookUtils.logIn("email", {
        success: function(user) {
            FB.api(
                "/me?fields=first_name,email,picture",
                function (response) {
                  console.log(response.picture.data.url);
                  if (response && !response.error) {

                    self.props.onLogin({
                      'avatar': response.picture.data.url,
                      'username': response.first_name,
                      'email': response.email
                    });

                  }
                }
            );
          if (!user.existed()) {
            console.log("User signed up and logged in through Facebook!");
          } else {
            console.log("User logged in through Facebook!");
          }
        }.bind(this),
        error: function(user, error) {
          alert("User cancelled the Facebook login or did not fully authorize.");
        }
      });
    },
    render: function() {
      var self = this;
      return (

          Button({action:function(){
              self.doLogin();
            }, label: 'Login with Facebook', type: 'primary'})

      );
    }
  });

});