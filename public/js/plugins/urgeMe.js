/*
 * Urge Rating v1.0.0
 * Adds star rating capability
 *
 */
 !function(root, factory) {
     if (typeof define === 'function' && define.amd) {
         define(['jquery'], factory);
     } else if (typeof exports === 'object') {
         factory(require('jquery'));
     } else {
         factory(root.jQuery);
     }
 }(this, function($) {
  $.fn.urgeMe = function(options) {
    //Set Options
    var settings = $.extend({
          fullClass:     "color-star",
          selectedClass: "selected",
          hoverClass:    "hover-star",
          childClass:    ".urgeStar"
        }, options );

    var $this = $(this);
    var domArray = $this.children(settings.childClass);

    return this.children(settings.childClass).each(function() {
        var $this = $(this);
        setClick($this, domArray);
        setHover($this, domArray);
        setMouseout();
    });


    // Create Click To Set Class And
    function setClick(element, domArray){
      $(element).on('click', function(e){
        $(domArray).each(function(){
            $(this).removeClass(settings.fullClass);
            $(this).removeClass(settings.selectedClass);
        });

        var spot = domArray.index(element) + 1;
        $('.review-stars').children(settings.childClass).removeClass(settings.hoverClass);
        var i = 0;
        do {
            $(domArray[i]).addClass(settings.fullClass);
            $(domArray[i]).addClass(settings.selectedClass);
            $(domArray[i]).removeClass('.fa-star-half-o');
            i++;
        } while(i<spot);
      });
    }

    function setHover(element, domArray){
        $(element).mouseover(
        function(){

        var spot = domArray.index(element) + 1;
        var i = 0;
        do {
            $(domArray[i]).removeClass('.fa-star-half-o');
            $(domArray[i]).addClass(settings.hoverClass);
            i++;
        } while(i<spot);
      });
    }

    function setMouseout(){
      $('.review-stars').mouseout(function(){
          $(this).children(settings.childClass).removeClass(settings.hoverClass);
      });
    }
  };
});