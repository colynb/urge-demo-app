define(function(require, exports, module) {
  var React = require('react');

  return React.createClass({
    render: function() {
      return (
        React.DOM.textarea({
          name: "review-content",
          placeholder: "Write a review..."
        })
      );
    }
  });
});