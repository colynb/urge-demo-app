define(function(require, exports, module){
  var React = require('react');
  var Parse = require('parse');
  var NewsletterSignup = require('components/newsletter-signup');

  React.renderComponent(
    NewsletterSignup(),
    document.getElementById('newsletter-signup')
  );
});
