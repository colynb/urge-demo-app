define(function(require, exports, module) {
  var React = require('react');

  return React.createClass({
    render: function() {
      return (
        React.DOM.span({
          className: "fa fa-star urgeStar"
        })
      );
    }
  });
});