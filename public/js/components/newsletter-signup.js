define(function(require, exports, module){
  var React = require('react');
  var Parse = require('parse');

  return React.createClass({
    handleSubmit: function(e) {

      e.preventDefault();
      var values = {};
      var $form = $(this.refs.form.getDOMNode());
      $.each($form.serializeArray(), function(i, field) {
          values[field.name] = field.value;
      });
      var email = new Parse.Object('Email');
      email.set('email', values['email']);
      email.save().then(function(){
        $form.fadeOut(function(){
          
        });
        $(".demo-show").delay(200).fadeIn(200);
      });
    },
    render: function () {
      var els = [
        React.DOM.div({ref:'form-container', className: 'input-group'}, [
            React.DOM.input({name: 'email', type:'text', placeholder:"Sign up for our newsletter.", className: 'form-control input-lg'}),
            React.DOM.span({className:'input-group-btn'}, [React.DOM.button({type:'submit', children:"Sign-up", className: 'btn btn-default btn-lg'})])
        ])
      ];
      return (
        React.DOM.div({}, [        
          React.DOM.div({className:'demo-show', style: {'display': 'none'}},[
            React.DOM.p({children: "Thanks for registering! While you're here, check out our demo!", className: "lead"}),          
            React.DOM.a({children: "DEMO", className: "btn btn-lg btn-default", href: "/demo.html"})
          ]),
          React.DOM.form({onSubmit:this.handleSubmit, ref: 'form'},els)
          ])
      );
    }
  });

});

