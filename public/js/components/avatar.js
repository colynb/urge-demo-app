define(function(require, exports, module){
  var React = require('react');
  var Gravitar = require('helpers/gravitar');

  return React.createClass({
    getDefaultProps: function(){
      return {
        src: Gravitar.getUrl({email: 'urge', size: 50})
      };
    },

    render: function() {
      var src;
      if (this.props.url) {
        src = this.props.url;
      } else if (this.props.email) {
        var hash = md5(this.props.email);
        src = Gravatar.getUrl({email: hash, size: this.props.size});
      } else {
        src = this.props.src;
      }


      return (
        React.DOM.div({
          className: 'avatar'
        }, [
          React.DOM.img({src: src})
        ])
      );
    }
  });

});