define(function(require, exports, module){
  var React = require('react');

  return React.createClass({
    getInitialState: function() {
      return {msg: 'Error'};
    },
    setMessage: function(msg) {
      this.setState({msg: msg});
    },
    render: function() {
      var self = this;
      var cx = React.addons.classSet;
      var classes = cx({
        'alert': true,
        'alert-danger': self.props.type === 'error',
        'alert-warning': self.props.type === 'warning',
        'alert-success': self.props.type === 'success',
        'alert-info': self.props.type === 'info',
        'hide': !!(self.props.msg && self.props.msg.length)
      });

      return (
        React.DOM.div({
          className: classes,
          children: this.props.msg
        })
      );
    }
  });
});