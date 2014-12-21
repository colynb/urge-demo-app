define(function(require, exports, module){
  var React        = require('react');
  var Parse        = require('parse');
  var Review       = require('components/review-list-item');

  return React.createClass({
    getProduct: function(prodId, cb){
      var query = new Parse.Query('Product');
      var self = this;
      query.get(prodId, {
        success: function(product) {
          self.setState({
            metaData: {
              productName: product.get('name')
            }
          });
          cb(null, product.toJSON().objectId);
        },
        error: function(err) {
          console.error('Product not found!');
        }
      });
    },
    getReviewsFromServer: function(){
      var self = this;
      this.getProduct(this.props.params.pid, function(err, pid){
        var query = new Parse.Query('Review');
        query.equalTo("product", pid);
        query.descending('createdAt');
        query.find({
          success: function(reviews) {
            self.setState({
              metaData: this.state.metaData,
              reviews: reviews
            });
          }.bind(self),
          error: function(err) {

          }
        });
      });
    },
    getInitialState: function() {
      return {metaData:{},reviews:[]};
    },
    componentWillMount: function() {
      this.getReviewsFromServer();
    },
    componentDidMount: function() {
      // update the view on new review
      var self = this;
      this.props.emitter.on('new-review', function(review) {
        var reviews = self.state.reviews;
        reviews.unshift(review);
        self.setState({
          metaData: self.state.metaData,
          reviews: reviews
        });
      });
    },
    render: function() {
      var metaData = this.state.metaData;
      var reviews = [];
      if (this.state.reviews.length) {
        this.state.reviews.forEach(function(review,i){
          var obj = Review({
            index: i,
            metaData: metaData,
            data: {
              user: review.get('user'),
              date: review['createdAt'].toString(),
              score:review.get('score'),
              text: review.get('text')
            }
          });
          reviews.push(obj);
        });
      }
      return (
        React.DOM.div({className:'review-component-wrapper'}, reviews)
      );
    }
  });

});
