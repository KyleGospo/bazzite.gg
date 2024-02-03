(function($) {

  /* globals jQuery, mfnSetup, ajaxurl, lozad */

  "use strict";

  var  dictionary = {
    '.one'	: 'One Page',
    '.por'	: 'Portfolio',
    '.box'	: 'Boxed',
    '.blo'	: 'Blog',
    '.dar'	: 'Dark',
    '.sho'	: 'Shop',
    '.mob'	: 'Mobile First',
    '.lig'	: 'Light',
    '.ele'	: 'Elementor',

    '.ani' : 'Animals & Nature',
    '.art' : 'Art & Culture',
    '.car' : 'Cars & Bikes',
    '.cor' : 'Corporations & Organizations',
    '.des' : 'Design & Photography',
    '.edu' : 'Education & Science',
    '.ent' : 'Entertainment',
    '.fas' : 'Fashion',
    '.fin' : 'Finance',
    '.foo' : 'Food & Restaurants',
    '.hea' : 'Health & Beauty',
    '.hou' : 'Housing & Architecture',
    '.mag' : 'Magazines & Writing',
    '.occ' : 'Occasions & Gifts',
    '.oth' : 'Others',
    '.peo' : 'People and services',
    '.pro' : 'Product & Production',
    '.spo' : 'Sports & Travel',
    '.tec' : 'Technology & Computing ',
  };

  var MfnImporter = (function($) {

    var $importer = $('.mfn-importer');

    var step = 'pre-built',
      builder = 'be',
      website,
      error = 'An error occurred while processing, please check XHR in the JS console for more informations.',
      demoData = [];

    // websites

    var body = $('body'),
      websites = $('.websites', $importer),
      websitesIso = $('.websites-iso', $importer),
      search = $('input.search', $importer);

    var searchLock = false,
      sidebar = false,
      getWebsitesOnce = false,
      getWebsitesDone = $.Deferred();

    var navigation = {
      'pre-built' : function( nav ){
        preBuilt.init( nav );
      },
      'builder' : function( nav ){
        blrd.init( nav );
      },
      'data' : function( nav ){
        data.init( nav );
      },
      'complete' : function( nav ){
        complete.init();
      },
      'finish' : false,
    };

    var keys = Object.keys(navigation);

    /**
     * Pre-built
     */

    var preBuilt = {

      // preBuilt.builderSelect()

      builderSelect: function($el){

        builder = $el.attr('data-type');

        $el.addClass('active')
          .siblings().removeClass('active');

      },

      // preBuilt.contentSelect()

      contentSelect: function($el, e){

        var $item = $(e.target);

        if( $item.is('span') ){

          if( $item.hasClass('radio') ){
            $item.addClass('active');
            $item.siblings().removeClass('active');
          } else {
            $item.toggleClass('active');
          }

        }

        $el.addClass('active')
          .siblings().removeClass('active');

        // demoData

        demoData = [
          $el.attr('data-type')
        ];

        $el.find('span.active:not(.hidden)').each(function(){
          demoData.push( $(this).attr('data-type') );
        });

        // console.log(demoData);

      },

      // preBuilt.preview()

      preview: function($el){

        var href = $el.attr('data-href');

        window.open(href, '_blank').focus();

      },

      // preBuilt.select()

      select: function($el, e){

        if( $importer.hasClass('mfn-unregistered') ){
          return;
        }

        if( $(e.target).is('.preview') || $(e.target).is('.far') ){
          // just preview do nothing;
          return;
        }

        website = $el.attr('data-website');

        steps.next();

      },

      // preBuilt.init()

      init: function(){

        websitesIso.css('opacity','0');
        isotope.overlay('show');

        // init isotope

        getWebsitesOnce = true;
        getWebsitesDone.resolve();

        isotope.init();
        isotope.result();

        setTimeout(function(){
          websitesIso.css('opacity','1');
        },200);

        // init sticky sidebar

        stickyFilters();

      },

    };

    /**
     * Modal
     */

    var modal = {

      dfd: $.Deferred(),

      // modal.open()

      open: function(){
        $('.modal-confirm-reset', $importer).addClass('show');
      },

      // modal.close()

      close: function(){
        $('.modal-confirm-reset', $importer).removeClass('show');
      },

      // modal.media()

      media: function($el){

        $el.toggleClass('active');

      },

      // modal.confirm()

      confirm: function($el){

        var $button = $el.closest('.select-inner').siblings('.btn-modal-confirm');

        if( $el.hasClass('active') ){
          $el.removeClass('active');
          $button.addClass('disabled');
        } else {
          $el.addClass('active');
          $button.removeClass('disabled');
        }

      },

      // modal.reset()

      reset: function(dfd){

        var media = $('.modal-confirm-reset .remove-media span', $importer).hasClass('active') ? 1 : 0;

        modal.close();

        // show reset step
        complete.$steps.children('.reset').removeClass('hidden').addClass('loading');

        // ajax

        $.ajax({
          url: ajaxurl,
          data: {
            'action': 'mfn_setup_database_reset',
            'media': media,
            'mfn-setup-nonce': $('input[name="mfn-setup-nonce"]', $importer).val()
          },
          type: 'POST',

        }).done(function(response){

          complete.$steps.children('.reset').removeClass('loading').addClass('done');
          complete.dfdReset.resolve();

        });

      },

      // modal.skip()

      skip: function(dfd){

        modal.close();
        complete.dfdReset.resolve();

        // console.log('reset skip');

      },

    };

    /**
     * Data
     */

    var data = {

      // data.init()

      init: function( nav ){

        var demo = mfnSetup.demos[website];

        // check for slider

        if( 'undefined' !== typeof(demo.plugins) ){

          if( demo.plugins.indexOf('rev') >= 0 ){
            $('.card-data .select-inner span[data-type="sliders"]', $importer).removeClass('hidden');
          } else {
            $('.card-data .select-inner span[data-type="sliders"]', $importer).addClass('hidden');
          }

        }

        $('.card-data .import-options li[data-type="complete"]', $importer).trigger('click');

      }

    };

    /**
     * Builder select
     */

    var blrd = {

      // blrd.init()

      init: function( dir ){

        var demo = mfnSetup.demos[website];

        var b = $('.mfn-dashboard-card[data-step="'+ step +'"]', $importer);

        // elementor additional settings

        $('.mfn-dashboard-card[data-step="'+ step +'"]', $importer).removeAttr('data-elementor');
        if( 'undefined' !== typeof(demo.elementor) ){
          if( 'undefined' !== typeof(demo.elementor.flexbox) ){
            $('.mfn-dashboard-card[data-step="'+ step +'"]', $importer).attr('data-elementor','flexbox');
          }
        }

        // elementor not available for selected website

        if( ! demo.layouts || demo.layouts.indexOf('ele') < 0 ){
          if( 'next' == dir ){
            steps.next();
          } else {
            steps.prev();
          }
          return;
        }

      }

    };

    /**
     * Steps
     */

    var steps = {

      // steps.next()

      next: function() {

        var currentKey = keys.indexOf(step),
          key = keys[currentKey+1];

        steps.change(key, 'next');

      },

      // steps.prev()

      prev: function() {

        var currentKey = keys.indexOf(step),
          key = keys[currentKey-1];

        steps.change(key, 'prev');

      },

      // steps.change()

      change: function( key, nav ) {

        var item = navigation[key];

        step = key;
        $importer.attr('data-step', step);

        $('.mfn-dashboard-card[data-step="'+ step +'"]', $importer).addClass('active')
          .siblings().removeClass('active');

        // callback

        if( item ){
          item( nav );
        }

      },

    };

    /**
     * Complete setup
     */

    var complete = {

      dfdReset: $.Deferred(),
      dfdContent: $.Deferred(),

      $steps: $('.card-complete .complete-steps', $importer),

      // complete.init()

      init: function(){

        var demo = mfnSetup.demos[website];

        // set preview

        $('.website-image', $importer).attr('src','https://muffingroup.com/betheme/assets/images/demos/'+ website +'.jpg');

        // do not install all plugins

        complete.$steps.children('.plugin').addClass('disabled');
        complete.$steps.children('.slider').addClass('disabled');
        complete.$steps.children('.content').addClass('disabled');
        complete.$steps.children('.options').addClass('disabled');

        // content

        if( demoData.indexOf('complete') >= 0 || demoData.indexOf('content') >= 0 ){
          complete.$steps.children('.content').removeClass('disabled');
        }

        // theme options

        if( demoData.indexOf('complete') >= 0 || demoData.indexOf('options') >= 0 ){
          complete.$steps.children('.options').removeClass('disabled');
        }

        // check which plugins are required

        if( 'undefined' !== typeof(demo.plugins) ){

          demo.plugins.forEach(function(plugin){

            // skip elementor in bebuilder is selected
            if( 'ele' == plugin && 'be' == builder ){
              return;
            }

            // revolution slider
            if( 'rev' == plugin ){
              if( demoData.indexOf('sliders') >= 0 ){
                complete.$steps.children('.slider').removeClass('disabled');
              } else {
                return;
              }
            }

            complete.$steps.children('li.'+ plugin).removeClass('disabled');

          });

        }

      },

      // complete.start()

      start: function(){

        var importSteps = complete.$steps.children(':not(.disabled)');

        importSteps = $.map(importSteps, function(value, index){
          return [value];
        });

        // console.log(importSteps);

        var promises = [],
          i,
          dfd = $.Deferred(),
          dfdNext = dfd;

        dfd.resolve();

        // disable button

        $('.card-complete .setup-complete', $importer).addClass('disabled');
        $('.mfn-footer', $importer).hide();

        // run import steps

        if( 0 < importSteps.length ){

          for( i = 0; i < importSteps.length; i++ ){
            (function(k){

              var $current = $(importSteps[k]),
                action = $current.data('action');

              dfdNext = dfdNext.then( function() {
                if ( 'reset' === action ) {
                  return complete.databaseReset();
                } else if ( 'plugin-activate' === action ) {
                  return complete.pluginActivate($current);
                } else if ( 'plugin-install' === action ) {
                  return complete.pluginInstall($current);
                } else if ( 'download' === action ) {
                  return complete.downloadPackage();
                } else if ( 'content' === action ) {
                  return complete.content();
                } else if ( 'options' === action ) {
                  return complete.options();
                } else if ( 'slider' === action ) {
                  return complete.slider();
                } else if ( 'settings' === action ) {
                  return complete.settings();
                }
              } );

              promises.push( dfdNext );
            }(i));
          }

          jQuery.when.apply( null, promises ).then(
            function() {

              // next step
              steps.next();

              // finish step attributes
              $importer.attr('data-type', 'finish');

            },
            function() {

              alert(error);

            }
          );

        }

      },

      // complete.databaseReset()

      databaseReset: function(){

        modal.open();

        return complete.dfdReset.promise();

      },

      // complete.pluginActivate()

      pluginActivate: function($el){

        var plugin = $el.data('plugin'),
          path = $el.data('path');

        complete.$steps.children('[data-plugin="'+ plugin +'"]').addClass('loading');

        return $.ajax({
          url: ajaxurl,
          data: {
            'action': 'mfn_setup_plugin_activate',
            'mfn-setup-nonce': $('input[name="mfn-setup-nonce"]', $importer).val(),
            'plugin': plugin,
            'path': path,
          },
          dataType: 'JSON',
          type: 'POST',

        }).done(function(response){

          if( ! response.error ){
            complete.$steps.children('[data-plugin="'+ plugin +'"]').removeClass('loading').addClass('done');
          } else {
            complete.$steps.children('[data-plugin="'+ plugin +'"]').removeClass('loading').addClass('error');
          }

        });

      },

      // complete.pluginInstall()

      pluginInstall: function($el){

        var nonce = $('input[name="mfn-tgmpa-nonce"]', $importer).val(),
          page = $el.data('page'),
          plugin = $el.data('plugin');

        complete.$steps.children('[data-plugin="'+ plugin +'"]').addClass('loading');

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

          if( response.indexOf('plugins.php?action=activate') > 0 ){
            complete.$steps.children('[data-plugin="'+ plugin +'"]').removeClass('loading').addClass('done');
          } else {
            complete.$steps.children('[data-plugin="'+ plugin +'"]').removeClass('loading').addClass('error');
          }

        });

      },

      // complete.downloadPackage()

      downloadPackage: function($el){

        complete.$steps.children('.download').addClass('loading');

        return $.ajax({
          url: ajaxurl,
          data: {
            'action': 'mfn_setup_download',
            'mfn-setup-nonce': $('input[name="mfn-setup-nonce"]', $importer).val(),
            'website': website,
            'builder': builder,
          },
          type: 'POST',

        }).done(function(response){

          complete.$steps.children('.download').removeClass('loading').addClass('done');

        });

      },

      // complete.content()

      content: function(){

        complete.$steps.children('.content').addClass('loading');

        var attachments = 0;
        var complete_import = 0;

        if( demoData.indexOf('attachments') >= 0 ){
          attachments = 1;
        }

        if( demoData.indexOf('complete') >= 0 ){
          complete_import = 1;
        }

        $.ajax({
          url: ajaxurl,
          data: {
            'action': 'mfn_setup_content',
            'mfn-setup-nonce': $('input[name="mfn-setup-nonce"]', $importer).val(),
            'website': website,
            'builder': builder,
            'attachments': attachments,
            'complete_import': complete_import,
          },
          type: 'POST',
          statusCode: {
            524: function() {
              // console.log('A timeout occurred. Trying again.');
              // complete.content();
              error = 'A timeout occurred. Maximum execution time exceeded.';
              // error = 'A timeout occurred. Please try again WITHOUT database reset.';
            }
          }

        }).done(function(response){

          complete.$steps.children('.content').removeClass('loading').addClass('done');
          complete.dfdContent.resolve();

        });

        return complete.dfdContent.promise();

      },

      // complete.options()

      options: function($el){

        complete.$steps.children('.options').addClass('loading');

        var complete_import = 0;

        if( demoData.indexOf('complete') >= 0 ){
          complete_import = 1;
        }

        return $.ajax({
          url: ajaxurl,
          data: {
            'action': 'mfn_setup_options',
            'mfn-setup-nonce': $('input[name="mfn-setup-nonce"]', $importer).val(),
            'website': website,
            'builder': builder,
            'complete_import': complete_import,
          },
          type: 'POST',

        }).done(function(response){

          complete.$steps.children('.options').removeClass('loading').addClass('done');

        });

      },

      // complete.slider()

      slider: function($el){

        complete.$steps.children('.slider').addClass('loading');

        return $.ajax({
          url: ajaxurl,
          data: {
            'action': 'mfn_setup_slider',
            'mfn-setup-nonce': $('input[name="mfn-setup-nonce"]', $importer).val(),
            'website': website,
            'builder': builder,
          },
          type: 'POST',

        }).done(function(response){

          complete.$steps.children('.slider').removeClass('loading').addClass('done');

        });

      },

      // complete.settings()

      settings: function($el){

        complete.$steps.children('.settings').addClass('loading');

        var complete_import = 0;

        if( demoData.indexOf('complete') >= 0 ){
          complete_import = 1;
        }

        return $.ajax({
          url: ajaxurl,
          data: {
            'action': 'mfn_setup_settings',
            'mfn-setup-nonce': $('input[name="mfn-setup-nonce"]', $importer).val(),
            'website': website,
            'builder': builder,
            'blogname': $('#input-blogname').val(),
            'blogdescription': $('#input-blogdescription').val(),
            'complete_import': complete_import,
          },
          type: 'POST',

        }).done(function(response){

          complete.$steps.children('.settings').removeClass('loading').addClass('done');

        });

      },

    };

    /**
     * Sticky filters
     */

    var stickyFilters = function() {

      if( ! $('#websites .filters').length ){
        return;
      }

      sidebar = $('#websites .filters').stickySidebar({
        topSpacing: 150
      });

    };

    /**
     * Rate
     */

    var rate = function($el) {

      var rating = $el.attr('data-rating');

      $el.addClass('active')
        .siblings().removeClass('active');

      $.ajax({
        url: ajaxurl,
        data: {
          'action': 'mfn_setup_rate',
          'mfn-setup-nonce': $('input[name="mfn-setup-nonce"]', $importer).val(),
          'rating': rating,
        },
        dataType: 'JSON',
        type: 'POST',

      }).done(function(response){

        // console.log(response);

      })
      .always(function() {

        $('.card-finish', $importer).addClass('rated');

        setTimeout(function(){
          $('.card-finish', $importer).removeClass('rated');
        },3000);

      });

    };

    /**
     * Lazy load images
     * lazyLoad()
     */

    var lazyLoad = function() {

      var observer = lozad('.lozad, img[data-src]');
      observer.observe();

    };

    /**
     * Search
     */

    var searchForm = {

      timer: false,

      // searchForm.search()

      search: function(value) {

        var filter = value.replace('&', '').replace(/ /g, '').toLowerCase();

        if( filter ){
          search.closest('.search-wrapper').addClass('active');
        } else {
          search.closest('.search-wrapper').removeClass('active');
        }

        search.val(value);

        isotope.scrollTop();

        isotope.overlay('show');

        setTimeout(function(){

          getWebsites();

          $.when(getWebsitesDone).done(function(){

            websitesIso.isotope({
              filter: function() {
                // return filter ? $(this).data('title').match(filter) : true;

                if( 'elementor' == builder ){

                  if( $(this).is('.ele') ){
                    return filter ? $(this).data('title').match(filter) : true;
                  } else {
                    return false;
                  }

                } else {

                  return filter ? $(this).data('title').match(filter) : true;

                }

              }
            });

            isotope.clear();
            isotope.result( filter );

          });

        }, 200);

      },

      // searchForm.searchTimer()

      searchTimer: function(input) {

        clearTimeout(this.timer);
        this.timer = setTimeout(function() {
          searchForm.search(input.val());
        }, 300, input);

      },

      // searchForm.clear()

      clear: function() {

        search.val('');
        search.closest('.search-wrapper').removeClass('active');

      }

    };

    /**
     * Isotope
     */

    var isotope = {

      currentFilters: {
        layout: [],
        subject: [],
        builder: [] // only '.ele' allowed here
      },

      // isotope.concatValues()

      concatValues: function(filters) {

        var i = 0;
        var comboFilters = [];

        for ( var prop in filters ) {
          var filterGroup = filters[ prop ];
          // skip to next filter group if it doesn't have any values
          if ( !filterGroup.length ) {
            continue;
          }
          if ( i === 0 ) {
            // copy to new array
            comboFilters = filterGroup.slice(0);
          } else {
            var filterSelectors = [];
            // copy to fresh array
            var groupCombo = comboFilters.slice(0); // [ A, B ]
            // merge filter Groups
            for (var k=0, len3 = filterGroup.length; k < len3; k++) {
              for (var j=0, len2 = groupCombo.length; j < len2; j++) {
                filterSelectors.push( groupCombo[j] + filterGroup[k] ); // [ 1, 2 ]
              }

            }
            // apply filter selectors to combo filters for next group
            comboFilters = filterSelectors;
          }
          i++;
        }

        var comboFilter = comboFilters.join(', ');
        return comboFilter;

      },

      // isotope.init()

      init: function() {

        websitesIso.isotope({
          itemSelector: '.website',
          transitionDuration: 200,
          hiddenStyle: {
            opacity: 0
          },
          visibleStyle: {
            opacity: 1
          },
          filter: this.concatValues(this.currentFilters)
        }).isotope('reloadItems').isotope({
          sortBy: 'original-order'
        });

        websitesIso.on('layoutComplete', function() {
          recalculate();
        });

      },

      // isotope.reset()

      reset: function(li, group) {

        var index = this.currentFilters[group].indexOf( li.data('filter') );

        li.removeClass('current');

        this.currentFilters[group].splice( index, 1 );

        websitesIso.isotope({
          filter: this.concatValues(this.currentFilters)
        });

        this.result();

      },

      // isotope.scrollTop()

      scrollTop: function() {

        searchLock = true;

        $('html, body').animate({
          // scrollTop: websites.offset().top - 90
          scrollTop: 0
        }, 200);

        setTimeout(function() {
          searchLock = false;
        }, 250);

      },

      // isotope.filter()

      filter: function(el) {

        var li = el.closest('li');
        var group = el.closest('ul').data('filter-group');

        isotope.scrollTop();

        searchForm.clear();

        isotope.overlay('show');

        setTimeout(function(){

          getWebsites();

          $.when(getWebsitesDone).done(function(){

            if (li.hasClass('current')) {
              isotope.reset(li, group);
              return true;
            }

            // li.siblings().removeClass('current');
            li.addClass('current');

            isotope.currentFilters[group].push( li.data('filter') );

            websitesIso.isotope({
              filter: isotope.concatValues(isotope.currentFilters)
            });

            // results

            isotope.result();

          });

        }, 200);

      },

      // isotope.removeButton()

      removeButton: function(){

        $('.show-all .button').remove();

      },

      // isotope.showAll()

      showAll: function(){

        this.overlay('show');

        getWebsites();
        this.result();

      },

      // isotope.overlay()

      overlay: function(state){

        if ( 'show' == state ) {

          websitesIso.addClass('loading');

        } else {

          setTimeout(function(){
            websitesIso.removeClass('loading');
          }, 250);

        }

      },

      // isotope.result()

      result: function(search){

        search = (typeof search !== 'undefined') ?  search : ''; // isset

        var count, all, text, layout, subject, bldr,
          el = $('.results', websites);

        count = websitesIso.data('isotope').filteredItems.length;
        all = el.data('count');

        layout = this.currentFilters.layout;
        subject = this.currentFilters.subject;
        bldr = this.currentFilters.builder;

        isotope.overlay('hide');

        if( ! layout.length && ! subject.length && ! bldr.length && ! search ){

          el.html('<strong>All '+ all + '</strong> pre-built websites');
          return false;
        }

        text  = pluralize(count, 'result') +' for: ';

        if( bldr.length ){
          $.each( bldr, function( index, value ){
            text += '<span class="filter" data-filter="'+ value +'">'+ dictionary[value] +'</span>';
          });
        }

        if( layout.length ){
          $.each( layout, function( index, value ){
            text += '<span class="filter" data-filter="'+ value +'">'+ dictionary[value] +'</span>';
          });
        }

        if( subject.length ){
          $.each( subject, function( index, value ){
            text += '<span class="filter" data-filter="'+ value +'">'+ dictionary[value] +'</span>';
          });
        }

        if( search ){
          text += '<span class="filter key">'+ search +'</span>';
        }

        el.html(text);

      },

      // isotope.unclick()

      unclick: function(el){

        var filter = el.data('filter');

        if( filter ){
          $('.filters li[data-filter="'+ filter +'"] a').click();
        } else {
          searchForm.search('');
        }


      },

      // isotope.clear()

      clear: function() {

        isotope.currentFilters.subject = [];
        isotope.currentFilters.layout = [];

        $('.filters li').removeClass('current');

      }

    };

    /**
     * Get all pre-built websites
     * getWebsites()
     */

    var getWebsites = function() {

      if ( getWebsitesOnce ) {
        return true;
      }

      getWebsitesOnce = true;

      var data = {
        action: 'mfn_setup_websites',
        'mfn-setup-nonce': $('input[name="mfn-setup-nonce"]', $importer).val()
      };

      $.ajax({

        url: ajaxurl,
        data: data,
        // dataType: 'JSON',
        type: 'POST',

      }).done(function(response) {

        if (response) {

          websitesIso.append(response).isotope('reloadItems').isotope({
            sortBy: 'original-order'
          });

          websitesIso.on('arrangeComplete', function() {
            lazyLoad();
            isotope.removeButton();
            getWebsitesDone.resolve();
          });

        } else {

          console.log('Error: Could not get all pre-built websites.');

        }

      });

    };

    /**
     * Pluralize nouns
     */

    var pluralize = function(count, noun){

      if( 1 !== count ){
        noun = noun + 's';
      }

      return count + ' ' + noun;

    };

    /**
     * Recalculate
     */

    var recalculate = function() {

      $(window).trigger('resize');

      if( sidebar ){
        sidebar.stickySidebar('updateSticky');
      }

    };

    /**
     * Bind
     */

    var bind = function() {

      // steps

      $importer.on( 'click', '.setup-previous, .inner-navigation.prev', function(e) {
        steps.prev();
      });

      $importer.on( 'click', '.setup-next, .inner-navigation.next', function(e) {
        steps.next();
      });

      // pre-built

      $importer.on( 'click', '.builder-type li', function(e) {
        preBuilt.builderSelect($(this));
      });

      $importer.on( 'click', '.import-options li', function(e) {
        preBuilt.contentSelect($(this),e);
      });

      websites.on( 'click', '.website .preview', function(e) {
        preBuilt.preview($(this));
      });

      websites.on( 'click', '.website', function(e) {
        preBuilt.select($(this),e);
      });

      // websites

      $('#websites').on('click', '.filters a', function(e) {
        e.preventDefault();
        isotope.filter($(this));
      });

      $('#websites').on('click', '.results .filter', function(e) {
        e.preventDefault();
        isotope.unclick($(this));
      });

      $('#websites').on('click', '.show-all .button', function(e) {
        e.preventDefault();
        isotope.showAll();
      });

      // search

      $('#websites').on('click', '.search-wrapper .close', function() {
        searchForm.search('');
      });

      // complete

      $importer.on( 'click', '.setup-complete', function(e) {
        complete.start();
      });

      // rate

      $importer.on( 'click', '.mfn-rating li', function(e) {
        e.preventDefault();
        rate($(this));
      });

      // modal

      $importer.on( 'click', '.modal-confirm-reset .remove-media span', function(e) {
        e.preventDefault();
        modal.media($(this));
      });

      $importer.on( 'click', '.modal-confirm-reset .reset-confirm span', function(e) {
        e.preventDefault();
        modal.confirm($(this));
      });

      $importer.on( 'click', '.modal-confirm-reset .btn-modal-confirm', function(e) {
        e.preventDefault();
        modal.reset($(this));
      });

      $importer.on( 'click', '.modal-confirm-reset .btn-modal-skip', function(e) {
        e.preventDefault();
        modal.skip($(this));
      });

      // keyup

      search.on('keyup', function() {
        searchForm.searchTimer($(this));
      });

      // window.scroll

      $(window).on('scroll', function() {

      });

      // window resize

      $(window).on('debouncedresize', function(){

      });

    };


    /**
     * Ready
     * document.ready
     */

    var ready = function() {

      lazyLoad();

      bind();

    };

    /**
     * Load
     * window.load
     */

    var load = function() {

      $importer.removeClass('loading');

      preBuilt.init();

      recalculate();

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
    MfnImporter.ready();
  });

  /**
   * $(window).load
   */

  $(window).on('load', function(){
    MfnImporter.load();
  });

})(jQuery);
