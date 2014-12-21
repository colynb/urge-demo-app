define(function(require, exports, module){
  var Parse = require('parse');
  var React = require('react');
  var Button = require('components/button');
  var FBLogin = require('components/fb-login');

  return React.createClass({
    getFormData: function(fields) {
      var data = {};
      var self = this;
      fields.forEach(function(field) {
        data[field] = self.refs[field].getDOMNode().value
      })
      return data;
    },
    onSignup: function() {
      this.props.onSignup(this.getFormData(['email', 'password']))
    },
    onLogin: function() {
      this.props.onLogin(this.getFormData(['email', 'password']))
    },
    render: function() {
      console.log(this.props);
      return (
        React.DOM.div( {className:"loginBox"},
          React.DOM.h3(null, "Login"),
          React.DOM.div(null,
            React.DOM.label(null, "Email"),
            React.DOM.input( {className:'form-control', type:"email", placeholder:"Enter email", name:"email", ref:"email"} )
          ),
          React.DOM.div(null,
            React.DOM.label(null, "Password"),
            React.DOM.input( {className:'form-control',type:"password", placeholder:"Enter password", name:"password", ref:"password"} )
          ),
          FBLogin({onLogin:this.props.onFBLogin}),
          Button({action:this.onSignup, label: 'Create account'}),
          Button({action:this.onLogin, label: 'Login with Urge'})
        )
      );
    }
  });

});