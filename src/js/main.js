let DeviceDetection = require("./components/device-detection");
let Helpers = require("./components/helpers");
let Animation = require("./components/animation");
let Carousel = require("./components/carousel");
let Share = require("./components/share");
let Youtube = require("./components/youtube");
let Statistic = require("./components/statistic");

$(document).ready(function(){
  
  DeviceDetection.run();
  Helpers.init();
  Share.init();
  Carousel.init();
  
  $.afterlag(function(){
    $('html').addClass('is-loaded');
  });
  
  $('html').addClass('is-animating');
  
  Animation.init();

  
  if ((window.innerWidth > document.body.clientWidth) || !$('html').hasClass('fp-enabled')) {
    $('.layout, .header').css({'padding-right': Helpers.getNativeScrollbarWidth() + 'px'});
  }

  //Youtube.init();
  //Statistic.init();
  
});


/**
 * Список экспортируемых модулей, чтобы иметь к ним доступ извне
 * @example
 * Main.Form.isFormValid();
 */
module.exports = {
  DeviceDetection,
  Helpers,
	Carousel,
  Share,
  Animation,
  Youtube,
  Statistic
};