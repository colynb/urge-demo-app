define(function(require, exports, module){
  var React = require('react');
  var Parse = require('parse');
  var Avatar = require('components/avatar');
  var StarsWrapper = require('components/stars-wrapper');
  var FB = require('facebook');
  var $ = require('jquery');
  var Moment = require('moment');

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
        ReviewOption({type:'share', tip:'Helpful Review', clickHandler:this.props.onShare})
      ];
      return (
        React.DOM.div({className:'review-options-bar'}, els)
      );
    }
  });

  var ReviewAvatar = React.createClass({
    render: function() {
      var avatar = {size: '50', src: this.props.user.avatar};
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


  return React.createClass({
    flagReview: function() {
      console.log('TODO: Flag review');
    },
    likeReview: function() {
      console.log('TODO: Like review');
    },
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
      var date = Moment(this.props.data.date).format('dddd, MMMM Do YYYY, h:mm a');
      var els = [
        ReviewAvatar({user:this.props.data.user}),
        StarsWrapper({className:'clearfix', score: this.props.data.score}),
        React.DOM.div({className:'review-date', children: date}),
        ReviewUser({user:this.props.data.user}),
        React.DOM.div({className:'review-content', children: this.props.data.text}),
        ReviewOptionList({onShare:this.postToFB,onFlag:this.flagReview,onLike:this.likeReview})
      ];
      return React.DOM.div({ref: 'rev' + this.props.index, metaData: this.props.metaData, data: this.props.data, className:'review clearfix'}, els);
    }
  });
});
