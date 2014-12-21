/*
 * Example vendor config file
 *    Add your own app ids / secrets, then rename to vendors.js
 */

define(function(require, exports, module){
  return {
    Parse: {
      APP_ID: "[YOUR OWN PARSE APP ID]",
      JS_KEY: "[YOUR OWN PARSE JS KEY]",
      Facebook: {
        APP_ID: "[FACEBOOK APP ID]",
        CHANNEL_URL: "??",
        STATUS: true,
        COOKIE: true,
        XFBML: true
      }
    },
    Facebook: {
      APP_ID: "[FACEBOOK APP ID]"
    }
  };
});