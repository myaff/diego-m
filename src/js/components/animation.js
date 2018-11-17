/**
 * Переключение классов по различным событиям
 * @module Animation
 */

let scrollAnimationBlocks = $('.a-scroll-box');

function addClassTogglerScene (el, controller) {
  new ScrollMagic.Scene({
    triggerElement: el,
    triggerHook: 0.6
  })
  .setClassToggle(el, 'animate')
  .addTo(controller);
}

function addClassTogglerController (animationBlocks) {
  let controller = new ScrollMagic.Controller();
  animationBlocks.each(function(){
      let aDelay = 300;
      if(this.offsetTop < window.innerHeight) {
        aDelay = 1300;
      }
      setTimeout(addClassTogglerScene, aDelay, this, controller);
    //}
  });
}

function init () {
  if (scrollAnimationBlocks.length > 0){
    //$('html').addClass('is-animating');
    addClassTogglerController(scrollAnimationBlocks);
  }
}

module.exports = {init};