define(function(require, exports, module){
  var React = require('react');
  var Parse = require('parse');
  var ReviewBox = require('components/review-box');
  var ReviewSummary = require('components/review-summary');
  var ReviewsList = require('components/reviews-list');
  var ReviewForm = require('components/review-form');
  var Emitter = require('emitter');
  var emitter = new Emitter();

  var user = Parse.User.current();

  var params = {};
  window.location.hash.replace('#','').split('/').forEach(function(h){
    var p = h.split(':');
    if (p[0] && p[1]) {
      params[p[0]] = p[1];
    }
  });

  React.renderComponent(
    ReviewSummary({user: user, params: params, emitter: emitter}),
    document.getElementById('review-summary')
  );

  React.renderComponent(
    ReviewsList({user: user, params: params, emitter: emitter}),
    document.getElementById('reviews-list')
  );

  React.renderComponent(
    ReviewForm({user: user, productId: params.pid, emitter: emitter}),
    document.getElementById('review-form')
  );
});
