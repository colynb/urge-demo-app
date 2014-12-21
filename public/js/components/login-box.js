define(function(require, exports, module){

  var React = require('react');
  var EmailLogin = require('components/email-login');
  var LogoutButton = require('components/logout-button');
  var Avatar = require('components/avatar');
  var md5 = require('md5');
  var AlertBox = require('alert-box');
  var Gravitar = require('helpers/gravitar');

  return React.createClass({
    alertBox: AlertBox({type: 'error'}),
    getInitialState: function() {
      return {loggedin: false};
    },
    componentWillMount: function() {
      this.setState({loggedin:Parse.User.current()});
    },
    setAlertMessage: function(msg) {
      console.log(msg);
    },
    doEmailLogin: function(fields) {
      var self = this;

      Parse.User.logIn(fields.email, fields.password, {
        success: function(user) {
          // Do stuff after successful login.
          // console.log('winning', arguments);
          user.set('avatar', Gravitar.getUrl({email: fields.email}));
          self.setState({loggedin:true});
        },
        error: function(user, error) {
          // The login failed. Check error to see why.
          console.log(arguments);
          self.alertBox.setState({msg: 'Login failed, try again'});
        }
      });
    },

    doEmailSignup: function(fields) {
      // this.setAlertMessage.bind(this, 'Hello World');
      // return;
      var self = this;
      var user = new Parse.User();

      user.set({
        password: fields.password,
        email: fields.email,
        username: fields.email,
        avatar: Gravitar.getUrl({email: fields.email})
      });

      user.signUp(null, {
        success: function(user) {
          // Hooray! Let them use the app now.
          self.setState({loggedin:true});
          console.log('Hurray!', user);
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          // console.log("Error: " + error.code + " " + error.message);
          self.alertBox.setProps({msg: 'Signup failed, try again'});
        }
      });
    },
    doFBLogin: function(fields){
      var user = new Parse.User.current();
      var self = this;
      user.set(fields);
      user.save(null, {
        success: function(user){
          self.setState({loggedin:true});
        },
        error: function(user, error) {
          self.alertBox.setProps({msg: 'Problem with FB login.'});
        }
      });
    },
    doLogout: function(){
      Parse.User.logOut();
      this.setState({loggedin:false});
    },
    render: function() {
      var current = Parse.User.current();
      var loginState;
      if (this.state.loggedin) {
        loginState = React.DOM.div({},[
            React.DOM.span({
              children: "Already logged in as " + current.get('username')
            }),
            Avatar({src: current.get('avatar')}),
            LogoutButton({onLogout:this.doLogout})
          ]);
      } else {
        loginState = React.DOM.div({
          className: 'loginContainer'
        },[
          EmailLogin({onLogin:this.doEmailLogin,onSignup:this.doEmailSignup, onFBLogin:this.doFBLogin})
        ]);
      }


      return React.DOM.div({
          className: 'loginContainer'
        },[loginState, this.alertBox]);

    }
  });
});