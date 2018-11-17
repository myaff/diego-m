/**
 * Карусель
 * @module Carousel
 */

/**
 * Инициализация карусели
 */
function init(){

  let owl = $('.owl-carousel');

  owl.owlCarousel({
    autoWidth: true,
    autoHeight: false,
    nav: true,
    navText: ['', ''],
    dots: false,
    loop: true,
    mouseDrag: false
  });

  owl.on('initialized.owl.carousel', function(){
    $('.owl-item.active').eq(0).addClass('visible').siblings('.owl-item').removeClass('visible');
  });

  owl.on('changed.owl.carousel', function(){
    setTimeout(function() {
      $('.owl-item.active').eq(0).addClass('visible').siblings('.owl-item').removeClass('visible');
    }, 100);
  });

}

module.exports = {init};