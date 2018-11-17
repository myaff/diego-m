var Main =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/kenzo/build/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var DeviceDetection = __webpack_require__(1);
	var Helpers = __webpack_require__(2);
	var Animation = __webpack_require__(3);
	var Carousel = __webpack_require__(4);
	var Share = __webpack_require__(5);
	var Youtube = __webpack_require__(6);
	var Statistic = __webpack_require__(7);

	$(document).ready(function () {

	  DeviceDetection.run();
	  Helpers.init();
	  Share.init();
	  Carousel.init();

	  $.afterlag(function () {
	    $('html').addClass('is-loaded');
	  });

	  $('html').addClass('is-animating');

	  Animation.init();

	  if (window.innerWidth > document.body.clientWidth || !$('html').hasClass('fp-enabled')) {
	    $('.layout, .header').css({ 'padding-right': Helpers.getNativeScrollbarWidth() + 'px' });
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
	  DeviceDetection: DeviceDetection,
	  Helpers: Helpers,
	  Carousel: Carousel,
	  Share: Share,
	  Animation: Animation,
	  Youtube: Youtube,
	  Statistic: Statistic
		};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	var breakpoints = {
	  sm: 767,
	  md: 1023,
	  lg: 1280,
	  xl: 1600
	};

	function isPortrait() {
	  return $(window).width() < $(window).height();
	}
	function isLandscape() {
	  return $(window).width() > $(window).height();
	}
	function isMobile() {
	  return $(window).width() <= breakpoints.sm;
	}
	function isTablet() {
	  return $(window).width() > breakpoints.sm && $(window).width() <= breakpoints.md;
	}
	function isDesktopExt() {
	  return $(window).width() >= breakpoints.md;
	}
	function isDesktop() {
	  return $(window).width() > breakpoints.md;
	}
	function isTouch() {
	  return 'ontouchstart' in window || navigator.maxTouchPoints;
	}
	function isMobileVersion() {
	  return !!~window.location.href.indexOf("/mobile/");
	}

	function run() {
	  if (isTouch()) {
	    $('html').removeClass('no-touch').addClass('touch');
	  } else {
	    $('html').removeClass('touch').addClass('no-touch');
	  }
	}

	module.exports = {
	  run: run,
	  isTouch: isTouch,
	  isMobile: isMobile,
	  isTablet: isTablet,
	  isDesktop: isDesktop,
	  isDesktopExt: isDesktopExt,
	  isMobileVersion: isMobileVersion,
	  isPortrait: isPortrait,
	  isLandscape: isLandscape
		};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Helpers
	 * @module Helpers
	 */

	// Add script asynh
	function addScript(url) {
	  var tag = document.createElement("script");
	  tag.src = url;
	  var firstScriptTag = document.getElementsByTagName("script")[0];
	  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	/**
	 * Calculate scrollbar width in element
	 * - if the width is 0 it means the scrollbar is floated/overlayed
	 * - accepts "container" paremeter because ie & edge can have different
	 *   scrollbar behaviors for different elements using '-ms-overflow-style'
	 */
	function getNativeScrollbarWidth(container) {
	  container = container || document.body;

	  var fullWidth = 0;
	  var barWidth = 0;

	  var wrapper = document.createElement('div');
	  var child = document.createElement('div');

	  wrapper.style.position = 'absolute';
	  wrapper.style.pointerEvents = 'none';
	  wrapper.style.bottom = '0';
	  wrapper.style.right = '0';
	  wrapper.style.width = '100px';
	  wrapper.style.overflow = 'hidden';

	  wrapper.appendChild(child);
	  container.appendChild(wrapper);

	  fullWidth = child.offsetWidth;
	  wrapper.style.overflowY = 'scroll';
	  barWidth = fullWidth - child.offsetWidth;

	  container.removeChild(wrapper);

	  return barWidth;
	}

	/**
	 * Throttle Helper
	 * https://remysharp.com/2010/07/21/throttling-function-calls
	 */
	function throttle(fn, threshhold, scope) {
	  threshhold || (threshhold = 250);
	  var last = void 0,
	      deferTimer = void 0;
	  return function () {
	    var context = scope || this;

	    var now = +new Date(),
	        args = arguments;
	    if (last && now < last + threshhold) {
	      // hold on to it
	      clearTimeout(deferTimer);
	      deferTimer = setTimeout(function () {
	        last = now;
	        fn.apply(context, args);
	      }, threshhold);
	    } else {
	      last = now;
	      fn.apply(context, args);
	    }
	  };
	}

	/** 
	 * Debounce Helper
	 * https://remysharp.com/2010/07/21/throttling-function-calls
	 */
	function debounce(fn, delay) {
	  var timer = null;
	  return function () {
	    var context = this,
	        args = arguments;
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      fn.apply(context, args);
	    }, delay);
	  };
	};

	var timer = void 0;
	var timeout = false;
	var delta = 200;
	function resizeEnd() {
	  if (new Date() - timer < delta) {
	    setTimeout(resizeEnd, delta);
	  } else {
	    timeout = false;
	    $(window).trigger('resizeend');
	  }
	}

	function toggleClassIf(el, cond, toggledClass) {
	  if (cond) {
	    el.addClass(toggledClass);
	  } else {
	    el.removeClass(toggledClass);
	  }
	}

	/**
	 * Функция добавляет к элементу класс, если страница прокручена больше, чем на указанное значение, 
	 * и убирает класс, если значение меньше
	 * @param {object} el - элемент, с которым взаимодействуем
	 * @param {mixed} [scrollValue=0] - значение прокрутки, на котором меняем css-класс, ожидаемое значение - число или ключевое слово 'this'. Если передано 'this', подставляется положение el.offset().top минус половина высоты экрана
	 * @param {string} [toggledClass=scrolled] - css-класс, который переключаем
	 */
	function toggleElementClassOnScroll(el) {
	  var scrollValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var toggledClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'scrolled';

	  if (el.length == 0) {
	    //console.error("Необходимо передать объект, с которым вы хотите взаимодействовать");
	    return false;
	  }

	  if (scrollValue == 'this') {
	    scrollValue = el.offset().top - $(window).outerHeight() / 2;
	  }

	  $(window).on('scroll', function (e) {
	    if ($(window).scrollTop() > scrollValue) {
	      el.addClass(toggledClass);
	    } else {
	      el.removeClass(toggledClass);
	    }
	  });
	};

	/* Modals */
	function openModal(modal) {
	  if (modal) {
	    var win = modal.find('.modal__window');
	    modal.fadeIn(500);
	    $('html, body').css('overflow-y', 'hidden');
	    win.fadeIn(500);
	    modal.trigger('modalopened');
	  } else {
	    console.error('Which modal?');
	  }
	}

	function closeModal(modal) {
	  if (modal) {
	    var win = modal.find('.modal__window');
	    win.fadeOut(500);
	    modal.fadeOut(500);
	    $('html, body').css('overflow-y', '');
	    modal.trigger('modalclosed');
	  } else {
	    console.error('Which modal?');
	  }
	}

	/**
	 * инициализация событий для переключателей классов
	 * @example
	 * Helpers.init();
	 */
	function init() {

	  toggleElementClassOnScroll($('.header'), 50);

	  $('.js-hide-block').on('click', function () {
	    var target = $(this).data('target') === 'self' ? $(this).parent() : $($(this).data('target'));
	    target.fadeOut(500);
	  });

	  $('.btn-close-modal').on('click', function () {
	    var target = !!$(this).data('target') ? $($(this).data('target')) : $(this).parent();
	    var modal = target.parent('.modal');
	    closeModal(modal);
	  });

	  $('.modal').on('click', function () {
	    closeModal($(this));
	  });

	  $('.btn-modal').on('click', function (e) {
	    var target = $(this).data('target') === 'self' ? $(this).parent() : $($(this).data('target'));
	    e.preventDefault();
	    openModal(target);
	  });

	  $(window).on('resize', function () {
	    timer = new Date();
	    if (timeout === false) {
	      timeout = true;
	      setTimeout(resizeEnd, delta);
	    }
	  });

	  if ($('.layout').hasClass('layout--home') && Main.DeviceDetection.isMobile()) {
	    if (Main.DeviceDetection.isLandscape()) {
	      $('html').addClass('rotate');
	      $('.page-rotate').fadeIn(500);
	    }

	    $(window).on('resizeend', function () {
	      if (Main.DeviceDetection.isLandscape()) {
	        $('html, body').css('overflow-y', 'hidden');
	        $('html').addClass('rotate');
	        $('.page-rotate').fadeIn(500);
	      } else {
	        $('.page-rotate').fadeOut(500);
	        $('html').removeClass('rotate');
	        $('html, body').css('overflow-y', '');
	      }
	    });
	  }

	  $('.btn-menu').on('click', function () {
	    $(this).toggleClass('is-open');
	    $('.header').toggleClass('is-open');
	    $('body').toggleClass('nav-is-open');
	    $('.nav').fadeToggle(500);
	    if (Main.DeviceDetection.isMobile() || Main.DeviceDetection.isTablet()) {
	      if ($('.header').hasClass('is-open')) {
	        $('html, body').css('overflow-y', 'hidden');
	      } else {
	        $('html, body').css('overflow-y', '');
	      }
	    }
	  });

	  $(window).scroll($.debounce(250, true, function () {
	    $('html').addClass('is-scrolling');
	  }));
	  $(window).scroll($.debounce(250, function () {
	    $('html').removeClass('is-scrolling');
	  }));
	}

	module.exports = {
	  init: init,
	  getNativeScrollbarWidth: getNativeScrollbarWidth,
	  toggleClassIf: toggleClassIf,
	  toggleElementClassOnScroll: toggleElementClassOnScroll,
	  addScript: addScript,
	  openModal: openModal,
	  closeModal: closeModal
		};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Переключение классов по различным событиям
	 * @module Animation
	 */

	var scrollAnimationBlocks = $('.a-scroll-box');

	function addClassTogglerScene(el, controller) {
	  new ScrollMagic.Scene({
	    triggerElement: el,
	    triggerHook: 0.6
	  }).setClassToggle(el, 'animate').addTo(controller);
	}

	function addClassTogglerController(animationBlocks) {
	  var controller = new ScrollMagic.Controller();
	  animationBlocks.each(function () {
	    var aDelay = 300;
	    if (this.offsetTop < window.innerHeight) {
	      aDelay = 1300;
	    }
	    setTimeout(addClassTogglerScene, aDelay, this, controller);
	    //}
	  });
	}

	function init() {
	  if (scrollAnimationBlocks.length > 0) {
	    //$('html').addClass('is-animating');
	    addClassTogglerController(scrollAnimationBlocks);
	  }
	}

	module.exports = { init: init };

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Карусель
	 * @module Carousel
	 */

	/**
	 * Инициализация карусели
	 */
	function init() {

	  var owl = $('.owl-carousel');

	  owl.owlCarousel({
	    autoWidth: true,
	    autoHeight: false,
	    nav: true,
	    navText: ['', ''],
	    dots: false,
	    loop: true,
	    mouseDrag: false
	  });

	  owl.on('initialized.owl.carousel', function () {
	    $('.owl-item.active').eq(0).addClass('visible').siblings('.owl-item').removeClass('visible');
	  });

	  owl.on('changed.owl.carousel', function () {
	    setTimeout(function () {
	      $('.owl-item.active').eq(0).addClass('visible').siblings('.owl-item').removeClass('visible');
	    }, 100);
	  });
	}

	module.exports = { init: init };

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	function getIcon(el) {
	  var icon = '';
	  if (el.hasClass('ya-share2__item_service_vkontakte')) {
	    icon = 'vk';
	  }
	  if (el.hasClass('ya-share2__item_service_facebook')) {
	    icon = 'fb';
	  }
	  if (el.hasClass('ya-share2__item_service_twitter')) {
	    icon = 'tw';
	  }
	  if (el.hasClass('ya-share2__item_service_telegram')) {
	    icon = 'tg';
	  }
	  return '<svg class="icon social-icon"><use xlink:href="#' + icon + '"/></svg>';
	}
	function fillIcons() {
	  $('#share .ya-share2__item').each(function () {
	    $(this).find('.ya-share2__icon').html(getIcon($(this)));
	  });
	}
	function init() {
	  Ya.share2('share', {
	    content: {
	      url: window.location.href,
	      title: 'Круче их музыки только их история',
	      description: "В ожидании фильма «Богемская рапсодия» про Фредди Меркьюри и группы Queen «Лента.ру» рассказывает о самых интересных и неожиданных фактах из жизни великого музыканта",
	      image: 'http://bohemianrhapsody.lenta.ru/social.jpg'
	    },
	    theme: {
	      services: 'vkontakte,facebook,twitter,telegram',
	      bare: true,
	      lang: 'ru'
	    },
	    hooks: {
	      onready: function onready() {
	        fillIcons();
	      }
	    }
	  });
	}
	module.exports = { init: init };

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Youtube
	 * @module Youtube
	 */

	// Init empty array of iframe IDs, one from each video
	var iframeIds = [];

	// Init empty array of iframe YT objects for use elsewhere
	// Here I only use this to iterate through and pause all videos when
	// another begins playing
	var iframeObjects = [];

	// Shared onReady event which adds events to each video's corresponding
	// play and stop buttons
	function onPlayerReady(event) {
	  var iframeObject = event.target;
	  var iframeElement = iframeObject.a;
	  var videoContainer = $(iframeElement).closest('.yt');
	  var modal = videoContainer.closest('.modal');
	  var play = videoContainer.find(".play");
	  var stop = videoContainer.find(".stop");

	  // Push current iframe object to array
	  iframeObjects.push(iframeObject);

	  play.on("click", function () {
	    // Pause all videos currently playing
	    iframeObjects.forEach(function (scopediframeObject) {
	      scopediframeObject.pauseVideo();
	      var scopediframeElement = scopediframeObject.a;
	      scopediframeElement.classList.remove('isPlaying');
	    });

	    // Play selected video
	    iframeObject.playVideo();
	    iframeElement.classList.add('isPlaying');
	  });

	  stop.on("click", function () {
	    iframeObject.pauseVideo();
	    iframeElement.classList.remove('isPlaying');
	  });

	  modal.on('modalclosed', function () {
	    iframeObject.pauseVideo();
	    iframeElement.classList.remove('isPlaying');
	  });
	}

	/**
	 * инициализация событий для переключателей классов
	 * @example
	 * Youtube.init();
	 */

	function init() {

	  Main.Helpers.addScript("https://www.youtube.com/iframe_api");

	  // For each iframe you find, add its ID to the iframeIds array
	  var iframes = document.querySelectorAll(".yt iframe");
	  iframes.forEach(function (iframe) {
	    iframeIds.push(iframe.id);
	  });

	  // Once the YouTube API is ready, for each iframeId in your array, create
	  // a new YT player and give it the onReady event
	  window.onYouTubeIframeAPIReady = function () {
	    iframeIds.forEach(function (iframeId) {
	      var player = new YT.Player(iframeId, {
	        events: {
	          onReady: onPlayerReady
	        }
	      });
	    });
	  };
	}

	module.exports = { init: init };

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Statistic
	 * @module Statistic
	 */

	function sendGa(category, action, label) {
	  ga('send', {
	    hitType: 'event',
	    eventCategory: category,
	    eventAction: action,
	    eventLabel: label
	  });
	};

	function init() {
	  $('.btn-ticket').on('click', function () {
	    sendGa('external', 'click', 'buy_ticket');
	  });
	  $('.link-lenta').on('click', function () {
	    sendGa('external', 'click', 'lenta_logo');
	  });

	  $('#trailer').on('modalopen', function () {
	    sendGa('internal', 'click', 'watch_trailer');
	  });
	  $('#trailer').on('modalclosed', function () {
	    sendGa('internal', 'click', 'close_trailer');
	  });
	  $('.btn-material').on('click', function () {
	    sendGa('internal', 'click', $(this).closest('.screen').data('material'));
	  });
	  $('.fp-section').on('sectionscrolled', function (e, label) {
	    sendGa('internal', 'scroll', label);
	  });

	  if ($('.layout').hasClass('layout--lenta')) {
	    jQuery.scrollDepth();
	  }
	}

	module.exports = { init: init, sendGa: sendGa };

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlMDNmOGU0N2VlYzcyYTkwZDhjYiIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL3NoYXJlLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy95b3V0dWJlLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9zdGF0aXN0aWMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2tlbnpvL2J1aWxkL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGUwM2Y4ZTQ3ZWVjNzJhOTBkOGNiIiwibGV0IERldmljZURldGVjdGlvbiA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvZGV2aWNlLWRldGVjdGlvblwiKTtcclxubGV0IEhlbHBlcnMgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2hlbHBlcnNcIik7XHJcbmxldCBBbmltYXRpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2FuaW1hdGlvblwiKTtcclxubGV0IENhcm91c2VsID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9jYXJvdXNlbFwiKTtcclxubGV0IFNoYXJlID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zaGFyZVwiKTtcclxubGV0IFlvdXR1YmUgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3lvdXR1YmVcIik7XHJcbmxldCBTdGF0aXN0aWMgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3N0YXRpc3RpY1wiKTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgXHJcbiAgRGV2aWNlRGV0ZWN0aW9uLnJ1bigpO1xyXG4gIEhlbHBlcnMuaW5pdCgpO1xyXG4gIFNoYXJlLmluaXQoKTtcclxuICBDYXJvdXNlbC5pbml0KCk7XHJcbiAgXHJcbiAgJC5hZnRlcmxhZyhmdW5jdGlvbigpe1xyXG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1sb2FkZWQnKTtcclxuICB9KTtcclxuICBcclxuICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLWFuaW1hdGluZycpO1xyXG4gIFxyXG4gIEFuaW1hdGlvbi5pbml0KCk7XHJcblxyXG4gIFxyXG4gIGlmICgod2luZG93LmlubmVyV2lkdGggPiBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoKSB8fCAhJCgnaHRtbCcpLmhhc0NsYXNzKCdmcC1lbmFibGVkJykpIHtcclxuICAgICQoJy5sYXlvdXQsIC5oZWFkZXInKS5jc3MoeydwYWRkaW5nLXJpZ2h0JzogSGVscGVycy5nZXROYXRpdmVTY3JvbGxiYXJXaWR0aCgpICsgJ3B4J30pO1xyXG4gIH1cclxuXHJcbiAgLy9Zb3V0dWJlLmluaXQoKTtcclxuICAvL1N0YXRpc3RpYy5pbml0KCk7XHJcbiAgXHJcbn0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDQodC/0LjRgdC+0Log0Y3QutGB0L/QvtGA0YLQuNGA0YPQtdC80YvRhSDQvNC+0LTRg9C70LXQuSwg0YfRgtC+0LHRiyDQuNC80LXRgtGMINC6INC90LjQvCDQtNC+0YHRgtGD0L8g0LjQt9Cy0L3QtVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBNYWluLkZvcm0uaXNGb3JtVmFsaWQoKTtcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIERldmljZURldGVjdGlvbixcclxuICBIZWxwZXJzLFxyXG5cdENhcm91c2VsLFxyXG4gIFNoYXJlLFxyXG4gIEFuaW1hdGlvbixcclxuICBZb3V0dWJlLFxyXG4gIFN0YXRpc3RpY1xyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvbWFpbi5qcyIsImxldCBicmVha3BvaW50cyA9IHtcclxuICBzbTogNzY3LFxyXG4gIG1kOiAxMDIzLFxyXG4gIGxnOiAxMjgwLFxyXG4gIHhsOiAxNjAwXHJcbn07XHJcblxyXG5mdW5jdGlvbiBpc1BvcnRyYWl0KCkge1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPCAkKHdpbmRvdykuaGVpZ2h0KCkpO1xyXG59XHJcbmZ1bmN0aW9uIGlzTGFuZHNjYXBlKCkge1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPiAkKHdpbmRvdykuaGVpZ2h0KCkpO1xyXG59XHJcbmZ1bmN0aW9uIGlzTW9iaWxlKCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA8PSBicmVha3BvaW50cy5zbSk7XHJcbn1cclxuZnVuY3Rpb24gaXNUYWJsZXQoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID4gYnJlYWtwb2ludHMuc20gJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gYnJlYWtwb2ludHMubWQpXHJcbn1cclxuZnVuY3Rpb24gaXNEZXNrdG9wRXh0KCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA+PSBicmVha3BvaW50cy5tZClcclxufVxyXG5mdW5jdGlvbiBpc0Rlc2t0b3AoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID4gYnJlYWtwb2ludHMubWQpXHJcbn1cclxuZnVuY3Rpb24gaXNUb3VjaCgpe1xyXG4gIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzO1xyXG59XHJcbmZ1bmN0aW9uIGlzTW9iaWxlVmVyc2lvbigpe1xyXG4gIHJldHVybiAhIX53aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKFwiL21vYmlsZS9cIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJ1bigpe1xyXG4gIGlmKGlzVG91Y2goKSl7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ25vLXRvdWNoJykuYWRkQ2xhc3MoJ3RvdWNoJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygndG91Y2gnKS5hZGRDbGFzcygnbm8tdG91Y2gnKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHJ1bixcclxuICBpc1RvdWNoLFxyXG4gIGlzTW9iaWxlLFxyXG4gIGlzVGFibGV0LFxyXG4gIGlzRGVza3RvcCxcclxuICBpc0Rlc2t0b3BFeHQsXHJcbiAgaXNNb2JpbGVWZXJzaW9uLFxyXG4gIGlzUG9ydHJhaXQsXHJcbiAgaXNMYW5kc2NhcGVcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvZGV2aWNlLWRldGVjdGlvbi5qcyIsIi8qKlxyXG4gKiBIZWxwZXJzXHJcbiAqIEBtb2R1bGUgSGVscGVyc1xyXG4gKi9cclxuXHJcbi8vIEFkZCBzY3JpcHQgYXN5bmhcclxuZnVuY3Rpb24gYWRkU2NyaXB0ICh1cmwpIHtcclxuICB2YXIgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuICB0YWcuc3JjID0gdXJsO1xyXG4gIHZhciBmaXJzdFNjcmlwdFRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpWzBdO1xyXG4gIGZpcnN0U2NyaXB0VGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhZywgZmlyc3RTY3JpcHRUYWcpO1xyXG59XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlIHNjcm9sbGJhciB3aWR0aCBpbiBlbGVtZW50XHJcbiAqIC0gaWYgdGhlIHdpZHRoIGlzIDAgaXQgbWVhbnMgdGhlIHNjcm9sbGJhciBpcyBmbG9hdGVkL292ZXJsYXllZFxyXG4gKiAtIGFjY2VwdHMgXCJjb250YWluZXJcIiBwYXJlbWV0ZXIgYmVjYXVzZSBpZSAmIGVkZ2UgY2FuIGhhdmUgZGlmZmVyZW50XHJcbiAqICAgc2Nyb2xsYmFyIGJlaGF2aW9ycyBmb3IgZGlmZmVyZW50IGVsZW1lbnRzIHVzaW5nICctbXMtb3ZlcmZsb3ctc3R5bGUnXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXROYXRpdmVTY3JvbGxiYXJXaWR0aCAoY29udGFpbmVyKSB7XHJcbiAgY29udGFpbmVyID0gY29udGFpbmVyIHx8IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gIGxldCBmdWxsV2lkdGggPSAwO1xyXG4gIGxldCBiYXJXaWR0aCA9IDA7XHJcblxyXG4gIGxldCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbGV0IGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gIHdyYXBwZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gIHdyYXBwZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcclxuICB3cmFwcGVyLnN0eWxlLmJvdHRvbSA9ICcwJztcclxuICB3cmFwcGVyLnN0eWxlLnJpZ2h0ID0gJzAnO1xyXG4gIHdyYXBwZXIuc3R5bGUud2lkdGggPSAnMTAwcHgnO1xyXG4gIHdyYXBwZXIuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgd3JhcHBlci5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xyXG5cclxuICBmdWxsV2lkdGggPSBjaGlsZC5vZmZzZXRXaWR0aDtcclxuICB3cmFwcGVyLnN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xyXG4gIGJhcldpZHRoID0gZnVsbFdpZHRoIC0gY2hpbGQub2Zmc2V0V2lkdGg7XHJcblxyXG4gIGNvbnRhaW5lci5yZW1vdmVDaGlsZCh3cmFwcGVyKTtcclxuXHJcbiAgcmV0dXJuIGJhcldpZHRoO1xyXG59XHJcblxyXG4vKipcclxuICogVGhyb3R0bGUgSGVscGVyXHJcbiAqIGh0dHBzOi8vcmVteXNoYXJwLmNvbS8yMDEwLzA3LzIxL3Rocm90dGxpbmctZnVuY3Rpb24tY2FsbHNcclxuICovXHJcbmZ1bmN0aW9uIHRocm90dGxlIChmbiwgdGhyZXNoaG9sZCwgc2NvcGUpIHtcclxuICB0aHJlc2hob2xkIHx8ICh0aHJlc2hob2xkID0gMjUwKTtcclxuICBsZXQgbGFzdCxcclxuICAgIGRlZmVyVGltZXI7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBjb250ZXh0ID0gc2NvcGUgfHwgdGhpcztcclxuXHJcbiAgICBsZXQgbm93ID0gK25ldyBEYXRlKCksXHJcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICBpZiAobGFzdCAmJiBub3cgPCBsYXN0ICsgdGhyZXNoaG9sZCkge1xyXG4gICAgICAvLyBob2xkIG9uIHRvIGl0XHJcbiAgICAgIGNsZWFyVGltZW91dChkZWZlclRpbWVyKTtcclxuICAgICAgZGVmZXJUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxhc3QgPSBub3c7XHJcbiAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICAgIH0sIHRocmVzaGhvbGQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGFzdCA9IG5vdztcclxuICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKiogXHJcbiAqIERlYm91bmNlIEhlbHBlclxyXG4gKiBodHRwczovL3JlbXlzaGFycC5jb20vMjAxMC8wNy8yMS90aHJvdHRsaW5nLWZ1bmN0aW9uLWNhbGxzXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWJvdW5jZSAoZm4sIGRlbGF5KSB7XHJcbiAgbGV0IHRpbWVyID0gbnVsbDtcclxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgfSwgZGVsYXkpO1xyXG4gIH07XHJcbn07XHJcblxyXG5sZXQgdGltZXI7XHJcbmxldCB0aW1lb3V0ID0gZmFsc2U7XHJcbmxldCBkZWx0YSA9IDIwMDtcclxuZnVuY3Rpb24gcmVzaXplRW5kKCkge1xyXG4gIGlmIChuZXcgRGF0ZSgpIC0gdGltZXIgPCBkZWx0YSkge1xyXG4gICAgc2V0VGltZW91dChyZXNpemVFbmQsIGRlbHRhKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGltZW91dCA9IGZhbHNlO1xyXG4gICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZWVuZCcpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQ2xhc3NJZihlbCwgY29uZCwgdG9nZ2xlZENsYXNzKXtcclxuXHRpZihjb25kKXtcclxuXHRcdGVsLmFkZENsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGVsLnJlbW92ZUNsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICog0KTRg9C90LrRhtC40Y8g0LTQvtCx0LDQstC70Y/QtdGCINC6INGN0LvQtdC80LXQvdGC0YMg0LrQu9Cw0YHRgSwg0LXRgdC70Lgg0YHRgtGA0LDQvdC40YbQsCDQv9GA0L7QutGA0YPRh9C10L3QsCDQsdC+0LvRjNGI0LUsINGH0LXQvCDQvdCwINGD0LrQsNC30LDQvdC90L7QtSDQt9C90LDRh9C10L3QuNC1LCBcclxuICog0Lgg0YPQsdC40YDQsNC10YIg0LrQu9Cw0YHRgSwg0LXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSDQvNC10L3RjNGI0LVcclxuICogQHBhcmFtIHtvYmplY3R9IGVsIC0g0Y3Qu9C10LzQtdC90YIsINGBINC60L7RgtC+0YDRi9C8INCy0LfQsNC40LzQvtC00LXQudGB0YLQstGD0LXQvFxyXG4gKiBAcGFyYW0ge21peGVkfSBbc2Nyb2xsVmFsdWU9MF0gLSDQt9C90LDRh9C10L3QuNC1INC/0YDQvtC60YDRg9GC0LrQuCwg0L3QsCDQutC+0YLQvtGA0L7QvCDQvNC10L3Rj9C10LwgY3NzLdC60LvQsNGB0YEsINC+0LbQuNC00LDQtdC80L7QtSDQt9C90LDRh9C10L3QuNC1IC0g0YfQuNGB0LvQviDQuNC70Lgg0LrQu9GO0YfQtdCy0L7QtSDRgdC70L7QstC+ICd0aGlzJy4g0JXRgdC70Lgg0L/QtdGA0LXQtNCw0L3QviAndGhpcycsINC/0L7QtNGB0YLQsNCy0LvRj9C10YLRgdGPINC/0L7Qu9C+0LbQtdC90LjQtSBlbC5vZmZzZXQoKS50b3Ag0LzQuNC90YPRgSDQv9C+0LvQvtCy0LjQvdCwINCy0YvRgdC+0YLRiyDRjdC60YDQsNC90LBcclxuICogQHBhcmFtIHtzdHJpbmd9IFt0b2dnbGVkQ2xhc3M9c2Nyb2xsZWRdIC0gY3NzLdC60LvQsNGB0YEsINC60L7RgtC+0YDRi9C5INC/0LXRgNC10LrQu9GO0YfQsNC10LxcclxuICovXHJcbmZ1bmN0aW9uIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsKGVsLCBzY3JvbGxWYWx1ZSA9IDAsIHRvZ2dsZWRDbGFzcyA9ICdzY3JvbGxlZCcpe1xyXG5cdGlmKGVsLmxlbmd0aCA9PSAwKSB7XHJcblx0XHQvL2NvbnNvbGUuZXJyb3IoXCLQndC10L7QsdGF0L7QtNC40LzQviDQv9C10YDQtdC00LDRgtGMINC+0LHRitC10LrRgiwg0YEg0LrQvtGC0L7RgNGL0Lwg0LLRiyDRhdC+0YLQuNGC0LUg0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0L7QstCw0YLRjFwiKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0XHJcblx0aWYoc2Nyb2xsVmFsdWUgPT0gJ3RoaXMnKSB7XHJcblx0XHRzY3JvbGxWYWx1ZSA9IGVsLm9mZnNldCgpLnRvcCAtICQod2luZG93KS5vdXRlckhlaWdodCgpIC8gMjtcclxuXHR9XHJcblx0XHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKXtcclxuXHRcdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IHNjcm9sbFZhbHVlKXtcclxuXHRcdFx0ZWwuYWRkQ2xhc3ModG9nZ2xlZENsYXNzKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVsLnJlbW92ZUNsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiBNb2RhbHMgKi9cclxuZnVuY3Rpb24gb3Blbk1vZGFsKG1vZGFsKSB7XHJcbiAgaWYgKG1vZGFsKSB7XHJcbiAgICBsZXQgd2luID0gbW9kYWwuZmluZCgnLm1vZGFsX193aW5kb3cnKTtcclxuICAgIG1vZGFsLmZhZGVJbig1MDApO1xyXG4gICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcclxuICAgIHdpbi5mYWRlSW4oNTAwKTtcclxuICAgIG1vZGFsLnRyaWdnZXIoJ21vZGFsb3BlbmVkJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1doaWNoIG1vZGFsPycpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2VNb2RhbChtb2RhbCkge1xyXG4gIGlmIChtb2RhbCkge1xyXG4gICAgbGV0IHdpbiA9IG1vZGFsLmZpbmQoJy5tb2RhbF9fd2luZG93Jyk7XHJcbiAgICB3aW4uZmFkZU91dCg1MDApO1xyXG4gICAgbW9kYWwuZmFkZU91dCg1MDApO1xyXG4gICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICcnKTtcclxuICAgIG1vZGFsLnRyaWdnZXIoJ21vZGFsY2xvc2VkJylcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5lcnJvcignV2hpY2ggbW9kYWw/Jyk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvQtdC5INC60LvQsNGB0YHQvtCyXHJcbiAqIEBleGFtcGxlXHJcbiAqIEhlbHBlcnMuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIFxyXG4gIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsKCQoJy5oZWFkZXInKSwgNTApO1xyXG4gIFxyXG4gICQoJy5qcy1oaWRlLWJsb2NrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGxldCB0YXJnZXQgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpID09PSAnc2VsZicgPyAkKHRoaXMpLnBhcmVudCgpIDogJCgkKHRoaXMpLmRhdGEoJ3RhcmdldCcpKTtcclxuICAgIHRhcmdldC5mYWRlT3V0KDUwMCk7XHJcbiAgfSk7XHJcblxyXG4gICQoJy5idG4tY2xvc2UtbW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgbGV0IHRhcmdldCA9ICEhJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSA/ICQoJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSkgOiAkKHRoaXMpLnBhcmVudCgpO1xyXG4gICAgbGV0IG1vZGFsID0gdGFyZ2V0LnBhcmVudCgnLm1vZGFsJyk7XHJcbiAgICBjbG9zZU1vZGFsKG1vZGFsKVxyXG4gIH0pO1xyXG5cclxuICAkKCcubW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIGNsb3NlTW9kYWwoJCh0aGlzKSk7XHJcbiAgfSk7XHJcblxyXG4gICQoJy5idG4tbW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICBsZXQgdGFyZ2V0ID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSA9PT0gJ3NlbGYnID8gJCh0aGlzKS5wYXJlbnQoKSA6ICQoJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSk7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuTW9kYWwodGFyZ2V0KTtcclxuICB9KTtcclxuICBcclxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIHRpbWVyID0gbmV3IERhdGUoKTtcclxuICAgIGlmICh0aW1lb3V0ID09PSBmYWxzZSkge1xyXG4gICAgICB0aW1lb3V0ID0gdHJ1ZTtcclxuICAgICAgc2V0VGltZW91dChyZXNpemVFbmQsIGRlbHRhKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgaWYgKCQoJy5sYXlvdXQnKS5oYXNDbGFzcygnbGF5b3V0LS1ob21lJykgJiYgTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNNb2JpbGUoKSkge1xyXG4gICAgaWYgKE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzTGFuZHNjYXBlKCkpIHtcclxuICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKCdyb3RhdGUnKTtcclxuICAgICAgJCgnLnBhZ2Utcm90YXRlJykuZmFkZUluKDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemVlbmQnLCBmdW5jdGlvbigpe1xyXG4gICAgICBpZiAoTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNMYW5kc2NhcGUoKSkge1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKCdyb3RhdGUnKTtcclxuICAgICAgICAkKCcucGFnZS1yb3RhdGUnKS5mYWRlSW4oNTAwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKCcucGFnZS1yb3RhdGUnKS5mYWRlT3V0KDUwMCk7XHJcbiAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdyb3RhdGUnKTtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJycpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgXHJcbiAgJCgnLmJ0bi1tZW51Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICQoJy5oZWFkZXInKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCduYXYtaXMtb3BlbicpO1xyXG4gICAgJCgnLm5hdicpLmZhZGVUb2dnbGUoNTAwKTtcclxuICAgIGlmIChNYWluLkRldmljZURldGVjdGlvbi5pc01vYmlsZSgpIHx8IE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzVGFibGV0KCkpIHtcclxuICAgICAgaWYgKCQoJy5oZWFkZXInKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJycpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgXHJcbiAgJCh3aW5kb3cpLnNjcm9sbCgkLmRlYm91bmNlKDI1MCwgdHJ1ZSwgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLXNjcm9sbGluZycpO1xyXG4gIH0pKTtcclxuICAkKHdpbmRvdykuc2Nyb2xsKCQuZGVib3VuY2UoMjUwLCBmdW5jdGlvbigpIHtcclxuICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnaXMtc2Nyb2xsaW5nJyk7XHJcbiAgfSkpO1xyXG4gIFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBpbml0LCBcclxuICBnZXROYXRpdmVTY3JvbGxiYXJXaWR0aCxcclxuICB0b2dnbGVDbGFzc0lmLCBcclxuICB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbCwgXHJcbiAgYWRkU2NyaXB0LCBcclxuICBvcGVuTW9kYWwsIFxyXG4gIGNsb3NlTW9kYWxcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvaGVscGVycy5qcyIsIi8qKlxyXG4gKiDQn9C10YDQtdC60LvRjtGH0LXQvdC40LUg0LrQu9Cw0YHRgdC+0LIg0L/QviDRgNCw0LfQu9C40YfQvdGL0Lwg0YHQvtCx0YvRgtC40Y/QvFxyXG4gKiBAbW9kdWxlIEFuaW1hdGlvblxyXG4gKi9cclxuXHJcbmxldCBzY3JvbGxBbmltYXRpb25CbG9ja3MgPSAkKCcuYS1zY3JvbGwtYm94Jyk7XHJcblxyXG5mdW5jdGlvbiBhZGRDbGFzc1RvZ2dsZXJTY2VuZSAoZWwsIGNvbnRyb2xsZXIpIHtcclxuICBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe1xyXG4gICAgdHJpZ2dlckVsZW1lbnQ6IGVsLFxyXG4gICAgdHJpZ2dlckhvb2s6IDAuNlxyXG4gIH0pXHJcbiAgLnNldENsYXNzVG9nZ2xlKGVsLCAnYW5pbWF0ZScpXHJcbiAgLmFkZFRvKGNvbnRyb2xsZXIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRDbGFzc1RvZ2dsZXJDb250cm9sbGVyIChhbmltYXRpb25CbG9ja3MpIHtcclxuICBsZXQgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XHJcbiAgYW5pbWF0aW9uQmxvY2tzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgbGV0IGFEZWxheSA9IDMwMDtcclxuICAgICAgaWYodGhpcy5vZmZzZXRUb3AgPCB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcclxuICAgICAgICBhRGVsYXkgPSAxMzAwO1xyXG4gICAgICB9XHJcbiAgICAgIHNldFRpbWVvdXQoYWRkQ2xhc3NUb2dnbGVyU2NlbmUsIGFEZWxheSwgdGhpcywgY29udHJvbGxlcik7XHJcbiAgICAvL31cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdCAoKSB7XHJcbiAgaWYgKHNjcm9sbEFuaW1hdGlvbkJsb2Nrcy5sZW5ndGggPiAwKXtcclxuICAgIC8vJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1hbmltYXRpbmcnKTtcclxuICAgIGFkZENsYXNzVG9nZ2xlckNvbnRyb2xsZXIoc2Nyb2xsQW5pbWF0aW9uQmxvY2tzKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9hbmltYXRpb24uanMiLCIvKipcclxuICog0JrQsNGA0YPRgdC10LvRjFxyXG4gKiBAbW9kdWxlIENhcm91c2VsXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC60LDRgNGD0YHQtdC70LhcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuXHJcbiAgbGV0IG93bCA9ICQoJy5vd2wtY2Fyb3VzZWwnKTtcclxuXHJcbiAgb3dsLm93bENhcm91c2VsKHtcclxuICAgIGF1dG9XaWR0aDogdHJ1ZSxcclxuICAgIGF1dG9IZWlnaHQ6IGZhbHNlLFxyXG4gICAgbmF2OiB0cnVlLFxyXG4gICAgbmF2VGV4dDogWycnLCAnJ10sXHJcbiAgICBkb3RzOiBmYWxzZSxcclxuICAgIGxvb3A6IHRydWUsXHJcbiAgICBtb3VzZURyYWc6IGZhbHNlXHJcbiAgfSk7XHJcblxyXG4gIG93bC5vbignaW5pdGlhbGl6ZWQub3dsLmNhcm91c2VsJywgZnVuY3Rpb24oKXtcclxuICAgICQoJy5vd2wtaXRlbS5hY3RpdmUnKS5lcSgwKS5hZGRDbGFzcygndmlzaWJsZScpLnNpYmxpbmdzKCcub3dsLWl0ZW0nKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xyXG4gIH0pO1xyXG5cclxuICBvd2wub24oJ2NoYW5nZWQub3dsLmNhcm91c2VsJywgZnVuY3Rpb24oKXtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICQoJy5vd2wtaXRlbS5hY3RpdmUnKS5lcSgwKS5hZGRDbGFzcygndmlzaWJsZScpLnNpYmxpbmdzKCcub3dsLWl0ZW0nKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xyXG4gICAgfSwgMTAwKTtcclxuICB9KTtcclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9jYXJvdXNlbC5qcyIsImZ1bmN0aW9uIGdldEljb24oZWwpIHtcclxuICBsZXQgaWNvbiA9ICcnO1xyXG4gIGlmIChlbC5oYXNDbGFzcygneWEtc2hhcmUyX19pdGVtX3NlcnZpY2VfdmtvbnRha3RlJykpIHtcclxuICAgIGljb24gPSAndmsnO1xyXG4gIH1cclxuICBpZiAoZWwuaGFzQ2xhc3MoJ3lhLXNoYXJlMl9faXRlbV9zZXJ2aWNlX2ZhY2Vib29rJykpIHtcclxuICAgIGljb24gPSAnZmInO1xyXG4gIH1cclxuICBpZiAoZWwuaGFzQ2xhc3MoJ3lhLXNoYXJlMl9faXRlbV9zZXJ2aWNlX3R3aXR0ZXInKSkge1xyXG4gICAgaWNvbiA9ICd0dyc7XHJcbiAgfVxyXG4gIGlmIChlbC5oYXNDbGFzcygneWEtc2hhcmUyX19pdGVtX3NlcnZpY2VfdGVsZWdyYW0nKSkge1xyXG4gICAgaWNvbiA9ICd0Zyc7XHJcbiAgfVxyXG4gIHJldHVybiAnPHN2ZyBjbGFzcz1cImljb24gc29jaWFsLWljb25cIj48dXNlIHhsaW5rOmhyZWY9XCIjJyArIGljb24gKyAnXCIvPjwvc3ZnPic7XHJcbn1cclxuZnVuY3Rpb24gZmlsbEljb25zKCkge1xyXG4gICQoJyNzaGFyZSAueWEtc2hhcmUyX19pdGVtJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS5maW5kKCcueWEtc2hhcmUyX19pY29uJykuaHRtbChnZXRJY29uKCQodGhpcykpKTtcclxuICB9KTtcclxufVxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gIFlhLnNoYXJlMignc2hhcmUnLCB7XHJcbiAgICBjb250ZW50OiB7XHJcbiAgICAgIHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYsXHJcbiAgICAgIHRpdGxlOiAn0JrRgNGD0YfQtSDQuNGFINC80YPQt9GL0LrQuCDRgtC+0LvRjNC60L4g0LjRhSDQuNGB0YLQvtGA0LjRjycsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBcItCSINC+0LbQuNC00LDQvdC40Lgg0YTQuNC70YzQvNCwIMKr0JHQvtCz0LXQvNGB0LrQsNGPINGA0LDQv9GB0L7QtNC40Y/CuyDQv9GA0L4g0KTRgNC10LTQtNC4INCc0LXRgNC60YzRjtGA0Lgg0Lgg0LPRgNGD0L/Qv9GLIFF1ZWVuIMKr0JvQtdC90YLQsC7RgNGDwrsg0YDQsNGB0YHQutCw0LfRi9Cy0LDQtdGCINC+INGB0LDQvNGL0YUg0LjQvdGC0LXRgNC10YHQvdGL0YUg0Lgg0L3QtdC+0LbQuNC00LDQvdC90YvRhSDRhNCw0LrRgtCw0YUg0LjQtyDQttC40LfQvdC4INCy0LXQu9C40LrQvtCz0L4g0LzRg9C30YvQutCw0L3RgtCwXCIsXHJcbiAgICAgIGltYWdlOiAnaHR0cDovL2JvaGVtaWFucmhhcHNvZHkubGVudGEucnUvc29jaWFsLmpwZydcclxuICAgIH0sXHJcbiAgICB0aGVtZToge1xyXG4gICAgICBzZXJ2aWNlczogJ3Zrb250YWt0ZSxmYWNlYm9vayx0d2l0dGVyLHRlbGVncmFtJyxcclxuICAgICAgYmFyZTogdHJ1ZSxcclxuICAgICAgbGFuZzogJ3J1J1xyXG4gICAgfSxcclxuICAgIGhvb2tzOiB7XHJcbiAgICAgIG9ucmVhZHk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZpbGxJY29ucygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL3NoYXJlLmpzIiwiLyoqXHJcbiAqIFlvdXR1YmVcclxuICogQG1vZHVsZSBZb3V0dWJlXHJcbiAqL1xyXG5cclxuLy8gSW5pdCBlbXB0eSBhcnJheSBvZiBpZnJhbWUgSURzLCBvbmUgZnJvbSBlYWNoIHZpZGVvXHJcbmxldCBpZnJhbWVJZHMgPSBbXTtcclxuXHJcbi8vIEluaXQgZW1wdHkgYXJyYXkgb2YgaWZyYW1lIFlUIG9iamVjdHMgZm9yIHVzZSBlbHNld2hlcmVcclxuLy8gSGVyZSBJIG9ubHkgdXNlIHRoaXMgdG8gaXRlcmF0ZSB0aHJvdWdoIGFuZCBwYXVzZSBhbGwgdmlkZW9zIHdoZW5cclxuLy8gYW5vdGhlciBiZWdpbnMgcGxheWluZ1xyXG5sZXQgaWZyYW1lT2JqZWN0cyA9IFtdO1xyXG5cclxuXHJcbi8vIFNoYXJlZCBvblJlYWR5IGV2ZW50IHdoaWNoIGFkZHMgZXZlbnRzIHRvIGVhY2ggdmlkZW8ncyBjb3JyZXNwb25kaW5nXHJcbi8vIHBsYXkgYW5kIHN0b3AgYnV0dG9uc1xyXG5mdW5jdGlvbiBvblBsYXllclJlYWR5KGV2ZW50KSB7XHJcbiAgbGV0IGlmcmFtZU9iamVjdCA9IGV2ZW50LnRhcmdldDtcclxuICBsZXQgaWZyYW1lRWxlbWVudCA9IGlmcmFtZU9iamVjdC5hO1xyXG4gIGxldCB2aWRlb0NvbnRhaW5lciA9ICQoaWZyYW1lRWxlbWVudCkuY2xvc2VzdCgnLnl0Jyk7XHJcbiAgbGV0IG1vZGFsID0gdmlkZW9Db250YWluZXIuY2xvc2VzdCgnLm1vZGFsJyk7XHJcbiAgbGV0IHBsYXkgPSB2aWRlb0NvbnRhaW5lci5maW5kKFwiLnBsYXlcIik7XHJcbiAgbGV0IHN0b3AgPSB2aWRlb0NvbnRhaW5lci5maW5kKFwiLnN0b3BcIik7XHJcbiAgXHJcbiAgLy8gUHVzaCBjdXJyZW50IGlmcmFtZSBvYmplY3QgdG8gYXJyYXlcclxuICBpZnJhbWVPYmplY3RzLnB1c2goaWZyYW1lT2JqZWN0KTtcclxuXHJcbiAgcGxheS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gUGF1c2UgYWxsIHZpZGVvcyBjdXJyZW50bHkgcGxheWluZ1xyXG4gICAgaWZyYW1lT2JqZWN0cy5mb3JFYWNoKGZ1bmN0aW9uKHNjb3BlZGlmcmFtZU9iamVjdCkge1xyXG4gICAgICBzY29wZWRpZnJhbWVPYmplY3QucGF1c2VWaWRlbygpO1xyXG4gICAgICBsZXQgc2NvcGVkaWZyYW1lRWxlbWVudCA9IHNjb3BlZGlmcmFtZU9iamVjdC5hO1xyXG4gICAgICBzY29wZWRpZnJhbWVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzUGxheWluZycpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8vIFBsYXkgc2VsZWN0ZWQgdmlkZW9cclxuICAgIGlmcmFtZU9iamVjdC5wbGF5VmlkZW8oKTtcclxuICAgIGlmcmFtZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXNQbGF5aW5nJyk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgc3RvcC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgaWZyYW1lT2JqZWN0LnBhdXNlVmlkZW8oKTtcclxuICAgIGlmcmFtZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXNQbGF5aW5nJyk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgbW9kYWwub24oJ21vZGFsY2xvc2VkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaWZyYW1lT2JqZWN0LnBhdXNlVmlkZW8oKTtcclxuICAgIGlmcmFtZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXNQbGF5aW5nJyk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDQtNC70Y8g0L/QtdGA0LXQutC70Y7Rh9Cw0YLQtdC70LXQuSDQutC70LDRgdGB0L7QslxyXG4gKiBAZXhhbXBsZVxyXG4gKiBZb3V0dWJlLmluaXQoKTtcclxuICovXHJcblxyXG5mdW5jdGlvbiBpbml0KCl7XHJcblxyXG4gIE1haW4uSGVscGVycy5hZGRTY3JpcHQoXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpXCIpO1xyXG5cclxuXHJcbiAgLy8gRm9yIGVhY2ggaWZyYW1lIHlvdSBmaW5kLCBhZGQgaXRzIElEIHRvIHRoZSBpZnJhbWVJZHMgYXJyYXlcclxuICBsZXQgaWZyYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIueXQgaWZyYW1lXCIpO1xyXG4gIGlmcmFtZXMuZm9yRWFjaChmdW5jdGlvbihpZnJhbWUpIHtcclxuICAgIGlmcmFtZUlkcy5wdXNoKGlmcmFtZS5pZCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIE9uY2UgdGhlIFlvdVR1YmUgQVBJIGlzIHJlYWR5LCBmb3IgZWFjaCBpZnJhbWVJZCBpbiB5b3VyIGFycmF5LCBjcmVhdGVcclxuICAvLyBhIG5ldyBZVCBwbGF5ZXIgYW5kIGdpdmUgaXQgdGhlIG9uUmVhZHkgZXZlbnRcclxuICB3aW5kb3cub25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZnJhbWVJZHMuZm9yRWFjaChmdW5jdGlvbihpZnJhbWVJZCkge1xyXG4gICAgICB2YXIgcGxheWVyID0gbmV3IFlULlBsYXllcihpZnJhbWVJZCwge1xyXG4gICAgICAgIGV2ZW50czoge1xyXG4gICAgICAgICAgb25SZWFkeTogb25QbGF5ZXJSZWFkeVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy95b3V0dWJlLmpzIiwiLyoqXHJcbiAqIFN0YXRpc3RpY1xyXG4gKiBAbW9kdWxlIFN0YXRpc3RpY1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIHNlbmRHYShjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCkge1xyXG4gIGdhKCdzZW5kJywge1xyXG4gICAgICBoaXRUeXBlOiAnZXZlbnQnLFxyXG4gICAgICBldmVudENhdGVnb3J5OiBjYXRlZ29yeSxcclxuICAgICAgZXZlbnRBY3Rpb246IGFjdGlvbixcclxuICAgICAgZXZlbnRMYWJlbDogbGFiZWxcclxuICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgJCgnLmJ0bi10aWNrZXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIHNlbmRHYSgnZXh0ZXJuYWwnLCAnY2xpY2snLCAnYnV5X3RpY2tldCcpO1xyXG4gIH0pO1xyXG4gICQoJy5saW5rLWxlbnRhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIHNlbmRHYSgnZXh0ZXJuYWwnLCAnY2xpY2snLCAnbGVudGFfbG9nbycpO1xyXG4gIH0pO1xyXG5cclxuICAkKCcjdHJhaWxlcicpLm9uKCdtb2RhbG9wZW4nLCBmdW5jdGlvbigpIHtcclxuICAgIHNlbmRHYSgnaW50ZXJuYWwnLCAnY2xpY2snLCAnd2F0Y2hfdHJhaWxlcicpO1xyXG4gIH0pO1xyXG4gICQoJyN0cmFpbGVyJykub24oJ21vZGFsY2xvc2VkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBzZW5kR2EoJ2ludGVybmFsJywgJ2NsaWNrJywgJ2Nsb3NlX3RyYWlsZXInKTtcclxuICB9KTtcclxuICAkKCcuYnRuLW1hdGVyaWFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICBzZW5kR2EoJ2ludGVybmFsJywgJ2NsaWNrJywgJCh0aGlzKS5jbG9zZXN0KCcuc2NyZWVuJykuZGF0YSgnbWF0ZXJpYWwnKSk7XHJcbiAgfSk7XHJcbiAgJCgnLmZwLXNlY3Rpb24nKS5vbignc2VjdGlvbnNjcm9sbGVkJywgZnVuY3Rpb24oZSwgbGFiZWwpIHtcclxuICAgIHNlbmRHYSgnaW50ZXJuYWwnLCAnc2Nyb2xsJywgbGFiZWwpO1xyXG4gIH0pXHJcblxyXG4gIGlmKCQoJy5sYXlvdXQnKS5oYXNDbGFzcygnbGF5b3V0LS1sZW50YScpKSB7XHJcbiAgICBqUXVlcnkuc2Nyb2xsRGVwdGgoKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgaW5pdCwgc2VuZEdhIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL3N0YXRpc3RpYy5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTs7Ozs7Ozs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBOzs7Ozs7OztBQ3hDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTs7Ozs7Ozs7QUNqUEE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ2xDQTs7Ozs7QUFLQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFDQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7OztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFaQTtBQWtCQTs7Ozs7Ozs7O0FDeENBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFEQTtBQUtBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNoRkE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=