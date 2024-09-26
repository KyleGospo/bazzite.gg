(function($) {

  /* globals jQuery */

  "use strict";

  /**
   * Accesibility | Keyboard Support
   PBL
  */

  var keyboard = {

    keysTriggered: { // multitasking alike
      Tab: false,  Enter: false, ShiftLeft: false, ShiftRight: false, Escape: false,
      ArrowLeft: false, ArrowRight: false, ArrowUp: false, ArrowDown: false
    },

    utils: {
      isSimpleHamburgerStack: !($('body').hasClass('header-simple') && !$('body').hasClass('mobile-side-slide')),
      switchExpanded: (el, state) => $(el).attr('aria-expanded', state),
      isHeaderBuilderEnabled: $('body').hasClass('mfn-header-template'),
    },

    menuLinks: [...$('#menu .menu-item a').not('.menu-toggle').toArray(), $('a.mfn-menu-link').toArray()],
    subheaderLinks: $('#Subheader a').toArray(),
    wooPopup:  $('.mfn-header-login').find('a, input').toArray(),
    contentLinks: [...$('#Content a').toArray(), ...$('#Footer a').toArray()],

    clickListener() {

      jQuery(document).on('keydown', 'a, *[role="link"], input, button', ( e ) => {
        let { originalEvent } = e;
        let { code : keyClicked } = originalEvent;

        if ( keyClicked in this.keysTriggered ) {
          this.keysTriggered[keyClicked] = true;
        }

        setTimeout( _ => this.recognizeGesture(e), 1);
      });

      jQuery(document).on('keyup', 'a, *[role="link"], input, button', ( e ) => {
        let { originalEvent } = e;
        let { code : keyClicked } = originalEvent;

        if ( keyClicked in this.keysTriggered ) {
          this.keysTriggered[keyClicked] = false;
        }

        setTimeout( _ => this.recognizeGesture(e), 1);
      });

      jQuery('#skip-links-menu').one('focus', 'a', function(){
        $('#skip-links-menu').css('top', '0px');
      });
    },

    skipLinks() {
      if( $(':focus').closest('nav').is('#skip-links-menu') ) {
        $('#skip-links-menu').css('top', '0px');
      } else {
        $('#skip-links-menu').css('top', '-200px');
      }
    },

    recognizeGesture(e) {
      let { Tab, ShiftLeft, ShiftRight, ArrowDown, ArrowUp, ArrowLeft, ArrowRight, Enter, Escape } = this.keysTriggered;
      const focusedElement = $(':focus');
      let modalOpened = $('*[aria-expanded=true]:not(#menu):not(.sub-menu)');
      const menuOpened = $('nav#menu').find('*[aria-expanded=true]');
      const domPrefix = $('body').hasClass('side-slide-is-open') ? '.extras-wrapper ' : '.top_bar_right ';
      const isHeaderBuilderEnabled = $('body').hasClass('mfn-header-template');
      const shouldChangeDirection = () => {
        let shouldChange = false;

        if ($('body').hasClass('rtl')) shouldChange = true; // RTL
        if ($('body').hasClass('header-rtl')) shouldChange = true; // Header Right | Ex. Creative Right

        return shouldChange;
      }

      /* CLOSE MODALS WHEN CURSOR IS OUTSIDE OF IT --- FORCE !!! */
      if( $(modalOpened).length && !focusedElement.closest(modalOpened).length) {
          // If Side_slide is opened, then modals should be closed first ALWAYS
          // classList object| it will recog if item is from DOM, not just a trash code from jquery
          const elementToClose = Object.values(modalOpened).filter(
            (modal) => (modal.classList && $(modal).attr('id') !== 'Side_slide')
          )
          modalOpened = !elementToClose.length ? modalOpened : $(elementToClose[0]);

          // WooModal - when outside of login modal, go to first link
          if ( $(modalOpened).hasClass('mfn-header-login') || $(modalOpened).hasClass('woocommerce-MyAccount-navigation') ) {
            $(modalOpened).closest('.mfn-header-login[aria-disabled=false]').find('a').first().focus();
            return;
          }

          // All other modals are using mfn-close-icon class, Side_slide is exception
          if( modalOpened.attr('id') !== 'Side_slide' && modalOpened.attr('aria-expanded') == 'true') {

            if( $(modalOpened).siblings('.mfn-close-icon').length ){
              $(modalOpened).siblings('.mfn-close-icon').trigger('click');
            } else {
              $(modalOpened).find('.mfn-close-icon').trigger('click');
            }
          }

          // HB 2.0 --- do not close if modal of megamenu/sideslide is opened
          if ( !$(modalOpened).is(focusedElement.siblings('.mfn-menu-item-megamenu')) && !$(modalOpened).hasClass('mfn-header-tmpl-menu-sidebar') && isHeaderBuilderEnabled) {
            this.utils.switchExpanded(modalOpened, false);
          }

          switch(true){
            case modalOpened.hasClass('mfn-cart-holder'):
              $(`${domPrefix} #header_cart`).trigger('focus');
              break;
            case modalOpened.attr('id') === 'Side_slide':
              modalOpened.find('.close').trigger('click');
              $(`.responsive-menu-toggle`).trigger('focus');
              break;
          }
      }

      /* CLOSE MENU DROPDOWNS WHEN OUTSIDE OF IT --- AVOID HAMBURGER MENU WITH SIMPLE STYLE OF HEADER  !!! */
      if( $(menuOpened).length && this.utils.isSimpleHamburgerStack ) {
        if ( !focusedElement.closest(menuOpened).length && !menuOpened.siblings().is(focusedElement) ) {
          $(menuOpened).attr('aria-expanded','false').slideUp();
        }
      }

      /* DOUBLE CHECK OF SUBMENUS ARIA-EXPANDED! */
      $('.sub-menu[aria-expanded=true]').each( (index, item) => {
        if ( $(item).css('display') == 'none') {
          this.utils.switchExpanded(item, false);
        }

        //HB 2.0 - get into deeper submenus
        if ( !$(document.activeElement).closest('ul').is($(item)) && !$(document.activeElement).siblings('ul').length && !$(document.activeElement).closest('ul[aria-expanded="true"]').length && isHeaderBuilderEnabled) {
          this.utils.switchExpanded(item, false);
        };
      })

      if(Enter){
        switch( true ){
          // WooModal on X click
          case focusedElement.hasClass('close-login-modal'):
            $('#Wrapper a.toggle-login-modal').trigger('focus').trigger('click');
            this.utils.switchExpanded( $('.mfn-header-login[aria-disabled=false]'), false);
            break;

          // HB 2.0 --- dropdown aria switch
          case focusedElement.hasClass('mfn-header-menu-burger') && isHeaderBuilderEnabled:
            $(focusedElement).trigger('click');
            $(focusedElement).siblings('div').find('ul a').first().focus();

            break;
          case focusedElement.hasClass('mfn-header-menu-toggle') && isHeaderBuilderEnabled:
            const hamburgerMenuDOM = $(focusedElement).closest('.mcb-item-header_burger-inner').find('a.mfn-header-menu-burger');
            hamburgerMenuDOM.trigger('click').focus();
            break;

          //Side slide close by button
          case focusedElement.hasClass('close'):
            this.utils.switchExpanded(modalOpened, false);
            $('.responsive-menu-toggle').trigger('focus');
            break;

          //Submenu side-slide
          case focusedElement.hasClass('menu-toggle') && $('body').hasClass('side-slide-is-open'):
            const submenuSide = focusedElement.siblings('.sub-menu');

            // Arias
            if (submenuSide.attr('aria-expanded') === 'false') {
              submenuSide.attr('aria-expanded', true);
            } else {
              submenuSide.attr('aria-expanded', false);

              // If children has dropdowns, close them
              submenuSide.find('.sub-menu').each((index, item) => {
                $(item).closest('li').removeClass('hover');
                $(item).attr('aria-expanded', false).css('display', 'none');
              })
            }

            // Prevention of opening by TAB
            if (submenuSide.css('display') == 'block') {
              submenuSide.find('a').first().trigger('focus');
            }

            break;
          //Submenu dropdown
          case focusedElement.hasClass('menu-toggle') && !$('body').hasClass('side-slide-is-open'):
            const submenu = focusedElement.siblings('.sub-menu');

            //When hamburger menu with header simple, then break the loop
            if ( !this.utils.isSimpleHamburgerStack ){

              if ( submenu.attr('aria-expanded') == 'true' ) {
                this.utils.switchExpanded(submenu, false);
              } else {
                this.utils.switchExpanded(submenu, true);

                let submenuItem = submenu.find('a').first();
                setTimeout(_ => submenuItem.trigger('focus'), 100);
              }

              break;
            }

            if (submenu.css('display') != 'none') {
              this.utils.switchExpanded(submenu, false);
              submenu.slideUp(0);

              //close deeper arias expanded
              const subarias = submenu.find('*[aria-expanded=true]');
              if (subarias.length) {
                this.utils.switchExpanded(subarias, false);
                subarias.slideUp();
              }

            } else {
              this.utils.switchExpanded(submenu, true);

              let submenuItem = submenu.slideDown(0).find('a').first();
              setTimeout(_ => submenuItem.trigger('focus'), 100);
            }

            break;
          // WooCommerce Header Login
          case focusedElement.hasClass('toggle-login-modal'):
            $('.mfn-header-login[aria-disabled=false]').find('input, a').first().trigger('focus');
            $('.mfn-header-login[aria-disabled=false]').attr('aria-expanded', 'true');
            break;

          // Elements which imitate links
          case focusedElement.attr('role') === 'link':
            if( focusedElement.find('.image_links').length ){ //image
              window.location = focusedElement.find('a').attr('href');
            } else if( focusedElement.find('.title').length ) { //accordion
              focusedElement.find('.title').trigger('click');
            } else if( focusedElement.closest('.mfn-woo-list').length ) {
              focusedElement.trigger('click');
            }
            break;

          //WPML dropdown
          case focusedElement.attr('data-title') === 'wpml':
            const langDropdown = focusedElement.siblings('.wpml-lang-dropdown');

            if ( langDropdown.attr('aria-expanded') == 'false' ) {
              langDropdown.attr('aria-expanded', 'true');
              langDropdown.find('a').first().trigger('focus');
            } else {
              langDropdown.attr('aria-expanded', 'false');
            }
            break;

          //WooCommerce Cart Sidebar
          case focusedElement.hasClass('single_add_to_cart_button'):
            $('.mfn-cart-holder').find('a').first().trigger('focus');
            break;

          //Turn on dropdown or sidecart
          case focusedElement.hasClass('responsive-menu-toggle'):
            //Sideslide --- socials && extras, order of array is important!
            if ( $('body').hasClass('mobile-side-slide') ) {
              this.menuLinks = [
                ...$('#Side_slide').find('a.close').toArray(),
                ...$('.extras-wrapper').find('a').toArray(),
                ...this.menuLinks,
                ...$('#Side_slide .social').find('a').toArray()
              ];

              $(this.menuLinks[0]).trigger('focus');
              focusedElement.trigger('click');
              this.utils.switchExpanded( $('#Side_slide'), true );
            }

            break;

          case focusedElement.hasClass('overlay-menu-toggle'):
            if( $('#overlay-menu ul').attr('aria-expanded') == 'false' ||  $('#overlay-menu ul').attr('aria-expanded') === undefined ){
              this.utils.switchExpanded( $('#overlay-menu ul'), true );

              $('#overlay-menu').find('.menu-item a').first().trigger('focus');
            }else{
              this.utils.switchExpanded($('#overlay-menu ul'), false);

              if( focusedElement.hasClass('close') ) {
                $('.overlay-menu-toggle').trigger('focus');
              }
            }
            break;
          }

      } else if(Tab && (ShiftLeft || ShiftRight) ) {

        //Tabs fix, make noticable for tab, overwrite tabindex from -1 to 0
        $('a.ui-tabs-anchor').attr('tabindex', 0);

        //Skip links, are they triggered?
        this.skipLinks();

      //Sideslide, if get out of the submenu by TAB, remove the hover effect too
        if(!focusedElement.is('.submenu') && !isHeaderBuilderEnabled && $('body').hasClass('side-slide-is-open')){
          const rootElement = focusedElement.closest('li').siblings('.hover');
          rootElement.removeClass('hover');

          rootElement.find('.sub-menu').each((index, item) => {
            $(item).closest('li').removeClass('hover');
          })
        }

        // HB 2.0 - regular dropdown
        if( focusedElement.is('.mfn-menu-link') && $('body').hasClass('mfn-header-template') && isHeaderBuilderEnabled){
            const subContainer = focusedElement.siblings('.mfn-submenu').length ? 'mfn-submenu' : 'mfn-menu-item-megamenu';
            const dropdownButton = focusedElement.siblings(`.${subContainer}`);

            // The mega menu is manged by function to force close modals, regular dropdown (nomegamenu) bypass
            if ( subContainer === 'mfn-submenu' && focusedElement.closest('ul').attr('aria-expanded')) {
              this.utils.switchExpanded($(focusedElement).siblings('.mfn-submenu'), false);
            }

            if (dropdownButton.length) {
              const elChild = $(focusedElement).siblings(`.${subContainer}`);
              this.utils.switchExpanded(elChild, true);
            }
        }

        // HB 2.0 - mega menu inner dropdown
        if(focusedElement.closest('ul').hasClass('mfn-megamenu-menu') && focusedElement.closest('li').hasClass('menu-item-has-children') && isHeaderBuilderEnabled){
          this.utils.switchExpanded($(focusedElement).siblings('.sub-menu'), true);
        }
        if(focusedElement.closest('ul').hasClass('sub-menu') && focusedElement.closest('li').hasClass('menu-item-has-children') && isHeaderBuilderEnabled){
          this.utils.switchExpanded($(focusedElement).siblings('.sub-menu'), true);
        }
      }else if(Tab) {

        //Tabs fix, make noticable for tab, overwrite tabindex from -1 to 0
        $('a.ui-tabs-anchor').attr('tabindex', 0);

        //Skip links, are they triggered?
        this.skipLinks();

        switch( true ) {
          case focusedElement.closest('li').hasClass('wc-block-product-categories-list-item'): // woocommerce widget -- product category dropdowns
            if( !focusedElement.closest('.li-expanded').length ){
              focusedElement.siblings('.cat-expander').trigger('click');
              focusedElement.siblings('ul').find('a').first().trigger('focus');
            }

            focusedElement.closest('li').siblings('.li-expanded').each((index, object) => $(object).find('.cat-expander').trigger('click') );
            break;
          case focusedElement.is('.overlay-menu-toggle', '.focus') && $('#Overlay').css('display') === 'block': //Overlay
            $('.overlay-menu-toggle').trigger('focus');
            break;
          case focusedElement.is( $(this.contentLinks[this.contentLinks.length-1]) ) && !$('body').hasClass('footer-menu-sticky'): //when reached end of page
            //if fixed nav, then first, reach that
            if( $('.fixed-nav').length ) {
              $('.fixed-nav').first().trigger('focus');
            } else {
              $('body a').first().trigger('focus');
            }
            break;
          //Sideslide, if get out of the submenu by TAB, remove the hover effect too
          case !focusedElement.is('.submenu') && !isHeaderBuilderEnabled && $('body').hasClass('side-slide-is-open'):
            const rootElement = focusedElement.closest('li').siblings('.hover');
            rootElement.removeClass('hover');

            rootElement.find('.sub-menu').each((index, item) => {
              $(item).closest('li').removeClass('hover');
            })
            break;
          // HB 2.0 - dropdowns (including mega menu dropdowns), trigger focus
          case focusedElement.is('.mfn-menu-link') && isHeaderBuilderEnabled:
            const subContainer = focusedElement.siblings('.mfn-submenu').length ? 'mfn-submenu' : 'mfn-menu-item-megamenu';
            const dropdownButton = focusedElement.siblings(`.${subContainer}`);

            // Calculate the width + position (left,right etc...)
            const rootMenuItem = $(focusedElement).closest('.mfn-menu-item-has-megamenu').find('a.mfn-menu-link')[0];
            $(rootMenuItem).trigger('mouseenter').trigger('hover').trigger('mouseover');

            // The mega menu is manged by function to force close modals, regular dropdown (nomegamenu) bypass
            if ( subContainer === 'mfn-submenu' && focusedElement.closest('ul').attr('aria-expanded') === 'true') {
              this.utils.switchExpanded($(focusedElement).siblings('.mfn-submenu'), false);
            }

            if (dropdownButton.length) {
              const elChild = $(focusedElement).siblings(`.${subContainer}`);
              this.utils.switchExpanded(elChild, true);
            }

            break;

          // HB 2.0 - mega menu, set active arias only.
          case focusedElement.closest('ul').hasClass('mfn-megamenu-menu') && focusedElement.closest('li').hasClass('menu-item-has-children') && isHeaderBuilderEnabled:
            this.utils.switchExpanded($(focusedElement).siblings('.sub-menu'), true);
            break;
          case focusedElement.closest('ul').hasClass('sub-menu') && focusedElement.closest('li').hasClass('menu-item-has-children') && isHeaderBuilderEnabled:
            this.utils.switchExpanded($(focusedElement).siblings('.sub-menu'), true);
            break;
        }

      } else if ( Escape ) {
        var openedSubmenus = Array.from( $('.sub-menu[aria-expanded=true]') );
        var modals = $('.woocommerce').find('nav[aria-expanded=true]');

        // Mega menu, only for builder items.
         if(focusedElement.closest('div.mfn-menu-item-megamenu') && isHeaderBuilderEnabled){
          let newFocusedEl = focusedElement.closest('div.mfn-menu-item-megamenu');

          this.utils.switchExpanded($(newFocusedEl), false);
          $(newFocusedEl).siblings('a').trigger('focus');
        }else if(focusedElement.closest('.mfn-header-login').length){
          // HB 2.0 - close the woomodal
          $('#Wrapper a.toggle-login-modal').trigger('focus')
          $('body').removeClass('mfn-show-login-modal');
          this.utils.switchExpanded( $('.mfn-header-login[aria-disabled=false]'), false);
        }else if ( $('body').hasClass('side-slide-is-open') && focusedElement.closest('#Side_slide').length) {
          //side slide
          modalOpened.find('.close').trigger('click');

          $('.responsive-menu-toggle').trigger('focus');
        }else if( openedSubmenus.length && isHeaderBuilderEnabled ) {
          // HB 2.0 - menus, dropdown
          if($(focusedElement).closest('.mfn-header-tmpl-menu-sidebar').length){ //sideslide
            $(focusedElement).closest('.mfn-header-tmpl-menu-sidebar').attr('aria-expanded', false);
            $('.mfn-header-menu-toggle').trigger('focus');
          } else { //dropdown
            const mainMenuItem = $(focusedElement).closest('.mfn-header-mainmenu').find('[aria-expanded=true]').first();
            $(mainMenuItem).siblings('a').trigger('focus');
            this.utils.switchExpanded(mainMenuItem, false);
          }

        } else if( openedSubmenus.length && !isHeaderBuilderEnabled ) {
            //menus, dropdown
            var menuItemOpened = $('nav').find('.sub-menu[aria-expanded=true]').siblings('a.menu-toggle');

            openedSubmenus.forEach(submenu => {
              this.utils.switchExpanded(submenu, false);
              $(submenu).slideUp();
            })

            menuItemOpened.trigger('focus');

        } else if( !isHeaderBuilderEnabled && $('.mfn-header-login').find('nav[aria-expanded=true]').length ) {
          //side login
          $('.close-login-modal').trigger('click');
          this.utils.switchExpanded(modals, false);

          $('.myaccount_button').trigger('focus');
        } else if( $('.mfn-cart-holder').attr('aria-expanded') == 'true' ) {
          //side cart
          $('.mfn-cart-holder').find('.close-mfn-cart').trigger('click');
          this.utils.switchExpanded($('.mfn-cart-holder'), false);

          $('#header_cart').trigger('focus');
          return;
        } else if ( $('.responsive-menu-toggle').hasClass('active') ) {
          // responsive menu toggle
          $('.responsive-menu-toggle').trigger('click');
          $('.responsive-menu-toggle').trigger('focus');
        }  else if ( $(focusedElement).closest('ul').hasClass('mfn-megamenu-menu') && isHeaderBuilderEnabled ) {
          $(focusedElement).closest('.mfn-menu-item-megamenu').attr('aria-expanded', false);
          $(focusedElement).closest('.mfn-menu-item-megamenu').closest('li').find('a').focus();
        } else if( $(focusedElement).closest('.mfn-header-tmpl-menu-sidebar') && isHeaderBuilderEnabled ) {
          $(focusedElement).closest('.mfn-header-tmpl-menu-sidebar').attr('aria-expanded', false);
          $('.mfn-header-menu-toggle').trigger('focus');
        }


      } else if ( !shouldChangeDirection() ? ArrowRight : ArrowLeft  ) {

        if(focusedElement.closest('li').find('.menu-toggle').length) {
          const submenu = focusedElement.siblings('.sub-menu');

          if (submenu.css('display') == 'none') {
            this.utils.switchExpanded(submenu, true);

            //open and focus next submenu
            let submenuItem = submenu.slideDown(0).find('a').first();
            setTimeout(_ => submenuItem.trigger('focus'), 100);
          }
        }

      } else if ( !shouldChangeDirection() ? ArrowLeft : ArrowRight ) {

        if(focusedElement.closest('ul[aria-expanded=true]').length) {
          const submenu = focusedElement.closest('.sub-menu');

          //close deeper arias expanded
          const subarias = submenu.find('*[aria-expanded=true]');
          if (subarias.length) {
            this.utils.switchExpanded(subarias, false);
            subarias.slideUp();
          }
        }

      }

    },

    init() {

      if( $('body').hasClass('keyboard-support') ) {

        this.clickListener();
        const submenu = $('.sub-menu');

        /* Instead of using WP Walkers, we can do that using JS, quicker, simpler (KISS PRINCIPLE)  */
        submenu.attr('aria-expanded', 'false');
        $('.menu-toggle, .menu-item a').attr('tabindex', '0');

        /* Attach aria-label with menu item name, DRY */
        if (submenu.siblings('a')) {
          if( this.utils.isHeaderBuilderEnabled ) {
            submenu.siblings('a').each( (index, item) => {
              $(item).attr('aria-label', `${mfn.accessibility.translation.toggleSubmenu} ${$(item).find('.menu-label').text()}`);
            })
          } else {
            submenu.siblings('a.menu-toggle').each( (index, item) => {
              $(item).attr('aria-label', `${mfn.accessibility.translation.toggleSubmenu} ${$(item).siblings('a').text()}`);
            })
          }
        }


        /* These containers are changing for multiple templates, change it by JS (DRY PRINCIPLE) */
        $('#Content').attr('role', 'main');
        $('#Header_wrapper').attr('role', 'banner').attr('aria-label', mfn.accessibility.translation.headerContainer);

        // HB 2.0 Woo Menu
        $('.woocommerce-MyAccount-navigation').attr('role', 'navigation').attr('aria-expanded', 'false');
        $('.mfn-header-login[aria-disabled="true"]').find('a, input, button').each((index, item) => $(item).attr('tabindex', '-1'));

        /* Remove aria-expanded for headers which does not open on menu click (responsive-menu-button) */
        if ( !$('body').is('.header-creative, .header-simple, .header-overlay') ) {
          $('#menu').removeAttr('aria-expanded');
        }
      }

    }

  }

  /**
   * Accesibility | New tab or _blank target links | PBL
   */

  var warningLinks = {

    onLinkAlert(){
      $('a').click(function( e ) {

        const target = $(e.currentTarget);
        if( (target.attr('target') === '_blank' || target.attr('target') === '0' ) ) {
          //stop action
          var answer = confirm ("The link will open in a new tab. Do you want to continue? ");
          if (!answer) {
            e.preventDefault();
          }

        }

      })
    },

    init(){
      if ( $('body').hasClass('warning-links') ) {
        this.onLinkAlert();
      }
    }

  }

  /**
   * $(window).on('load')
   * window.load
   */

  $(window).on('load', function() {

    keyboard.init();

    warningLinks.init();

  });

})(jQuery);
