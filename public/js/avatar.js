define(function(require, exports, module){
  var React = require('react');

  return React.createClass({
    render: function() {
      return (
        React.DOM.div({
          className: 'avatar'
        }, [
          React.DOM.img({src: this.props.data.url})
        ])
      );
    }
  });

});