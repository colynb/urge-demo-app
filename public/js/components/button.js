define(function(require, exports, module){
  var React = require('react');
  return React.createClass({
    getDefaultProps: function(){
      return {
        type: 'default'
      }
    },
    render: function() {
      var className = 'btn-' + this.props.type;
      return (
        React.DOM.button({
        className: 'btn ' + className,
        children: this.props.label,
        onClick: this.props.action
        })
      );
    }
  });
});