define(function(require, exports, module) {
  var Parse         = require('parse');
  var React         = require('react');
  var Avatar        = require('components/avatar');
  var $             = require('jquery');
  var urgeMe        = require('plugins/urgeMe');
  var AlertBox      = require('alert-box');
  var FBHelper      = require('helpers/facebook');
  var AccountHelper = require('helpers/account');
  var ReviewItem    = require('components/review-list-item');

  var InputText  = React.createClass({
    render: function() {
      return (
        React.DOM.textarea({
          name: "review-content",
          placeholder: "Write a review...",
          onClick: this.props.onTextareaClick
        })
      );
    }
  });

  var InputStar = React.createClass({
    render: function() {
      return (
        React.DOM.span({
          className: "fa fa-star urgeStar"
        })
      );
    }
  });

  var InputStars = React.createClass({
    render: function() {
      return (
        React.DOM.div({
          className: "review-stars",
          style: {display: 'none'}
        }, [
          InputStar({}),
          InputStar({}),
          InputStar({}),
          InputStar({}),
          InputStar({})
        ])
      );
    }
  });

  var LoginPost = React.createClass({
    showLoginForm: function() {
      $(this.refs.loginControls.getDOMNode()).fadeOut(200);
      $(this.refs.signupForm.getDOMNode()).fadeOut(200);
      $(this.refs.loginForm.getDOMNode()).delay(200).fadeIn(200);
    },

    showSignupForm: function() {
      $(this.refs.loginControls.getDOMNode()).delay(200).fadeIn(200);
      $(this.refs.loginForm.getDOMNode()).fadeOut(200);
      $(this.refs.signupForm.getDOMNode()).delay(200).fadeIn(200);
    },

    render: function() {
      var sections;
      // show different sections based on the user state
      if (!this.props.user) {
        sections = [
          LoginControls({
            onFBClick: this.props.fbHandler,
            onLoginClick: this.showLoginForm,
            ref: 'loginControls'
          }),
          SignupForm({ onSignup: this.props.signupHandler, ref: 'signupForm' }),
          LoginForm({
            onLogin: this.props.loginHandler,
            onSignupClick: this.showSignupForm,
            ref: 'loginForm'
          })
        ];
      } else {
        sections = [
          React.DOM.button({
            id: "post-or-sign-up",
            className: "btn btn-info",
            style: {
              'float': 'right',
              'margin-top': '-35px'
            },
            onClick: this.props.postHandler
          }, 'Post Review')
        ];
      }

      return (
        React.DOM.div({
          className: "login-and-post-wrapper",
          style: { "display": "none" }
        }, sections)
      );
    }
  });

  var LoginControls = React.createClass({
    render: function() {
      return (
        React.DOM.div({
          className:"col-xs-12 col-sm-2 col-md-2 col-lg-2 col-xl-1"
        },
          React.DOM.div({
            className:"post-as-wrapper"
          },
            React.DOM.h3(null, "Login"),
            React.DOM.button({
              id:"facebook-login",
              className:"btn btn-facebook",
              onClick: this.props.onFBClick
            }, React.DOM.span({
              className:"fa fa-facebook"
            })),
            React.DOM.button({
              id:"urge-login",
              className:"btn btn-primary tooltipper",
              'data-toggle':"tooltip",
              'data-placement':"top",
              title:"Urge Email Login",
              onClick: this.props.onLoginClick
            }, React.DOM.span({
              className:"fa fa-envelope"
            })
          ))
        )
      );
    }
  });

  var LoginForm = React.createClass({
    componentDidMount: function() {
      $(this.getDOMNode()).fadeOut(0);
    },

    render: function() {
      var self = this;
      return (
          React.DOM.div(null,
            React.DOM.div({
              id:"login-wrapper",
              className:"sign-up-to-post-wrapper",
              ref: 'loginWrapper'
            },
              React.DOM.h3(null, "Urge Login"),
              React.DOM.form({
                className:"form-inline sign-up-form",
                role:"form",
                onSubmit: function(e) {
                  e.preventDefault();
                  self.props.onLogin({
                    email: self.refs.email.getDOMNode().value,
                    password: self.refs.password.getDOMNode().value
                  });
                }
              },
                  React.DOM.table(null,
                      React.DOM.tr(null,
                          React.DOM.td( {className:"form-td"},
                              React.DOM.input( {className:"form-control", type:"text", name:"email", placeholder:"Email", ref: 'email', tabIndex: 1} )
                          ),
                          React.DOM.td( {className:"top-align"},
                              React.DOM.button({
                                className:"btn btn-success",
                                tabIndex: 3
                              }, "Login")
                          )
                      ),
                      React.DOM.tr(null,
                          React.DOM.td( {className:"form-td"},
                              React.DOM.input( {className:"form-control", type:"password", name:"password", placeholder:"Password", ref: 'password', tabIndex: 2})
                          ),
                          React.DOM.td(null,
                              React.DOM.a({
                                className:"js-show-signup login-link",
                                tabIndex: 4,
                                onClick: this.props.onSignupClick
                              }, "Sign Up")
                          )
                      )
                  )
              )
          )
        )
      );
    }
  });

  var SignupForm = React.createClass({
    emailFocusHandler: function() {
      $(this.refs.displayNameContainer.getDOMNode()).fadeIn(100);
      $(this.refs.passwordContainer.getDOMNode()).fadeIn(100);
    },

    render: function() {
      var self = this;
      return (
        React.DOM.div( {className:"col-xs-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-sm-offset-2 col-md-offset-2 col-lg-offset-2 col-xl-offset-2"},

          React.DOM.div( {id:"sign-up-wrapper", className:"sign-up-to-post-wrapper"},
              React.DOM.h3(null, "Sign Up For ", React.DOM.i(null, "Urge"), " & Post Review"),
              React.DOM.form({
                className:"form-inline sign-up-form",
                role:"form",
                onSubmit: function(e) {
                  e.preventDefault();
                  self.props.onSignup({
                    email: self.refs.email.getDOMNode().value,
                    displayName: self.refs.displayName.getDOMNode().value,
                    password: self.refs.password.getDOMNode().value
                  });
                }
              },
              React.DOM.table(null,
                React.DOM.tr(null,
                    React.DOM.td( {className:"form-td"},
                      React.DOM.input({
                        className:"form-control",
                        type:"text",
                        name:"email",
                        placeholder:"Email",
                        ref: 'email',
                        tabIndex: 1,
                        onFocus: this.emailFocusHandler
                      })
                    ),
                    React.DOM.td( {className:"top-align"},
                        React.DOM.button( {className:"btn btn-success", tabIndex: 4}, "Sign Up")
                    )
                ),
                React.DOM.tr({
                  id:"sign-up-row-hidden",
                  style:{"display": "none"},
                  ref: 'displayNameContainer'
                },
                  React.DOM.td( {className:"form-td"},
                    React.DOM.input( {
                      className:"form-control",
                      type:"text",
                      name:"displayName",
                      placeholder:"Display Name",
                      tabIndex: 2,
                      ref: 'displayName'
                    })
                  ),
                  React.DOM.td(null
                  )
                ),
                React.DOM.tr({
                  id:"sign-up-row-hidden",
                  style:{"display": "none"},
                  ref: 'passwordContainer'
                },
                  React.DOM.td( {className:"form-td"},
                    React.DOM.input( {
                      className:"form-control",
                      type:"password",
                      name:"password",
                      placeholder:"Password",
                      tabIndex: 3,
                      ref: 'password'
                    })
                  ),
                  React.DOM.td(null
                  )
                )
              )
            )
          )
        )
      );
    }
  });

  var PostAs = React.createClass({
    render: function() {
      return (
        React.DOM.div({
          className:"post-as-wrapper", style:{"display": "none"}
        },
          React.DOM.button({
            id:"facebook-login",
            className:"btn btn-facebook",
            onClick: this.props.handleFBLogin
          }, React.DOM.span({
            className:"fa fa-facebook"
          })
          ),
          React.DOM.button({
            id:"urge-login",
            className:"btn btn-info logo-btn",
            onClick: this.props.handleEmailLogin
          }, React.DOM.span({
              className:"fa fa-envelope-o"
            })
        )
      )
      );
    }
  });

  var FormAvatar = React.createClass({
    render: function() {
      var avatar = {size: '50'};

      if (this.props.user) {
        avatar.src = this.props.user.get('avatar');
      }

      return (
          React.DOM.div({
            className: 'image-wrapper'
          }, Avatar(avatar))
      );
    }
  });

  return React.createClass({
    getInitialState: function() {
      return {
        user: this.props.user,
        renderForm: true
      };
    },

    componentDidMount: function() {
      $(this.refs.stars.getDOMNode()).urgeMe();

      if (this.state.user) {
        this.checkExistingReview();
      }
    },

    checkExistingReview: function() {
      var self = this;
      var query = new Parse.Query('Review');
      query.descending('createdAt');
      query.equalTo('user.objectId', this.state.user.id);
      query.equalTo('product', this.props.productId);
      query.first({
        success: function(review) {
          self.setState({renderForm: (!review)});
        },
        error: function(review, err) {
          // TODO: handle this... :(
          console.error(err);
        }
      });
    },

    handleTextareaClick: function() {
      $(this.refs.textarea.getDOMNode()).addClass("clicked");
      $(this.refs.stars.getDOMNode()).fadeIn(500);
      $(this.refs.loginPost.getDOMNode()).fadeIn(500);
      // $(this.refs.loginForm.getDOMNode()).fadeOut(100);
      // $(this.refs.postAs.getDOMNode()).fadeOut(100);
      // $("#post-or-sign-up").delay(100).fadeIn(300);
    },

    handleSubmit: function() {
      if(!this.state.user) {
        return;
      }
      var self = this;
      // var reviews = this.state.reviews;
      var review = new Parse.Object('Review');
      var user = this.state.user.toJSON();
      delete user['authData'];
      review.set({
        product: this.props.productId,
        user: user,
        score: $(this.refs.stars.getDOMNode()).find('.selected').length,
        text: this.refs.textarea.getDOMNode().value
      });

      review.save(null, {
        success: function(review) {
          self.props.emitter.emit('new-review', review);
          self.setState({renderForm: false});
        },
        error: function(review, err) {
          console.error(err);
          alert('Error posting review: ' + err.message);
        }
      });
    },

    fbLogin: function() {
      var self = this;
      FBHelper.login(function(err, user) {
        if (err) {
          // TODO: handle error
          return;
        }

        self.setState({user: user});
        self.checkExistingReview();
      });
    },

    emailLogin: function(fields) {
      var self = this;
      AccountHelper.login(fields, function(err, user) {
        if (err) {
          // TODO: handle error
          alert(err.message);
          return;
        }

        self.setState({user: user});
        self.checkExistingReview();
      });
    },

    handleSignup: function(fields) {
      var self = this;
      AccountHelper.signup(fields, function(err, user) {
        if (err) {
          // TODO: handle error
          alert(err.message);
          return;
        }

        self.setState({user: user});
      });
    },

    render: function () {
      children = [];
      if (this.state.renderForm) {
        children = [
          React.DOM.h2({
            children: 'Urge Review'
          }),
          FormAvatar({user: this.state.user}),
          React.DOM.div({
            className: "review-wrapper col-xs-10 col-sm-11 col-md-11"
          }, [
            InputText({ref: 'textarea', onTextareaClick: this.handleTextareaClick}),
            InputStars({ref: 'stars'}),
            LoginPost({
              ref: 'loginPost',
              formType: 'signup',
              postHandler: this.handleSubmit,
              fbHandler: this.fbLogin,
              loginHandler: this.emailLogin,
              signupHandler: this.handleSignup,
              user: this.state.user
            }),
            // LoginForm({ref: 'loginForm'}),
            // PostAs({ref: 'postAs', handleFBLogin: this.fbLogin, handleEmailLogin: this.emailLogin})
          ])
        ];
      }

      return (
        React.DOM.div({
          className: 'review-form',
          children: "Review Form"
        }, children)
      );

    }
  });
});