define(function(require, exports, module){
  var React = require('react');
  var Parse = require('parse');

  var StarsWrapperScore = React.createClass({
    render: function(){
      return (
        React.DOM.span({className:"star-score", children:this.props.score + '/5'})
      );
    }
  });

  var StarsWrapperItem = React.createClass({
    render: function(){
      var className = 'fa fa-star';

      if (this.props.score > this.props.num) {
        className = 'fa fa-star';
      } else if (this.props.score >= (this.props.num - 0.5) ) {
        className = 'fa fa-star-half-o';
      } else {
        className = 'fa fa-star-o';
      }

      return (
        React.DOM.span({className:className})
      );
    }
  });

  return React.createClass({
    render: function () {
      var els = [];
      for (var i = 1; i <= 5; i++ ) {
        els.push(StarsWrapperItem({num: i, score:this.props.score}));
      }
      els.push(StarsWrapperScore({score:this.props.score}));

      return (
      React.DOM.div({className:'stars-wrapper'},els)
      );
    }
  });
});