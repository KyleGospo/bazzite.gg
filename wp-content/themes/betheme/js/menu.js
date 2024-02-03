/**
 * MuffinMenu
 *
 * Horizontal Multilevel Menu with WP MegaMenu Support
 * 3.0 | Muffin Group
 */

(function($) {

	/* globals jQuery */

  "use strict";

  $.fn.mfnMenu = function(options) {

    var menu = $(this);

    var defaults = {
      addLast: false,
      arrows: false,
      delay: 100,
      hoverClass: 'hover',
      mobileInit: 768,
      responsive: true
    };
    options = $.extend(defaults, options);

    var init = function() {

      // add '.submenu' class

      $('li:has(ul)', menu).addClass('submenu');

      // append mobile toggle button

      $('li:has(ul)', menu).append('<a class="menu-toggle" href="#" role="link" aria-label="'+ mfn.accessibility.translation.toggleSubmenu +'"></a>').on('click', '.menu-toggle', function(e){

        e.preventDefault();

        // FIX | Header Creative dropdown scroll - nicescroll init
        if( $('#Header_creative.dropdown.scroll').length ){
          $('#Header_creative').css('overflow-y','visible').css('overflow-y','hidden');
        }
      });

      // add '.mfn-megamenu-parent' class

      menu.children('li:has( ul.mfn-megamenu )').addClass('mfn-megamenu-parent');

      // add '.last-item' class

      $('.submenu ul li:last-child', menu).addClass('last-item');

      // add '.last' class

      if (options.addLast) {
        $('> li:last-child', menu).addClass('last')
          .prev().addClass('last');
      }

      // appand submenu arrows

      if (options.arrows) {
        $('li ul li:has(ul) > a', menu).append('<i class="menu-arrow icon-right-open"></i>');
      }

    };

    var doMenu = function() {

      if ((window.innerWidth >= options.mobileInit) || (!options.responsive)) {

        // desktop

        $('> li, ul:not(.mfn-megamenu) li', menu).on('mouseenter', function() {

          $(this).stop(true, true).addClass(options.hoverClass);

          $(this).children('ul').stop(true, true).fadeIn(options.delay);


        }).on('mouseleave', function() {

          $(this).stop(true, true).removeClass(options.hoverClass);

          $(this).children('ul').stop(true, true).fadeOut(options.delay);

        });

      } else {

        // mobile

        $('li', menu).off('hover');

        $('li > .menu-toggle', menu).off('click').on('click', function(e) {

          e.preventDefault();

          var el = $(this).closest('li');

          if (el.hasClass(options.hoverClass)) {

            el.removeClass(options.hoverClass)
              .children('ul').stop(true, true).fadeOut(options.delay);

          } else {

            el.addClass(options.hoverClass)
              .children('ul').stop(true, true).fadeIn(options.delay);

          }

        });

      }

    };

    $(window).on('resize', doMenu);

    var __constructor = function() {
      init();
      doMenu();
    };

    __constructor();

  };

})(jQuery);
