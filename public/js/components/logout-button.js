define(function(require, exports, module){
  var React = require('react');
  var Button = require('components/button');
  return React.createClass({
    render: function() {
      return (
        Button({label:"Logout", action:this.props.onLogout})
      );
    }
  });
});