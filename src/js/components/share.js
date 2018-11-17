function getIcon(el) {
  let icon = '';
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
  $('#share .ya-share2__item').each(function(){
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
      onready: function() {
        fillIcons();
      }
    }
  });
}
module.exports = {init};