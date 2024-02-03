(function($) {

  /* globals jQuery, mfnSetup, ajaxurl, lozad */

  "use strict";

  var MfnDashboard = (function($) {

    var $body = $('body'),
      $dashboard = $('.mfn-dashboard'),
      $ui = $('.mfn-ui');

    /**
      * Menu
      */

    var menu = {

      // menu.active

      active: function(){

        var $menu = $('.mfn-dashboard-menu', $ui);

        var current = $ui.attr('data-page');

        if( ! current ){
          return;
        }

        $menu.find('li[data-page="'+ current +'"]').addClass('active')
          .parents('li').addClass('active');

      }

    };

    /**
      * Dashboard UI
      */

    var dashboardUI = {

      // dashboardUI.change()

      change: function( $el ) {

        var newScheme = 'dark';

        if( $body.hasClass('mfn-ui-dark') ){
          newScheme = 'light';
          $body.addClass('mfn-ui-light')
            .removeClass('mfn-ui-dark');
        } else {
          $body.addClass('mfn-ui-dark')
            .removeClass('mfn-ui-light');
        }

        // $el.addClass('loading');

        // save options

        $.ajax( ajaxurl, {

          type : "POST",
          data : {
            'mfn-builder-nonce': $('input[name="mfn-builder-nonce"]').val(),
            action: 'mfn_builder_settings',
            option: 'dashboard-ui',
            value: newScheme,
          }

        }).always(function(response){

          $el.removeClass('loading');

        });

      }

    };

    /**
     * Registration
     */

    var registration = {

      // registration.register()

      register: function( $form ){

        $('#register').addClass('loading');

        $.ajax({
          url: ajaxurl,
          data: $form.serialize(),
          dataType: 'JSON',
          type: 'POST',

        }).done(function(response){

          if( response.status ){

            $form.removeClass('license-error');
            $('.form-message', $form).html('');

            window.location.reload(true);

          } else {

            $form.addClass('license-error');
            $('.form-message', $form).html(response.info);

            $('#register').removeClass('loading');

          }

        })
        .always(function() {

        });

      },

      // registration.deregister()

      deregister: function( $form ){

        $('#deregister').addClass('loading');

        $.ajax({
          url: ajaxurl,
          data : {
            'mfn-builder-nonce': $('input[name="mfn-builder-nonce"]').val(),
            action: 'mfn_setup_deregister',
          },
          dataType: 'JSON',
          type: 'POST',

        }).done(function(response){

          if( response.status ){
            window.location.reload(true);
          }

        });

      },

      // registration.newLicense()

      newLicense: function( $el ){

        $el.toggleClass('active');
        $('.toggle-content', $el).slideToggle();

      },

    };

    /**
     * Modal
     */

    var modal = {

      // modal.open()

      open: function(){
        $('.modal-data-collection', $dashboard).addClass('show');
      },

      // modal.close()

      close: function(){
        $('.modal-data-collection', $dashboard).removeClass('show');
      },

    };

    /**
     * Slider
     */

    var slider = {

      // slider.promo()

      promo: function(){

        var $slider = $('.slider-promo', $dashboard);

        if( ! $slider.length ){
          return;
        }

        $slider.slick({
          arrows: false,
          dots: true,
          autoplay: true,
          autoplaySpeed: 5000,
        });

      },

    };

    /**
     * Plugin
     */

    var plugin = {

      // plugin.update()

      update: function( $el ){

        var nonce = $('input[name="mfn-tgmpa-nonce-update"]', $dashboard).val(),
          page = $el.data('page') || '',
          plugin = $el.data('plugin') || '',
          path = $el.data('path') || '';

        if( ! plugin ){
          return;
        }

        $el.addClass('loading');

        return $.ajax({
          url: ajaxurl,
          data: {
            'action': 'mfn_setup_plugin_install',
            'page': page,
            'plugin': plugin,
            'path': path,
            'tgmpa-update': 'update-plugin',
            'tgmpa-nonce': nonce,
          },
          type: 'GET',

        }).done(function(response){

          if( response.indexOf('contains no files') > 0 ){

            $el.removeClass('loading');
            alert('Invalid license code. Please make sure that your purchase code is used only on this domain. You can check it at: api.muffingroup.com/licenses');

          } else {

            $el.removeClass('loading mfn-btn-blue').addClass('disabled')
              .children('span').text('Active');

          }

        });

      },

      // plugin.install()

      install: function( $el ){

        var nonce = $('input[name="mfn-tgmpa-nonce-install"]', $dashboard).val(),
          page = $el.data('page') || '',
          plugin = $el.data('plugin') || '';

        if( ! plugin ){
          return;
        }

        $el.addClass('loading');

        return $.ajax({
          url: ajaxurl,
          data: {
            'action': 'mfn_setup_plugin_install',
            'page': page,
            'plugin': plugin,
            'tgmpa-install': 'install-plugin',
            'tgmpa-nonce': nonce,
          },
          type: 'GET',

        }).done(function(response){

          var closeTag = "</p>\n"; // FIX: buffer error, plugin is installed but response is incomplete
          var lastTag = response.substr(response.length - 5);

          if( response.indexOf('wp-content') > 0 ){

            // plugin folder exists

            $el.removeClass('loading');
            alert('Plugin folder already exists. Please remove wp-content/plugins/'+ plugin +' folder.' );

          } else if( response.indexOf('PCLZIP_ERR_BAD_FORMAT') > 0 ){

            // ZIP extansion

            $el.removeClass('loading');
            alert('PCLZIP_ERR_BAD_FORMAT. ZipArchive is required for pre-built websites and plugins installation. Please contact your hosting provider.' );

          } else if( response.indexOf('plugins.php?action=activate') > 0 || closeTag === lastTag ){

            // OK | activate button exists or buffer error but after successful installation

            $el.removeClass('loading mfn-btn-blue').addClass('disabled')
              .children('span').text('Active');

          } else {

            // other errors, most probably package does not exists because of license violation

            $el.removeClass('loading');
            alert('Invalid license code. Please make sure that your purchase code is used only on this domain. You can check it at: api.muffingroup.com/licenses');

          }

        });

      },

      // plugin.activate()

      activate: function( $el ){

        var plugin = $el.data('plugin'),
          path = $el.data('path');

        $el.addClass('loading');

        return $.ajax({
          url: ajaxurl,
          data: {
            'action': 'mfn_setup_plugin_activate',
            'mfn-setup-nonce': $('input[name="mfn-setup-nonce"]', $dashboard).val(),
            'plugin': plugin,
            'path': path,
          },
          dataType: 'JSON',
          type: 'POST',

        }).done(function(response){

          $el.removeClass('loading mfn-btn-blue').addClass('disabled')
            .children('span').text('Active');

        });

      },

    };

    /**
     * Tools
     */

    var tools = {

      // tools.doAjax()

      doAjax: function( $btn ){

        var btn_txt = $btn.text(),
          action = $btn.attr('data-action');

        if( $btn.hasClass('loading') ){
          return;
        }

        if ( $btn.hasClass('confirm') && ! confirm( "Are you sure you want to run this tool?" ) ) {
          return false;
        }

        $btn.addClass('loading');

        $.ajax({
          url: ajaxurl,
          data: {
            'mfn-builder-nonce': $btn.attr('data-nonce'),
            action: action
          },
          type: 'POST',
          success: function(response){
            $btn.removeClass('loading')
              .children('span').text('Done');
            setTimeout(function() {
              $btn.children('span').text(btn_txt);
            }, 2000);
          }
        });

      },

    };

    /**
     * Bind
     */

    var bind = function() {

      // unregistered logo click

      $ui.on('click', '.logo.unregistered' ,function(){
        // TODO: scroll to or open register page
        console.log('register');
      });

      // change dashboard ui

      $ui.on( 'click', '.mfn-color-scheme', function(e) {
        dashboardUI.change($(this));
      });

      // register

      $dashboard.on( 'submit', '.mfn-form-reg', function(e) {
        e.preventDefault();
        registration.register($(this));
      });

      $dashboard.on( 'click', '#register', function(e) {
        $('.mfn-form-reg').trigger('submit');
      });

      $dashboard.on( 'click', '#deregister', function(e) {
        registration.deregister();
      });

      $dashboard.on( 'click', '.new-license', function(e) {
        registration.newLicense($(this));
      });

      // data collection

      $dashboard.on( 'click', '.data-collection', function(e) {
        e.preventDefault();
        modal.open($(this));
      });

      $dashboard.on( 'click', '.modal-data-collection', function(e) {
        e.preventDefault();
        modal.close($(this));
      });

      $(document).on('keydown', function(event){
        if ( 'Escape' == event.key ) {
          modal.close();
        }
      });

      // tools

      $dashboard.on( 'click', '.tools-do-ajax', function(e) {
        e.preventDefault();
        tools.doAjax($(this));
      });

      // plugins

      $dashboard.on( 'click', '.plugin-update', function(e) {
        e.preventDefault();
        plugin.update($(this));
      });

      $dashboard.on( 'click', '.plugin-install', function(e) {
        e.preventDefault();
        plugin.install($(this));
      });

      $dashboard.on( 'click', '.plugin-activate', function(e) {
        e.preventDefault();
        plugin.activate($(this));
      });

      // window.scroll

      $(window).on('scroll', function() {

      });

      // window resize

      $(window).on('debouncedresize', function() {

      });

    };


    /**
     * Ready
     * document.ready
     */

    var ready = function() {

      menu.active();
      slider.promo();

      bind();

    };

    /**
     * Load
     * window.load
     */

    var load = function() {

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
    MfnDashboard.ready();
  });

  /**
   * $(window).load
   */

  $(window).on('load', function(){
    MfnDashboard.load();
  });

})(jQuery);
