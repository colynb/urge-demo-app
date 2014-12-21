define(function(require, exports, module){
  var React = require('react');
  var Parse = require('parse');
  var Avatar = require('components/avatar');
  var StarsWrapper = require('components/stars-wrapper');
  var FB = require('facebook');
  var $ = require('jquery');

  var ReviewOption = React.createClass({
    render: function(){
      var btnClass = (this.props.type === 'like') ? 'btn-liked' : '';
      var opts = {
        href: '#',
        className: 'btn btn-small tooltipper ' + btnClass,
        'data-toggle': 'tooltip',
        'data-placement': 'top',
        'data-original-title': this.props.title
      };

      if (typeof this.props.clickHandler === 'function') {
        opts['onClick'] = this.props.clickHandler;
      }
      var ico_map = {
        like: 'fa fa-heart',
        share: 'fa fa-share',
        flag: 'fa fa-flag',
      };
      return (
        React.DOM.a(opts,[React.DOM.span({className:ico_map[this.props.type]})])
      );
    }
  });

  var ReviewOptionList = React.createClass({
    render: function(){
      var els = [
        ReviewOption({type:'like', tip:'Helpful Review'}),
        ReviewOption({type:'flag', tip:'Helpful Review'}),
        ReviewOption({type:'share', tip:'Helpful Review', clickHandler:this.props.onShare})
      ];
      return (
        React.DOM.div({className:'review-options-bar'}, els)
      );
    }
  });

  var ReviewAvatar = React.createClass({
    render: function() {
      var avatar = {size: '50'};
      return (
          React.DOM.div({
            className: 'image-wrapper'
          }, Avatar(avatar))
      );
    }
  });
  var ReviewUser = React.createClass({
    render: function() {
      return (
          React.DOM.div({
            className: 'review-user',
            children: this.props.user.displayName
          })
      );
    }
  });
  var Review = React.createClass({
    postToFB: function() {
      var review = this.refs['rev' + this.props.index];
      var user = review.props.data.user;
      var meta = review.props.metaData;

      var FBParams = {
        method: 'feed',
        name: meta.productName,
        caption: null,
        description: review.props.data.text,
        link: meta.productUrl,
        picture: user.avatar
      };

      FB.ui(
        FBParams,
        function(response) {
          if (response && response.post_id) {
            console.log('Yes! Post was published!');
          } else {
            console.log('Why you no share?!');
          }
        }
      );
    },
    render: function(){
      var els = [
        ReviewAvatar({user:this.props.data.user}),
        StarsWrapper({className:'clearfix', score: this.props.data.score}),
        ReviewUser({user:this.props.data.user}),
        React.DOM.div({className:'review-content', children: this.props.data.text}),
        ReviewOptionList({onShare:this.postToFB})
      ];
      return React.DOM.div({ref: 'rev' + this.props.index, metaData: this.props.metaData, data: this.props.data, className:'review clearfix'}, els)
    }
  });

  var ReviewsList = React.createClass({
    getProductFromServer: function(){
      var query = new Parse.Query('Product');
      var self = this;
      query.get(this.props.params.pid, {
        success: function(product) {
          var dist = product.get('scoreDistribution');
          self.setState({data: {
            name: product.get('name'),
            total: product.get('reviewCount'),
            score: product.get('score'),
            dist: [{tier: 5, subtotal:dist[5]||0},{tier: 4, subtotal:dist[4]||0},{tier: 3, subtotal:dist[3]||0},{tier: 2, subtotal:dist[2]||0},{tier: 1, subtotal:dist[1]||0}]
          }});
        },
        error: function(err) {
          console.error('Product not found!');
        }
      });
    },
    getInitialState: function() {
     return {data: {
            name: 'Product Name',
            total: null,
            score: 0,
            dist: [{tier: 5, subtotal:0},{tier: 4, subtotal:0},{tier: 3, subtotal:0},{tier: 2, subtotal:0},{tier: 1, subtotal:0}]
          }};
    },
    componentWillMount: function() {
      this.getProductFromServer();
    },
    render: function() {
      var metaData = {
        productName: 'Cobra - Radar/Laser Detector',
        productUrl: 'https://developers.facebook.com/docs/reference/javascript/'
      };
      var reviews = [
        Review({index: 0, metaData: metaData, data:{ user: { avatar: 'http://www.gravatar.com/avatar/3b6377359fa75e487f3ac0bc647685bc?d=identicon&s=50', displayName: 'Colyn'}, score:3.1, text: 'Applicake oat cake pie jelly-o tart gummies gingerbread chupa chups.'}}),
        Review({index: 1, metaData: metaData, data:{ user: { avatar: 'http://www.gravatar.com/avatar/3b6377359fa75e487f3ac0bc647685bc?d=identicon&s=50', displayName: 'Ryan'}, score:5.3, text: 'Cotton candy bonbon macaroon candy gingerbread candy canes macaroon chupa chups halvah.'}}),
        Review({index: 2, metaData: metaData, data:{ user: { avatar: 'http://www.gravatar.com/avatar/3b6377359fa75e487f3ac0bc647685bc?d=identicon&s=50', displayName: 'Joe'}, score:1.6, text: 'Chocolate cake macaroon pudding. Lemon drops marshmallow jelly soufflé tootsie roll gingerbread cotton candy sweet tootsie roll. '}})
      ];
      return (
        React.DOM.div({className:'review-component-wrapper'}, reviews)
      );
    }
  });

  React.renderComponent(
    ReviewsList(),
    document.querySelector('#reviews-list')
  );
});
