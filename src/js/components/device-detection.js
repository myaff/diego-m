let breakpoints = {
  sm: 767,
  md: 1023,
  lg: 1280,
  xl: 1600
};

function isPortrait() {
  return ($(window).width() < $(window).height());
}
function isLandscape() {
  return ($(window).width() > $(window).height());
}
function isMobile(){
  return ($(window).width() <= breakpoints.sm);
}
function isTablet(){
  return ($(window).width() > breakpoints.sm && $(window).width() <= breakpoints.md)
}
function isDesktopExt(){
  return ($(window).width() >= breakpoints.md)
}
function isDesktop(){
  return ($(window).width() > breakpoints.md)
}
function isTouch(){
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}
function isMobileVersion(){
  return !!~window.location.href.indexOf("/mobile/");
}

function redirMobile () {
  let hash = window.location.hash;
  let baseUrl = window.location.href.split('/').slice(0,-1).join('/');
  let pageUrl = window.location.href.split('/').splice(-1,1).join('/');
  let finalUrl = baseUrl + '/mobile/' + pageUrl;
  if (hash) {
    finalUrl += hash;
  }
  window.location.href = finalUrl;
};

function redirDesktop () {
  let hash = window.location.hash;
  let baseUrl = window.location.origin;
  let finalUrl = baseUrl;
  if (hash) {
    finalUrl += hash;
  }
  window.location.href = finalUrl;
}

function checkVersion () {
  if ((isMobile() || isTablet()) && !isMobileVersion()) {
    redirMobile();
  }

  if (isDesktop() && isMobileVersion()) {
    redirDesktop();
  }
}

function run(){
  checkVersion();

  $(window).on('resizeend', function() {
    checkVersion();
  });

  if(isTouch()){
    $('html').removeClass('no-touch').addClass('touch');
  } else {
    $('html').removeClass('touch').addClass('no-touch');
  }

}

module.exports = {
  run,
  isTouch,
  isMobile,
  isTablet,
  isDesktop,
  isDesktopExt,
  isMobileVersion,
  isPortrait,
  isLandscape,
  checkVersion
};