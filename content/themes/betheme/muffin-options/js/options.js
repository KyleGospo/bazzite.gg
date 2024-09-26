(function($) {

  /* globals jQuery, ajaxurl, wp */

  "use strict";

  var MfnOptions = (function($) {

    var $options = $('#mfn-options'),

      $menu = $('.mfn-menu', $options),
      $content = $('.mfn-wrapper', $options),
      $subheader = $('.mfn-subheader', $options),
      $modal = $('.mfn-modal', $options),
      $currentModal = false,

      $title = $('.topbar-title .page-title', $options),
      $subtitle = $('.topbar-title .subpage-title', $options),
      $tabs = $('.subheader-tabs', $options),

      $last_tab = $('#last_tab', $options);

    var loading = true, // prevent some functions until window load
      scrollLock = false; // prevent active on scroll after click

    /**
     * Main menu
     */

    var menu = {

      init: function() {

        var last_tab = $last_tab.val();

        if( window.location.hash.replace('#','') ){
          return false;
        }

        if( ! last_tab ){
          last_tab = 'general';
        }

        this.click( $('li[data-id="'+ last_tab +'"] a', $menu) );

      },

      click: function($el) {

        var $li = $el.closest('li'),
          tab = $li.data('id'),
          title, subtitle;

        if( $li.hasClass('active') ){
          return false;
        }

        $menu.find('li').removeClass('active');

        $li.addClass('active');

        if( $li.is('[data-id]') ){

          // second level

          $li.parents('li').addClass('active');

          title = $li.parent().closest('li').children('a').text();
          subtitle = $li.children('a').text();

        } else {

          // first level

          $li.find('li:first').addClass('active');

          tab = $li.find('li:first').data('id');

          title = $li.children('a').text();
          subtitle = $li.find('li:first a').text();

        }

        $('.mfn-card-group', $options).removeClass('active');
        $('.mfn-card-group[data-tab="'+ tab +'"]', $options).addClass('active');

        $last_tab.val( tab );

        $('.mfn-options').attr('class', 'mfn-ui mfn-options mfn-tab-'+tab);

        $title.text( title );
        $subtitle.text( subtitle );

        subheader.init();

        $('html, body').animate({
          scrollTop: 0
        }, 300);

      },

      hash: function( link ){

        var tab, card;

        link = ( typeof link !== 'undefined' ) ?  link : window.location.hash;
        link = link.replace('#','');

        if( ! link ){
          return false;
        }

        tab = link.split('&')[0];
        card = link.split('&')[1];

        this.click( $('li[data-id="'+ tab +'"] a', $menu) );

        if( card ){
          subheader.click( $('li[data-card-id="'+ card +'"] a', $subheader) );
        }

      }

    };

    /**
     * Subheader
     */

    var subheader = {

      startY: 0,
      topY: 0,
      bodyY: 0,
      width: 0,
      headerH: 0,
      dashboardMenuH: 0,
      $placeholder: $('.mfn-subheader-placeholder', $content),

      init: function(){

        var $tab = $('.mfn-card-group.active', $options);

        var link = $tab.data('tab');

        if( ! link ){
          return false;
        }

        $tabs.empty();

        $('.mfn-card', $tab).each(function( index ){

          var title = $(this).find('.card-title').text(),
            id = $(this).data('card'),
            attr = $(this).data('attr'),
            cssClass = '';

          if( ! index ){
            cssClass = 'active';
          }

          if( attr ){
            attr = ' data-attr="'+ attr +'"' ;
          } else {
            attr = '';
          }

          $tabs.append( '<li class="'+ cssClass +'" data-card-id="'+ id +'"'+ attr +'><a href="#'+ link +'&'+ id +'">'+ title +'</a></li>' );

        });

        window.location.hash = '#'+ link;

        this.set();

      },

      click: function($el){

        var $li = $el.closest('li');

        var id = $li.data('card-id'),
          adminH = $('#wpadminbar').height();

        $li.addClass('active').siblings('li').removeClass('active');

        this.setScrollLock();

        $('html, body').animate({
          scrollTop: $('.mfn-card-group.active .mfn-card[data-card="'+ id +'"]').offset().top - ( adminH + this.headerH + 20 )
        }, 300);

      },

      set: function(){

        this.topY = $content.offset().top;
        this.dashboardMenuH = $('.mfn-dashboard-menu').height() || 0;
        this.bodyY = $('#wpbody').offset().top + this.dashboardMenuH;

        this.width = $content.innerWidth();
        this.headerH = $subheader.height();

        this.startY = this.topY + $('.mfn-topbar', $content).height();

        // add dashboard sticky menu height if window height > 800
        if( window.innerHeight > 800 ){
          this.startY -= this.dashboardMenuH
        }

        this.$placeholder.height( $subheader.height() );

      },

      setScrollLock: function(){

        scrollLock = true;

        setTimeout(function(){
          scrollLock = false;
        }, 300);

      },

      sticky: function(){

        var windowY = $(window).scrollTop();

        if( windowY >= this.startY ){

          this.$placeholder.show(0);
          $subheader.addClass('sticky').css({
            position: 'fixed',
            top: this.bodyY,
            width: this.width
          });

        } else {

          this.$placeholder.hide(0);
          $subheader.removeClass('sticky').css({
            position: 'static',
            top: 0,
            width: 'unset'
          });

        }

      },

      scrollActive: function(){

        if( scrollLock ){
          return false;
        }

        var $tab = $('.mfn-card-group.active', $options);

        var first = false;

        $('.mfn-card:visible', $tab).each(function() {

          var windowY = $(window).scrollTop();
          var cardY = $(this).offset().top + $(this).height();

          cardY = cardY - subheader.bodyY - subheader.headerH;

          if( first ){
            return false;
          }

          if ( cardY > windowY ) {
            first = $(this).data('card');
          }

        });

        if ( first ) {

          $tabs.find('li[data-card-id="'+ first +'"]').addClass('active')
            .siblings('li').removeClass('active');

        }

      }

    };

    /**
     * Mobile
     */

    var mobile = {

      // mobile.menu()

      menu: function(){

        var $overlay = $('.mfn-overlay', $options);

        if( $menu.hasClass('show') ){

          $overlay.fadeOut(300);

        } else {

          $overlay.fadeIn(300);
          $menu.scrollTop(0);

        }

        $menu.toggleClass('show');
        $('body').toggleClass('mfn-modal-open');

      }

    };

    /**
     * Responsive
     */

    var responsive = {

      // responsive.switch()

      switch: function( $el ){

        var device = $el.data('device');

        $content.attr('data-device', device);

      },

      // responsive.enableFonts()

      enableFonts: function( $el ){

        var val = $el.val();

        console.log(val);

        if( val == 1 ){
          $content.addClass('auto-font-size');
        } else {
          $content.removeClass('auto-font-size');
        }

      },

      // responsive.checkFonts()

      checkFonts: function(){

        var val = $('#font-size-responsive').find('input:checked').val();

        if( val == 1 ){
          $content.addClass('auto-font-size');
        } else {
          $content.removeClass('auto-font-size');
        }

      }

    };

    /**
     * Backup & Reset
     */

    var backup = {

      export: function(){

        $( '.backup-export-textarea', $content ).toggle();
        $( '.backup-export-input', $content ).hide();

      },

      exportLink: function(){

        $( '.backup-export-input', $content ).toggle();
        $( '.backup-export-textarea', $content ).hide();

      },

      import: function(){

        $( '.backup-import-textarea', $content ).toggle()
          .find('textarea').val('');
        $( '.backup-import-input', $content ).hide();

      },

      importLink: function(){

        $( '.backup-import-input', $content ).toggle()
          .find('.mfn-form-input').val('');
        $( '.backup-import-textarea', $content ).hide();

      },

      resetPre: function(){

        $( '.backup-reset-step.step-1', $content ).hide().next().show();

      },

      reset: function( $el ){

        if ( $( '.backup-reset-security-code', $content ).val() != 'r3s3t' ) {
          alert( 'Please insert correct security code: r3s3t' );
          return false;
        }

        if ( confirm( "Are you sure?\n\nAll custom values across your entire Theme Options panel will be reset" ) ) {
          $el.val( 'Resetting...' );
          return true;
        } else {
          return false;
        }

      }

    };

    /**
     * Modal, icon select etc
     */

    var modal = {

      // modal.open()

      open: function( $senderModal ){

        $currentModal = $senderModal;

        $currentModal.addClass('show');

        $('body').addClass('mfn-modal-open');

      },

      // modal.close()

      close: function(){

        if( ! $currentModal ){
          return false;
        }

        $currentModal.removeClass('show');

        $('body').removeClass('mfn-modal-open');

        $currentModal = false;

      }

    };

    /**
     * Performance
     * Uses 'perf' name because 'preformance' is reserved in JS
     */

    var perf = {

      // perf.enable()

      enable: function( $el ){

        if ( confirm( "Apply recommended settings?" ) ) {

          enableBeforeUnload();

          var button_text = $el.text();

          $el.addClass('loading');

          // change options

          $('#google-font-mode .form-control li:eq(1) a').trigger('click');

          $('#lazy-load .form-control li:eq(1) a').trigger('click');
          $('#srcset-limit .form-control li:eq(1) a').trigger('click');

          $('#performance-assets-disable .form-control li:eq(0).active').trigger('click');
          $('#performance-assets-disable .form-control li:eq(1).active').trigger('click');
          $('#performance-assets-disable .form-control li:eq(2):not(.active)').trigger('click');
          $('#performance-wp-disable .form-control li:not(.active)').trigger('click');

          $('#jquery-location .form-control li:eq(1) a').trigger('click');
          $('#css-location .form-control li:eq(0) a').trigger('click');
          $('#local-styles-location .form-control li:eq(1) a').trigger('click');

          $('#minify-css .form-control li:eq(1) a').trigger('click');
          $('#minify-js .form-control li:eq(1) a').trigger('click');

          $('#static-css .form-control li:eq(1) a').trigger('click');
          $('#hold-cache .form-control li:eq(0) a').trigger('click');

          // trigger ajax actions

          setTimeout(function(){

            $('#google-font-mode-regenerate .mfn-btn').attr('data-confirm',1).trigger('click');

          },100);

          // button

          setTimeout(function(){

            $el.removeClass('loading');
            $('.btn-wrapper', $el).text('Downloading Google Fonts...');

            setTimeout(function(){
              $el.addClass('loading');

              setTimeout(function(){
                $el.removeClass('loading');
                $('.btn-wrapper', $el).text('All done');

                setTimeout(function(){
                  $('.btn-wrapper', $el).text(button_text);
                },2000);

              },2000);

            },2000);

          },2000);

        } else {
          return false;
        }

      },

      // perf.disable()

      disable: function( $el ){

        if ( confirm( "Disable all performance settings?" ) ) {

          enableBeforeUnload();

          var button_text = $el.text();

          $el.addClass('loading');

          // change options

          $('#google-font-mode .form-control li:eq(0) a').trigger('click');

          $('#lazy-load .form-control li:eq(0) a').trigger('click');
          $('#srcset-limit .form-control li:eq(0) a').trigger('click');

          $('#performance-assets-disable .form-control li.active').trigger('click');
          $('#performance-wp-disable .form-control li.active').trigger('click');

          $('#jquery-location .form-control li:eq(0) a').trigger('click');
          $('#css-location .form-control li:eq(0) a').trigger('click');
          $('#local-styles-location .form-control li:eq(0) a').trigger('click');

          $('#minify-css .form-control li:eq(0) a').trigger('click');
          $('#minify-js .form-control li:eq(0) a').trigger('click');

          $('#static-css .form-control li:eq(0) a').trigger('click');
          $('#hold-cache .form-control li:eq(0) a').trigger('click');

          // button

          setTimeout(function(){

            $el.removeClass('loading');
            $('.btn-wrapper', $el).text('All done');

            setTimeout(function(){
              $('.btn-wrapper', $el).text(button_text);
            },2000);

          },1000);

        } else {
          return false;
        }

      }

    };

    /**
     * Custom icons
     */

    var icons = {

      // icons.add()

      add: function(){

        var number = $('.mfn-card-group[data-tab="social"] .mfn-card[data-card^="custom"]').length + 1;

        // count

        $('#custom-icon-count input').val( number - 1 );

        // card

        var $card = $('.mfn-card-group[data-tab="social"] .mfn-card[data-card="custom"]:first'),
          $clone = $card.clone();

        icons.number.card($clone, number);

        $('.mfn-card[data-card="new-icon"]').before($clone);

        // sorter

        var $sortClone = $('#social-link li[data-key="custom"]').clone();

        icons.number.sorter($sortClone, number);

        $('#social-link .social-wrapper').append($sortClone);
        $('#social-link .social-order').val(function(i,val){
          return val + ',custom-' + number;
        });

      },

      // icons.number

      number: {

        // icons.number.card()

        card: function( $el, number ){

          $el.attr('data-card', function(i,val){
            return val + '-' + number;
          });

          $el.find('.card-title').html(function(i,val){
            return val + ' ' + number;
          });

          $el.find('input').each(function(){
            $(this).attr('name', function(i,val){
              return val.replace( ']', '-'+ number +']' );
            }).val('');
          });

        },

        // icons.number.sorter()

        sorter: function( $el, number ){

          $el.attr('data-key',function(i,val){
            return val + '-' + number;
          });

          $el.find('.label').html(function(i,val){
            return val + ' ' + number;
          });

          $el.find('.label i').attr('class','fas fa-question');

        },

      },



    };

    /**
     * Cards hash navigation
     */

    var goToCard = function( el, e ){

      var locationURL = location.href.replace(/\/#.*|#.*/, ''),
        thisURL = el.href.replace(/\/#.*|#.*/, ''),
        hash = el.hash;

      if ( locationURL == thisURL ) {
        e.preventDefault();
      } else {
        return false;
      }

      menu.hash( hash );

    };

    /**
     * Shop | Custom Attributes
     * WooCommerce: Product > Attributes
     */

    var mfnattributes = {

      // mfnattributes.run()

      run: function() {
        if($('.mfn_tax_field_color').length){
          $('.mfn_tax_field_color').wpColorPicker();
        }

        if($('.mfn-tax-image').length){

          var frame,
            metaBox = $('.mfn-tax-image'),
            addImgLink = metaBox.find('.upload-custom-img'),
            delImgLink = metaBox.find( '.delete-custom-img'),
            imgContainer = metaBox.find( '.mfn-custom-img-container'),
            imgIdInput = metaBox.find( '#mfn_tax_field' ),
            placeholder = metaBox.find( '.mfn-custom-img-container img').attr('data-src');

          addImgLink.on( 'click', function( event ){
            event.preventDefault();

            if ( frame ) {
              frame.open();
              return;
            }

            frame = wp.media({
              title: 'Select or Upload Media Of Your Chosen Persuasion',
              button: {
                text: 'Use this media'
              },
              multiple: false
            });

            frame.on( 'select', function() {
              var attachment = frame.state().get('selection').first().toJSON();
              imgContainer.find('img').attr('src', attachment.url);
              imgIdInput.val( attachment.id );
              //addImgLink.addClass( 'hidden' );
              delImgLink.removeClass( 'hidden' );
            });
            frame.open();
          });

          delImgLink.on( 'click', function( event ){
            event.preventDefault();
            imgContainer.find('img').attr('src', placeholder);
            //addImgLink.removeClass( 'hidden' );
            delImgLink.addClass( 'hidden' );
            imgIdInput.val( "" );

          });
        }
      }
    };

    /**
     * window.onbeforeunload
     * Warn user before leaving web page with unsaved changes
     */

    var enableBeforeUnload = function() {
      window.onbeforeunload = function(e) {
        return 'The changes you made will be lost if you navigate away from this page';
      };
    };

    /**
     * Survey
     * WordPress dashboard and Betheme dashboard
     */

    var survey = function(){

      $('.mfn-survey').on( 'click', '.close', function(e){
        e.preventDefault();

        var $el = $(this);

        $.ajax({
          url: ajaxurl,
          data: {
            action: 'mfn_survey',
          },
          success: function(response){
            // console.log(response);
          },
          complete: function(){
            $el.closest('.mfn-survey').hide();
          }
        });

      });

    };

    /**
     * Bind on load
     */

    var bindOnLoad = function() {

      // onbeforeunload

      setTimeout(function(){
        $options.on( 'change', '.form-control input, .form-control select, .form-control textarea', function(){
          enableBeforeUnload();
        });
      },100);

    };

    /**
     * Bind
     */

    var bind = function() {

      // click

      // main menu

      $menu.on( 'click', 'a', function(e){
        e.preventDefault();
        menu.click( $(this) );
      });

      // subheader tabs

      $tabs.on( 'click', 'a', function(e){
        subheader.click( $(this) );
      });

      // link in description to another tab

      $( '.mfn-card-group', $options ).on( 'click', 'a', function(e){
        goToCard( this, e );
      });

      // mobile menu

      $( '.responsive-menu, .mfn-overlay', $options ).on( 'click', function(e){
        e.preventDefault();
        mobile.menu();
      });

      // responsive

      $( '.responsive-switcher li', $options ).on( 'click', function(e){
        responsive.switch($(this));
      });

      $( '#font-size-responsive input', $options ).on( 'change', function(){
        responsive.enableFonts($(this));
      });

      // backup

      $( '.backup-export-show-textarea', $content ).on( 'click', function(e){
        e.preventDefault();
        backup.export();
      });

      $( '.backup-export-show-input', $content ).on( 'click', function(e){
        e.preventDefault();
        backup.exportLink();
      });

      $( '.backup-import-show-textarea', $content ).on( 'click', function(e){
        e.preventDefault();
        backup.import();
      });

      $( '.backup-import-show-input', $content ).on( 'click', function(e){
        e.preventDefault();
        backup.importLink();
      });

      $( '.backup-reset-pre-confirm', $content ).on( 'click', function(e){
        e.preventDefault();
        backup.resetPre();
      });

      $( '.backup-reset-confirm', $content ).on( 'click', function(e){
        return backup.reset( $(this) );
      });

      // performance

      $( '.performance-apply-enable', $content ).on( 'click', function(e){
        e.preventDefault();
        perf.enable( $(this) ); // performance name is reverved
      });

      $( '.performance-apply-disable', $content ).on( 'click', function(e){
        e.preventDefault();
        perf.disable( $(this) ); // performance name is reverved
      });

      // custom icons

      $( '.custom-icon-add', $content ).on( 'click', function(e){
        e.preventDefault();
        icons.add( $(this) );
      });

      // modal close

      $modal.on( 'click', '.btn-modal-close', function(e) {
        e.preventDefault();
        modal.close();
      });

      $modal.on( 'click', function(e) {
        if ( $(e.target).hasClass('mfn-modal') ) {
          modal.close();
        }
      });

      $( 'body' ).on( 'keydown', function(event) {
        if ( 27 == event.keyCode ) {
          modal.close();
        }
      });

      // external modal

      $(document).on('mfn:modal:open', function( $this, el ){
        modal.open( $(el) );
      });

      $(document).on('mfn:modal:close', function(){
        modal.close();
      });

      // disable onbeforeunload

      $('form').on('submit', function() {
        window.onbeforeunload = null;
      });

      // window.scroll

      $(window).on('scroll', function() {

        subheader.sticky();
        subheader.scrollActive();

      });

      // window resize

      $(window).on('debouncedresize', function() {

        subheader.set();
        subheader.sticky();

      });

    };

    /**
     * Conditions
     * mfnoptsinputs()
     */

    var mfnoptsinputs = {

      start: function() {
        $('#mfn-options .activeif').each(function() {
          if( !$('#mfn-options form #'+$(this).attr('data-id')+'.watchChanges').length ){
            $('#mfn-options form #'+$(this).attr('data-id')).addClass('watchChanges');
          }
          $(this).hide();
        });
        mfnoptsinputs.startValues();
        mfnoptsinputs.watchChanges();
      },

      startValues: function() {
        $('#mfn-options form .watchChanges').each(function() {
          var id = $(this).attr('id');
          var val;
          if( $(this).find('.segmented-options, .visual-options').length ){
            val = $(this).find('input:checked').val();
          }else{
            val = $(this).find('input, select, textarea').val();
          }
          mfnoptsinputs.getField(id, val);
        });
      },

      watchChanges: function() {
        $('#mfn-options form .watchChanges').each(function() {
          var id = $(this).attr('id');
          if( $(this).find('.segmented-options').length ){
            $(this).on('click', '.segmented-options li', function() {
              var val = $(this).find('input').val();
              mfnoptsinputs.getField(id, val);
            });
          }else{
            $(this).on('change', 'input, select, textarea', function() {
              var val = $(this).val();
              mfnoptsinputs.getField(id, val);
            });
          }
        });
      },

      getField: function(id, val){
        $('#mfn-options form .activeif-'+id).each(function() {
          var $formrow = $(this);
          var opt = $formrow.attr('data-opt');
          var optval = $formrow.attr('data-val');
          mfnoptsinputs.showhidefields($formrow, opt, optval, val);
        });
      },

      showhidefields: function($formrow, opt, optval, val){
        if( opt == 'is' && ( val == optval ) ){
          $formrow.show();
          if( $formrow.hasClass('mfn-card') ){ mfnoptsinputs.showhidetab( $formrow.attr('data-card'), 'list-item' ); }
        }else if( opt == 'isnt' && (val != optval ) ){
          $formrow.show();
          if( $formrow.hasClass('mfn-card') ){ mfnoptsinputs.showhidetab( $formrow.attr('data-card'), 'list-item' ); }
        }else{
          $formrow.hide();
          if( $formrow.hasClass('mfn-card') ){ mfnoptsinputs.showhidetab( $formrow.attr('data-card'), 'none' ); }
        }
      },

      showhidetab: function( tab, style ){
        // if( $('#mfn-options .subheader-tabs li[data-card-id="'+tab+'"]').length ){
          var styleid = tab+'-style';
          if( $('style#'+styleid).length ){ $('style#'+styleid).remove(); }
          $('body').append('<style id="'+styleid+'">#mfn-options .subheader-tabs li[data-card-id="'+tab+'"] { display: '+style+' }</style>');
        // }
      }

    };

    /**
     * Inlimited custom fonts
     * mfnNewFont()
     */

    var mfnNewFont = {

      el: $('.mfn_new_font a'),

      hiddenInput: $('#font-custom-fields input'),

      getCardsAmount: () => $('.mfn-card-group[data-tab="font-custom"]').children().length - 1,

      getDOMContent: () => $('.mfn-card[data-card="font-1"]').clone(),

      getTabContent: () => $('.subheader-tabs li[data-card-id="font-1"]').clone(),

      assignProperNumber: function(clonedEl, skip = 0) {
        //change number in new card + in hidden input
        let newCardNumber = this.getCardsAmount() - skip ;

        //HIDDEN INPUT
        this.hiddenInput.attr('value', newCardNumber - 2); //it must be always - 2, we have two first basic custom fonts fields

        //CARD
        let htmlToPrepare = clonedEl[0].outerHTML;
        htmlToPrepare = htmlToPrepare.replaceAll('font-1', `font-${newCardNumber}`);
        htmlToPrepare = htmlToPrepare.replaceAll('Font 1', `Font ${newCardNumber}`);
        htmlToPrepare = htmlToPrepare.replaceAll('font-custom', `font-custom${newCardNumber}`);

        return htmlToPrepare;
      },

      cleanInputs: function(clonedEl) {
        let inputs = $(clonedEl).find('input');
        inputs.each(function(){
          $(this).attr('value', '');
        })

        return clonedEl;
      },

      appendTab: function(){
        const preparedElement = this.assignProperNumber( this.getTabContent() , 1);

        $('.subheader-tabs li[data-card-id="create-font"]').before( preparedElement );
      },

      appendCard: function() {
        const preparedElement = this.assignProperNumber( this.cleanInputs( this.getDOMContent() ), 0 );

        $('.mfn_new_font').before( preparedElement );
      },

      watcher: function() {
        $(this.el).on('click', () => {
          this.appendCard();
          this.appendTab();
        })
      },

      init: function() {
        this.watcher();
      }
    }

    /**
     *
     * Regenerate thumbnails
     *
     */

    var regenerateThumbnails = {

      init: function() {

        $(document).on('click', '.mfn-regenerate-thumbnails', function(e) {
          e.preventDefault();
          var $button = $(this);
          if( $button.hasClass('loading') ) return;

          $button.addClass('loading').text('Processing 0%');

          regenerateThumbnails.process($button);

        });

      },

      process: function($button) {

        var $statusupdater = setInterval( function() {
          ajaxProgress('regenerate_thumbnails');
        }, 10000);

        $.ajax({
          url: ajaxurl,
          data: {
            'action': 'mfn_regenerate_thumbnails',
            'mfn-builder-nonce': $button.attr('data-nonce'),
          },
          // dataType: 'JSON',
          type: 'POST',
          statusCode: {
            524: function() {
              console.log('A timeout occurred. Trying again.');
              regenerateThumbnails.process($button);
            },
            500: function() {
              console.log('Error');
              regenerateThumbnails.process($button);
            }
          }
        }).done(function(response) {
          $('.mfn-regenerate-thumbnails').text('All done').removeClass('loading');
          clearInterval($statusupdater);
        });

      },

    }

    /**
     * Progress ajax check
     */

    function ajaxProgress(type){

      $.ajax({
        url: ajaxurl,
        data: {
          'action': 'mfn_ajax_progress',
          'type': type,
          //'mfn-setup-nonce': $('input[name="mfn-setup-nonce"]', $importer).val()
        },
        // dataType: 'JSON',
        type: 'POST',
      }).done(function(response) {
        // regenerate thumbnails
        if( type == 'regenerate_thumbnails' && $('.mfn-regenerate-thumbnails').hasClass('loading') ){
          var percent = (parseInt( response.current ) / parseInt( response.total ))*100;
          if(isNaN(percent)){
            percent = 1;
          }
          $('.mfn-regenerate-thumbnails').text( 'Processing '+ Math.round(percent)+'%' );
        }
      });

    }

    /**
     * Ready
     * document.ready
     */

    var ready = function() {

      $(document).on('click', '.mfn-templates-doesnt-exists', function(e) {
        e.preventDefault();
        modal.open($('.mfn-modal.mfn-modal-templates-disabled'));
      });

      $(document).on('click', '.mfn-templates-doesnt-exists-link', function(e) {
        e.preventDefault();
        window.location.href = $(this).attr('href');
        location.reload();
      });

      survey();
      mfnattributes.run();
      regenerateThumbnails.init();

      if( ! $('#mfn-options').length ){
        return false;
      }

      menu.init();
      mfnNewFont.init();
      responsive.checkFonts();

      bind();

    };

    /**
     * Load
     * window.load
     */

    var load = function() {

      if( ! $('#mfn-options').length ){
        return false;
      }

      loading = false;
      $options.removeClass('loading');
      menu.hash();

      mfnoptsinputs.start();

      $(window).trigger('resize');

      bindOnLoad();

    };

    /**
     * Return
     */

    return {
      ready: ready,
      load: load
    };

  })(jQuery);

  /**
   * $(document).ready
   */

  $(function() {

    MfnOptions.ready();

    /* visual builder */

    /**
     * Template choose on create
     * templateCreate()
     */

    var templateCreate = {
      init: function() {
        $('.mfn-modal.modal-template-type .input-template-type-name').focus();
        $('.mfn-modal.modal-template-type .btn-save-template-type').on('click', function(e) {
          e.preventDefault();
          var $btn = $(this),
              $tmpl = $('.mfn-modal.modal-template-type .select-template-type'),
              $name = $('.mfn-modal.modal-template-type .input-template-type-name'),
              slug = $(this).attr('data-builder'),
              id = $('input#post_ID').val();

          $tmpl.removeClass('error');
          $name.removeClass('error');

          if(!$btn.hasClass('loading') && $tmpl.val().length && $name.val().length ){
            $btn.addClass('loading');
            $.ajax({
              url: ajaxurl,
              data: {
                'mfn-builder-nonce': $('input[name="mfn-builder-nonce"]').val(),
                action: 'mfncreatetemplate',
                tmpl: $tmpl.val(),
                name: $name.val(),
                id: id,
              },
              type: 'POST',
              success: function(response){
                window.history.pushState("data", "Templates", 'edit.php?post_type=template');
                window.location.href = 'post.php?post='+id+'&action='+slug+'-live-builder';
              }
            });
          }else{
            if( !$tmpl.val().length ) $tmpl.addClass('error');
            if( !$name.val().length ) $name.addClass('error');
          }

        });
      }
    }

    if( $('.mfn-modal.modal-template-type .btn-save-template-type').length ) templateCreate.init();

    if( $('body').hasClass('post-new-php') ){

      $('.mfn-switch-live-editor').on('click', function(e) {
        e.preventDefault();

        var $btn = $(this);

        var tmpl_type = '';

        if( $('.mfn-ui .mfn-form .mfn_template_type .mfn-field-value').length ){
          tmpl_type = $('.mfn-ui .mfn-form .mfn_template_type .mfn-field-value').val();
        }

        if(!$btn.hasClass('loading')){
          $btn.addClass('loading');
          $.ajax({
            url: ajaxurl,
            data: {
              'mfn-builder-nonce': $('input[name="mfn-builder-nonce"]').val(),
              action: 'mfnvbsavedraft',
              posttype: $('input#post_type').val(),
              id: $('input#post_ID').val(),
              tmpl: tmpl_type
            },
            type: 'POST',
            success: function(response){
              window.history.pushState("data", "Edit Page", 'post.php?post='+$('input#post_ID').val()+'&action=edit');
              window.location.href = $btn.attr('href');
            }
          });
        }

      });

    }

    /* END visual builder */

  });

  /**
   * $(window).load
   */

  $(window).on('load', function(){
    MfnOptions.load();
  });

})(jQuery);
