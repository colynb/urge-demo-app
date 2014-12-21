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

  var SummaryTotalRow = React.createClass({
      render: function(){
        var percentage = this.props.subtotal / this.props.data.total * 100;
        var els = [
          React.DOM.span({className:'review-label'}, [this.props.tier,React.DOM.span({className:'fa fa-star'})]),
          React.DOM.span({className:'review-percentage-wrapper'},[React.DOM.span({className:'review-fill', style:{width: percentage + '%'}})]),
          React.DOM.span({className:'review-total', children: this.props.subtotal+ ' reviews'})
        ];
        return (
          React.DOM.div({className:"review-summary-row"}, els)
        );
      }

  });


  var SummaryTotalsBox = React.createClass({
    render: function(){

      var els = [];
      var self = this;
      this.props.data.dist.forEach(function(dist){
        els.push(SummaryTotalRow({tier:dist.tier,subtotal:dist.subtotal,data:self.props.data}));
      });

      return (
        React.DOM.div({className:'review-summary-totals'},els)
      );
    }

  });


  var StarsWrapper = React.createClass({
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

  var ProductInfo = React.createClass({
    render: function () {
      return (
        React.DOM.h1({className:'product-name', children:this.props.name})
      );
    }
  });

  var ReviewSummary = React.createClass({
    getProductFromServer: function(){
      var query = new Parse.Query('Product');
      var self = this;

      query.get('LKqLjR0YxA', {
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
    render: function () {
      var SummaryElements = [
        ProductInfo({name:this.state.data.name}),
        StarsWrapper({score: this.state.data.score}),
        SummaryTotalsBox({data:this.state.data})
      ];
      return (
        React.DOM.div({className:'reviews-summary'},SummaryElements)
      );
    }
  });

  React.renderComponent(
    ReviewSummary(),
    document.querySelector('#reviews-summary-container')
  );
});
