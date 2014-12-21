define(function(require, exports, module){
  var React = require('react');
  return React.createClass({
      doLogout: function(){
        Parse.User.logOut();
      },
      render: function() {
        return (
          React.DOM.button({
            className: 'btn',
            children: "Logout",
            onClick: this.doLogout
          })
        );
      }
    });

});