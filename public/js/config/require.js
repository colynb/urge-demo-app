var bowerPath = '../../bower_components/';

require.config({
  baseUrl: '/public/js',
  paths: {
    'react':    bowerPath + 'react/react-with-addons.min',
    'parse':    bowerPath + 'parse-js-sdk/lib/parse.min',
    'facebook': "//connect.facebook.net/en_US/all",
    'md5' :     bowerPath + 'js-md5/js/md5.min',
    'jquery':   bowerPath + 'jquery/jquery.min.js',
    'moment':   bowerPath + 'momentjs/min/moment.min',
    'vendors':  'config/vendors',
    'emitter':  bowerPath + 'tiny-emitter/dist/tinyemitter.min'
  },

  shim: {
    'parse': {
      deps: ['vendors'], // comes from vendors.js (rename vendors-example.js)
      exports: 'Parse',
      init: function(Config) {
        this.Parse.initialize(Config.Parse.APP_ID, Config.Parse.JS_KEY);
      }
    },
    'md5' : {
      exports: 'md5'
    },
    'facebook': {
      deps: ['vendors', 'parse'],
      exports: 'FB',
      init: function(Config, Parse) {
        window.fbAsyncInit = function() {
          Parse.FacebookUtils.init({
            appId      : Config.Parse.Facebook.APP_ID, // Facebook App ID
            status     : true, // check login status
            cookie     : true, // enable cookies to allow Parse to access the session
            xfbml      : true  // parse XFBML
          });

          // Additional initialization code here
        };
      }
    }
  }
});