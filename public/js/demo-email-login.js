define(function(require, exports, module){
  var Parse = require('parse');
  var React = require('react');
  var AlertBox = require('alert-box');

  return React.createClass({
    alertBox: AlertBox({type: 'error'}),

    getFormData: function() {
      return {
        password: this.refs.password.getDOMNode().value,
        email: this.refs.email.getDOMNode().value
      };
    },

    parseEmailLogin: function() {
      var self = this;
      var loginInfo = this.getFormData();

      Parse.User.logIn(loginInfo.email, loginInfo.password, {
        success: function(user) {
          // Do stuff after successful login.
          console.log('winning', arguments);
        },
        error: function(user, error) {
          // The login failed. Check error to see why.
          self.alertBox.setProps({msg: 'Login failed, try again'});
        }
      });
    },

    parseEmailSignup: function() {
      var self = this;
      var user = new Parse.User();
      var loginInfo = this.getFormData();

      user.set("password", loginInfo.password);
      user.set("email", loginInfo.email);
      user.set("username", loginInfo.email);

      user.signUp(null, {
        success: function(user) {
          // Hooray! Let them use the app now.
          console.log('Hurray!', user);
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          // console.log("Error: " + error.code + " " + error.message);
          self.alertBox.setProps({msg: 'Signup failed, try again'});
        }
      });
    },

    render: function() {

      return (
        React.DOM.div( {className:"loginBox"},
          React.DOM.h3(null, "Login"),
          React.DOM.div(null,
            React.DOM.label(null, "Email"),
            React.DOM.input( {type:"email", placeholder:"Enter email", name:"email", ref:"email"} )
          ),
          React.DOM.div(null,
            React.DOM.label(null, "Password"),
            React.DOM.input( {type:"password", placeholder:"Enter password", name:"password", ref:"password"} )
          ),
          this.alertBox,
          React.DOM.button({
            onClick: this.parseEmailSignup,
            children: 'signup'
          }),
          React.DOM.button({
            onClick: this.parseEmailLogin,
            children: 'login'
          })

        )
      );
    }
  });

});