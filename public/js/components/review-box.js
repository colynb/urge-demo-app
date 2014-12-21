define(function(require, exports, module){
  var React = require('react');
  var LoginBox = require('components/login-box');

  var ReviewSummary = require('components/review-summary');
  var ReviewForm = require('components/review-form');

  var Review = React.createClass({
    render: function () {
      return (
        React.DOM.div({
          className: 'review-item',
          children: "A review"
        })
      );
    }
  });

  var ReviewList = React.createClass({
    render: function () {
      return (
        React.DOM.div({
          className: 'review-list',
          children: "Review list"
        })
      );
    }
  });

  return React.createClass({
    render: function() {
      var ReviewsDomElements = [
        ReviewSummary({}),
        ReviewList({}),
        ReviewForm({user: this.props.user})
      ];

      return (
        React.DOM.div({
          className: 'reviews-box'
        }, ReviewsDomElements)
      );
    }
  });

});