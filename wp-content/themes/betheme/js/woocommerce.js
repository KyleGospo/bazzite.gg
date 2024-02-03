(function($) {
$(document).ready(function() {

   if( $('body').hasClass('shop-sidecart-active') ) {
    woocart.refresh(); // prevent caching sidecart
  }

  mfnFakeSale.init();

  // gallery grid
  if(!$('body').hasClass('mfn-ui') && $('.mfn-product-gallery-grid').length){
    // zoom
    if( !$('body').hasClass('product-zoom-disabled') ){
      $(' .mfn-product-gg-img a').zoom();
    }
    // lightbox
    initPhotoSwipeFromDOM('.mfn-product-gallery-grid');
  }

  $( document ).on( 'click', '.mfn-quick-view', function(e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    $(this).addClass('loading');
    quickview.display(id);
  });

  if( $('body').hasClass('mfn-ajax-add-to-cart') ){
    $( document ).on( 'click', '.single_add_to_cart_button:not(.disabled)', function(e) {

      e.preventDefault();

      var cc = $('#header_cart .header-cart-count').length ? $('#header_cart .header-cart-count').first().text() : 0;

      var $thisbutton = $(this);
      var $form = $thisbutton.closest('form.cart'),
      c_form = $thisbutton.closest('form.cart').get(0);

      var $qty = $form.find('input.qty');
      var qty_max = $qty.attr('max');

      if( typeof qty_max !== typeof undefined && qty_max != '' && parseInt($qty.val()) > parseInt(qty_max) ){
        $qty.css({'background-color': '#77a464', 'transition': '0.8s'});
        $qty.val(qty_max);

        setTimeout(function() {
            $qty.removeAttr('style');
        }, 1000);

        return;
      }

      var ajaxAct = {
        url: wc_add_to_cart_params.ajax_url,
        type: 'POST',
        beforeSend: function (response) {
            $(document.body).trigger('adding_to_cart');
            $thisbutton.removeClass('added').addClass('loading');
        },
        success: function (response) {

            if( typeof response.error !== 'undefined' ){
                location.reload();
                return;
            }

            $thisbutton.addClass('added').removeClass('loading');
            $(document.body).trigger('added_to_cart');
            $(document.body).trigger('wc_fragment_refresh');

            $('.mfn-cart-holder').attr('aria-expanded', 'true');
        }
      };

      // check if grouped product has any quantity selected
      if( $form.hasClass('grouped_form') ){

        var $inputs = $('input.qty', $form);
        var hasQuantity = false;

        $inputs.each(function(){
          if( parseInt($(this).val()) > 0 ){
            hasQuantity = true;
          }
        });

        if( ! hasQuantity ){
          alert( mfnwoovars.groupedQuantityErrori18n);
          return false;
        }

      }

      var formData = new FormData(c_form);
      formData.append('action', 'woocommerce_add_to_cart');
      formData.append('current_cart', cc);

      if( $('.mnm_cart.mnm_data .mnm_add_to_cart_button').length ){
        formData.delete('add-to-cart');
      }

      if ( !formData.has('product_id') && 'undefined' !== $thisbutton.val() ) {
        formData.append( 'product_id', parseInt( $thisbutton.val() ) );
      }

      if ( formData.has('variation_id') ) {
        formData.delete('product_id');
      }

      ajaxAct['data'] = formData;
      ajaxAct['contentType'] = false;
      ajaxAct['processData'] = false;

      $(document.body).trigger('adding_to_cart', [$thisbutton, formData]);
      $.ajax( ajaxAct );

      return false;

    });
  }

  // woo product category arrows
  if( $('.wc-block-product-categories-list') ){
    $('.wc-block-product-categories-list li.wc-block-product-categories-list-item').each(function() {
      if($(this).children('ul').length){
        $(this).append('<span class="cat-expander"></span>');
      }
    });

    $('.wc-block-product-categories-list li > span.cat-expander').on('click', function(e) {
      if($(this).siblings('ul').is(':visible')){
        $(this).siblings('ul').slideUp(300);
        $(this).parent('li').removeClass('li-expanded');
      }else{
        $(this).siblings('ul').slideDown(300);
         $(this).parent('li').addClass('li-expanded');
      }
    });
  }

  // Append spans to additional info table
  if($('.woocommerce-product-attributes').length){
    spanToAdditionalInfo();
  }

  // product variations
  if( $('.mfn-variations-wrapper').length && $('body').hasClass('mfn-variable-swatches') ){
    productvariations.run();
  }

  $('.toggle-mfn-cart').on('click', function(e) {
    if( $('body').hasClass('shop-sidecart-active') && $('.mfn-cart-holder').length ){
        e.preventDefault();

        if( $('body').hasClass('mfn-bebuilder-header') ) return;

        if ( $('html').hasClass('mfn-cart-opened')) {
          $('.mfn-cart-holder').attr('aria-expanded', 'false')
        } else {
          $('.mfn-cart-holder').attr('aria-expanded', 'true');
        }

        woocart.click();
    }
  });

  $('.toggle-mfn-cart').on('keypress', function(e) {
    e.preventDefault();
    if ( e.originalEvent.key !== 'Enter' ) return;

    if ( $('html').hasClass('mfn-cart-opened')) {
      $('.mfn-cart-holder').attr('aria-expanded', 'false');

      const domPrefix = $('body').hasClass('side-slide-is-open') ? '.extras-wrapper ' : '.top_bar_right ';
      $(`${domPrefix} #header_cart`).trigger('focus');
    } else {
      $('.mfn-cart-holder').find('a').first().trigger('focus');
      $('.mfn-cart-holder').attr('aria-expanded', 'true');
    }

    woocart.click();
  });

  $('.mfn-cart-overlay').on('click', function() {
    woocart.click();
  });

    if($('body').hasClass('shop-sidecart-active')){
        woocart.start();
    }

  $('.toggle-login-modal').on('click', function(e) {
    e.preventDefault();
    if( $('body').hasClass('mfn-ui') ) return;
    modallogin.click($(this));
  });

  $(document).on('mouseup', function(e) {

    // login form
    if( $('body').hasClass('mfn-show-login-modal') ){
      if( ! $('.mfn-header-login').is(e.target) && $('.mfn-header-login').has(e.target).length === 0 && ! $('.toggle-login-modal').is(e.target) && $('.toggle-login-modal').has(e.target).length === 0 ){
        modallogin.click();
      }
    }

  });

  function alignListHeights(){
    var i = 0;
    $('.woocommerce .column_shop_products ul.products.list li.product').each(function() {
        $(this).css({ 'min-height': '1px'});

        var height= $(this).outerHeight();
        var imgHeight = $(this).find('.product-loop-thumb').outerHeight();

        if(imgHeight > height){
            $(this).css({'min-height': imgHeight});
        }
    });
  }

  if( $('.woocommerce .column_shop_products ul.products.list').length ){
    alignListHeights();
    $(window).on('debouncedresize', alignListHeights);
  }


  $('.mfn-header-modal-login .woocommerce-form-login .form-row').on('click', function() {
    if( !$(this).hasClass('active') ){
      $(this).addClass('active');
    }
  });

  $('.mfn-header-modal-login .woocommerce-form-login .form-row input').on('blur change', function() {
    modallogin.check();
  });

  modallogin.check();

  $('.mfn-cart-holder .mfn-ch-content').on('click', '.mfn-chp-remove', function(e) {
    e.preventDefault();
    if(!$('.mfn-cart-holder').hasClass('loading')){
      $('.mfn-cart-holder').addClass('loading');
      var pid = $(this).closest('.mfn-ch-product').attr('data-row-key');
      woocart.delete(pid);
    }
  });

  $('.mfn-woo-products').on('change', '.mfn-variations-wrapper-loop .mfn-vr-select', function() {
    var link = $(this).find(':selected').attr('data-link');
    if(link != ''){
      window.location.href = link;
    }
  });

  $('.mfn-cart-holder .mfn-ch-content').on('change', '.qty', function() {
    var $el = $(this);
    if(!$('.mfn-cart-holder').hasClass('loading')){
        $('.mfn-cart-holder').addClass('loading');
        var pid = $el.closest('.mfn-ch-product').attr('data-row-key');
        var qty = $el.val();
        woocart.updatequantity(pid, qty);
    }
  });


  if( $('body').hasClass('woocommerce-checkout') ){

    if( $('.woocommerce-form-login').length ){
        $('.woocommerce-form-login').addClass('checkout-form-toggle');
    }
    if( $('.woocommerce-form-coupon').length ){
        $('.woocommerce-form-coupon').addClass('checkout-form-toggle');
    }

    /*$(document).ajaxComplete(function() {
      // checkoutpayment.start();
    });*/

    setTimeout(function(){
      checkoutpayment.start();
    },1500);
  }

  /*$( document.body ).on( 'adding_to_cart', function( e ) {
    if(!$('.header-cart-count').length || !$('.header-cart-total').length){
        $('.header-cart').append('<span class="header-cart-count"></span>');
         $('#header_cart').append('<p class="header-cart-total"></p>');
    }
  });*/

  //$( document.body ).on( 'wc_fragment_refresh added_to_cart', function( e ) {
$( document.body ).on( 'added_to_cart', function( e ) {
    if($('body').hasClass('shop-sidecart-active')) {
      woocart.refresh();
      if(!$('html').hasClass('mfn-cart-opened')) {
        //woocart.click();
        woocart.force_open = true;
      }
    }
  } );

  $( document.body ).on( 'updated_cart_totals removed_from_cart', function(){
    if($('body').hasClass('shop-sidecart-active')){
        woocart.refresh();
    }
    });

  // wishlist
  wishlist.set();
  $(document).on('click', '.mfn-wish-button', function(e) { e.preventDefault(); var id = $(this).attr('data-id'); wishlist.click(id); });

  // attr ajjax filter
  if( $('form.mfn_attr_filters').length ){

    $(document).on('click', '.mfn-woo-list-active-filters li span', function() {
        var id = $(this).attr('data-id');
        $(this).closest('li').addClass('laoding');
        if($('.widget.mfn_woo_attributes .mfn_attr_filters input.'+id).length){
            if($('.mfn_woo_attributes .mfn_attr_filters input.'+id).is(':checked')) {
                $('.mfn_woo_attributes .mfn_attr_filters input.'+id).prop('checked', false);
                if( $('.mfn_woo_attributes .mfn_attr_filters input.'+id).closest('li').hasClass('active') ){
                    $('.mfn_woo_attributes .mfn_attr_filters input.'+id).closest('li').removeClass('active');
                }
            }
            grabFiltersForms();
        }
    });

    $(document).on('click', 'form.mfn_attr_filters ul li', function() {

    var $li = $(this);
    var $ul = $(this).closest('ul');
    var $form = $(this).closest('form');
    var input_class = $li.find('input').attr('class');

    // on click active filters
    if($form.hasClass('mfn-before-products-list-form')){

        $li.find('input').is(':checked') ? $li.find('input').prop('checked', false) : $li.find('input').prop('checked', true);
        $li.toggleClass('active');

    }else if($form.hasClass('mfn_attr_filters')){
        $li.find('input').is(':checked') ? $('form.mfn_attr_filters ul li input.'+input_class).prop('checked', false) : $('form.mfn_attr_filters ul li input.'+input_class).prop('checked', true);
        $('form.mfn_attr_filters ul li input.'+input_class).closest('li').toggleClass('active');
    }

    if( !$li.closest('form').hasClass('button-enabled') ){
        $li.addClass('loading');
        grabFiltersForms();
    }

    });
  }

  if( $('form.mfn_attr_filters.button-enabled').length ){
    $('form.mfn_attr_filters.button-enabled').submit(function(e) {
        e.preventDefault();
        grabFiltersForms();
    });
  }

  $.fn.extend({
    /** formData:
     * Most form submissions will require special formatting different from
     * a normal get request (a=val1,val2&b=val3 vs. a=val1&a=val2&b=val3).
     * Sample use: $.getJSON(url,$("myFormElement").formData(),callback);.
     * @return {String} Serialized form data appropriate for GET requests.
     * @author Joe Johnson
     */
    formData: function(){
      var data = {};
      $.each(this.serializeArray(),function(i,o){
        if (data[o.name]) data[o.name] += ','+o.value;
        else data[o.name] = o.value;
      });
      return $.param(data);
    }
  });

  function removeQueryParameters(url, parametersToRemove) {
    url = window.location.origin + url;
    const urlObject = new URL(url);
    parametersToRemove.forEach(param => {
      urlObject.searchParams.delete(param);
    });
    return urlObject.toString();
  }

  function grabFiltersForms(){
    let formsArr = [];
    var path = getUrlWithoutPagination();

    $('form.mfn_attr_filters').each(function() {
      formsArr.push( $(this).formData() );
    });

    formUnique = formsArr.filter( function(a){if (!this[a]) {this[a] = 1; return a;}}, {} );

    let formData = formUnique.join('&');
    let url = path+'?'+formData;
    load_products_ajax(url);
  }

  function load_products_ajax(url) {

    var $products = $('.entry-content .mfn-woo-products');
    $('.mfn_attr_filters button').addClass('loading disabled');

    if($('body').hasClass('archive')){

        $.get(url, function(responseText) {

            $('.pager_wrapper').remove();
            $('.woocommerce-info').remove();

            if( $('.default-woo-list').length ){
                $('.default-woo-list').replaceWith( $( $.parseHTML( responseText )).find('.default-woo-list').clone() );
            }else if( $('.column_shop_products').length ){
                $('.column_shop_products').replaceWith( $( $.parseHTML( responseText )).find('.column_shop_products').clone() );
            }

            $('.woocommerce-ordering select').on('change', function() {
                $(this).closest('form').submit();
            });

            // remove unwanted attibutes
            url = removeQueryParameters(url, ['layout', 'per_page']);
            // replace %2C with coma
            url = url.replace(/%2C/g,",");
            // set browser url
            history.replaceState(null, '', url);

            if ($('.mcb-sidebar').length) {
              var maxH = $('#Content .sections_group').outerHeight();
              $('.mcb-sidebar').each(function() {
                $(this).css('min-height', 0);
                if ($(this).height() > maxH) {
                  maxH = $(this).height();
                }
              });
              $('.mcb-sidebar').css('min-height', maxH + 'px');
            }

            if( $('.woocommerce .column_shop_products ul.products.list').length ){
                alignListHeights();
                $(window).on('debouncedresize', alignListHeights);
            }

            if( $('.products li img').length ){
                $('.products li img').each(function() {
                    if( typeof $(this).attr('data-src') !== 'undefined' ){
                        $(this).attr('src', $(this).attr('data-src'));
                    }
                })
            }

            $('.mfn_attr_filters ul li').removeClass('loading');
            $('.mfn_attr_filters button').removeClass('loading disabled');
        });
    }else{
        window.location.href = url;
    }

  }

  function getUrlWithoutPagination(){
    var current_url = window.location.pathname;
    var url = '';

    // get url witout pagination
    if(current_url.includes("/page/")){
        url = current_url.split("/page/")[0];
    }else{
        url = current_url;
    }

    // if not listing page redirect
    if( !$('body').hasClass('archive') ){
        url = $('form.mfn_attr_filters').attr('action');
    }

    return url;
  }

  setTimeout(function() {
    productgallery.start();
  }, 300);

});

  // Append spans to additional info table

  function spanToAdditionalInfo(){
    $('.woocommerce-product-attributes td, .woocommerce-product-attributes th').each(function() {
      $(this).html('<span>'+$(this).html()+'</span>');
    });
  }

  var productvariations = {
    run: function() {

      $('.mfn-variations-wrapper .mfn-vr-options li a').on('click', function(e) {
        e.preventDefault();
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
        var id = $(this).attr('data-id');
        var atr = $(this).parent().parent().attr('data-atr');
        $('.variations select#'+atr).val(id);
        $('.variations select#'+atr).trigger('change');
        if( $('form.variations_form').attr('data-product_variations') != 'false' ) {
            setTimeout(function() { productvariations.triggerChange(atr, id); }, 100);
        }
      });

      $('.mfn-variations-wrapper .mfn-vr-select').on('change', function() {
        var id = $(this).val();
        var atr = $(this).attr('data-atr');
        $('.variations select#'+atr).val(id);
        $('.variations select#'+atr).trigger('change');
        if( $('form.variations_form').attr('data-product_variations') != 'false' ) {
            setTimeout(function() { productvariations.triggerChange(atr, id); }, 100);
        }
      });

      $('.woocommerce div.product form.cart .variations select').each(function() {
        var val = $(this).val();
        var atr = $(this).attr('id');
        if( val.length ){
          if($('.mfn-variations-wrapper .mfn-vr-options[data-atr="'+atr+'"] li a[data-id="'+val+'"]').length){
            $('.mfn-variations-wrapper .mfn-vr-options[data-atr="'+atr+'"] li a[data-id="'+val+'"]').trigger('click');
          }else if($('.mfn-variations-wrapper .mfn-vr-select[data-atr="'+atr+'"]').length){
            $('.mfn-variations-wrapper .mfn-vr-select[data-atr="'+atr+'"]').val(val);
          }
        }
      });

      if( window.location.search ){
        if( $('.mfn-variations-wrapper ul.mfn-vr-options').length ){
          const urlParams = new URLSearchParams(window.location.search);
          $('.mfn-variations-wrapper ul.mfn-vr-options').each(function() {
            let attr = $(this).attr('data-atr');
            if( urlParams.get(attr) && typeof attr !== 'undefined' ){
              if( $(this).find('li a[data-id="'+urlParams.get(attr)+'"]').length ) $(this).find('li a[data-id="'+urlParams.get(attr)+'"]').trigger('click');
            }
          });
        }
      }

      //$('.variations').hide();

    },

    triggerChange: function(atr, nval) {

        if( $('.mfn-vr-options li').length )
            $('.mfn-vr-options li a').css('opacity', '0.3');

        if( $('.mfn-vr-select option').length )
            $('.mfn-vr-select option').attr('disabled', 'true');


        $('.woocommerce form.variations_form.cart table.variations select option').each(function() {
            var val = $(this).attr('value');
            var attr_name = $(this).closest('select').attr('name');

            if($('.woocommerce .mfn-variations-wrapper .mfn-vr ul.'+attr_name).length)
                $('.woocommerce .mfn-variations-wrapper .mfn-vr ul.'+attr_name+' a[data-id="'+val+'"]').css('opacity', '1');

            if($('.woocommerce .mfn-variations-wrapper .mfn-vr select.'+attr_name).length)
                $('.woocommerce .mfn-variations-wrapper .mfn-vr select.'+attr_name+' option[value="'+val+'"]').removeAttr('disabled');
        });

    }
  };

  var wishlist = {

    cookiename: 'mfn_wishlist',

    click: function(id) {
      wishlist.readcookie() ? arr = wishlist.readcookie().split(',') : arr = [];
      if( arr.includes( id ) ){
        arr = arr.filter( el => el != id);
        $('.mfn-wish-button[data-id="'+id+'"]').removeClass('loved');
        $('.mfn-wish-button[data-id="'+id+'"]').closest('.wishlist-row').slideUp(300);
        setTimeout(function() {
          $('.mfn-wish-button[data-id="'+id+'"]').closest('.wishlist-row').remove();
        }, 400);
        if($('.wishlist .wishlist-row').length == 1){
          $('.wishlist .wishlist-info').show();
        }
      }else{
        arr.push( id );
        $('.mfn-wish-button[data-id="'+id+'"]').addClass('loved');
      }
      wishlist.createcookie(arr);
      wishlist.updatecounter(arr.length);
    },

    set: function(){
      wishlist.readcookie() ? arr = wishlist.readcookie().split(',') : arr = [];
      if(arr.length){
        $.each(arr, function(i, v) {
          $('.mfn-wish-button[data-id="'+v+'"]').addClass('loved');
        });
      }
        wishlist.updatecounter(arr.length);
    },

    readcookie: function(){
      var nameEQ=wishlist.cookiename+"=";
      var ca=document.cookie.split(';');
      for(var i=0;i<ca.length;i++){
        var c=ca[i];
        while(c.charAt(0)==' ')c=c.substring(1,c.length);
        if(c.indexOf(nameEQ)==0) return c.substring(nameEQ.length,c.length)
      }

      return null
    },

    createcookie: function(save){
      var date=new Date();
      date.setTime(date.getTime()+(365*24*60*60*1000));
      var expires="; expires="+date.toGMTString();
      document.cookie=wishlist.cookiename+"="+save+expires+"; path="+mfnwoovars.rooturl+'/'
    },

    updatecounter: function(count) {
        $('.header-wishlist-count').text(count).attr('class', 'header-wishlist-count mfn-header-icon-'+count);
    }

  };

  modallogin = {
    check: function() {
        $('.mfn-header-modal-login form.woocommerce-form-login').attr('action', mfnwoovars.myaccountpage);
      $('.mfn-header-modal-login .woocommerce-form-login .form-row input').each(function() {
        if( !$(this).val() ){
          $(this).closest('.form-row').removeClass('active');
        }else{
          $(this).closest('.form-row').addClass('active');
        }
      });
    },

    // modallogin.click()

    click: function($el) {

      var rtl = $('body').hasClass('rtl');

      if( $('.mfn-header-login').hasClass('disabled') ){
        return true;
      }

      if( $('body').hasClass('mfn-show-login-modal') ){

        $('.mfn-header-login').removeAttr('style').addClass('disabled');
        setTimeout(function(){
          $('.mfn-header-login').addClass('is-side').removeClass('disabled');
        },300);

        $('body').removeClass('mfn-show-login-modal no-overlay');

      } else {

        // check if we want modal to be boxed or slide from edge

        if( $el.hasClass('is-boxed') ){

          var bodyT = $('body').offset().top || 0,
            top = $el.offset().top || 0,
            left = $el.offset().left || 0,
            windowW = window.innerWidth
            modalW = 340;

          top -= bodyT;

          $('.mfn-header-login').removeClass('is-side');

          $('.mfn-header-login').css('top', top + 'px');

          if( rtl ){

            if( left - modalW < 0 ){
              $('.mfn-header-login').css('left', left + 'px');
            } else {
              $('.mfn-header-login').css('left', left - modalW + 37 + 'px');
            }

          } else {

            if( left + modalW > windowW ){
              $('.mfn-header-login').css('left', left - modalW + 37 + 'px');
            } else {
              $('.mfn-header-login').css('left', left + 'px');
            }

          }

          $('body').addClass('no-overlay');

        }

        $('body').addClass('mfn-show-login-modal');

      }

    }

  };

  checkoutpayment = {

    start: function( $once = false ) {
        $('.wc_payment_methods .wc_payment_method').each(function() {
            if( !$(this).find('.mfn-payment-check').length ){
                $(this).append('<span class="mfn-payment-check"><i class="icon-check" aria-label="payment check icon"></i></span>');
            }
            if( $(this).find('.input-radio').is(':checked') ){
              checkoutpayment.set( $(this), $once );
            }
        });
        checkoutpayment.watch();
    },

    watch: function() {
        $(document).on('click', '.wc_payment_methods .wc_payment_method', function() {
            checkoutpayment.set( $(this) );
        });
    },

    set: function( $li, $once = false ) {
        $input = $li.find('.input-radio');
        if(!$input.is(':checked')){

            $('.wc_payment_methods .wc_payment_method .payment_box').slideUp(300);
            $('.wc_payment_methods .wc_payment_method').removeClass('active-payment');

            $input.trigger('click');
            $li.addClass('active-payment');
            $li.find('.payment_box').slideDown(300);

        }else{
            $li.addClass('active-payment');
        }

        // FIX | WooCommerce 7.6 no longer using ajax

        if( ! $once ){
          setTimeout(function(){
            checkoutpayment.start( true );
          },1500);
        }

    }

  };

  quickview = {
    headerOffset: false,
    display: function(id) {
        $.ajax({
            url: mfnwoovars.ajaxurl,
            data: {
                'mfn-woo-nonce': mfnwoovars.wpnonce,
                action: 'mfnproductquickview',
                id: id
            },
            type: 'POST',
            success: function(response){


                $('body').append(response);
                $('.mfn-quick-view').removeClass('loading');
                quickview.close();
                if( $('.mfn-variations-wrapper').length && $('body').hasClass('mfn-variable-swatches') ){
                    productvariations.run();
                }

                $('html').addClass('mfn-quick-view-opened');

                $('.mfn-popup-quickview .mfn-quickview-slider').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    dots: false,
                    arrows: true,
                    prevArrow: '<a class="slick-prev mfn-popup-arrow slick-arrow" href="#"><i class="icon-left-open-big" aria-label="previous slide"></i></a>',
                    nextArrow: '<a class="slick-next mfn-popup-arrow slick-arrow" href="#"><i class="icon-right-open-big" aria-label="next slide"></i></a>',
                    focusOnChange: true,
                });

                if( $('.mfn-popup-quickview form.cart.variations_form').length ){
                    $('.mfn-popup-quickview .variations_form').wc_variation_form();
                }

                $('.mfn-popup-quickview .mfn-quickview-slider').imagesLoaded( function() {
                    quickview.setHeight();
                });

                wishlist.set();

                $(window).on('debouncedresize', quickview.setHeight);

                return;
            }
        });
    },
    setHeight: function() {
        var popupH = $('.mfn-popup-quickview .mfn-popup-content').outerHeight();
        var imgH = $('.mfn-popup-quickview .mfn-popup-content-photos .mfn-qs-one-first img').height();

        if(imgH > popupH){
            $('.mfn-popup-quickview .mfn-popup-content-text').css({ 'height': popupH });
        }else{
            $('.mfn-popup-quickview .mfn-popup-content-text').css({ 'height': imgH });
        }

        if( $('body').hasClass('mfn-header-scrolled') && $('.mfn-header-tmpl.mfn-hasSticky').length ){
            $('html').addClass('mfn-disable-css-animations');
            $('body').removeClass('mfn-header-scrolled');
            quickview.headerOffset = $('.mfn-header-tmpl.mfn-hasSticky').outerHeight();
            $('body').addClass('mfn-header-scrolled');
            $('#Wrapper').css({'padding-top': quickview.headerOffset+"px"});
        }

    },
    close: function() {
        $('.mfn-close-popup').on('click', function() {
            $('.mfn-popup').remove();
            $('html').removeClass('mfn-quick-view-opened');
            $('html').removeClass('mfn-disable-css-animations');
        });

        $('.mfn-popup').on('click', function(e) {
            if(!$('.mfn-popup-content').is(e.target) && $('.mfn-popup-content').has(e.target).length === 0) {
                $('.mfn-popup').remove();
                $('html').removeClass('mfn-quick-view-opened');
                $('html').removeClass('mfn-disable-css-animations');
            }
        });
    }
  },

  woocart = {

    force_open: false,

    coupons: {

      init: function() {
        woocart.coupons.toggle();
        woocart.coupons.apply();
        woocart.coupons.remove();
      },

      back: function(e) {
        if ( !$('.mfn-chft-apply-coupon-wrapper').is(e.target) && !$(e.target).closest('.mfn-chft-apply-coupon-wrapper').length ) {
          $('.mfn-chft-apply-coupon-wrapper').removeClass('mfn-chft-apply-coupon-active');
          $(document).unbind('click', woocart.coupons.back);
        }
      },

      toggle: function() {
        $(document).on('click', '.mfn-chft-apply-coupon-switcher', function(e) {
          e.preventDefault();
          $(this).closest('.mfn-chft-apply-coupon-wrapper').addClass('mfn-chft-apply-coupon-active');
          $('.mfn-sidecart-apply-coupon-wrapper .mfn-sidecart-apply-coupon-input').focus();
          $(document).bind('click', woocart.coupons.back);
        });
      },

      remove: function() {

        $(document).on('click', '.mfn-chft-apply-coupon-wrapper .mfn-chft-coupons-list .mfn-sidecart-remove-coupon', function(e) {
          e.preventDefault();
          if( $(this).hasClass('loading') ) return;

          $(this).addClass('loading');

          let val = $(this).attr('data-code');

          $.ajax({
            url: mfnwoovars.ajaxurl,
            data: {
                'mfn-woo-nonce': mfnwoovars.wpnonce,
                action: 'mfndeletecoupon',
                code: val
            },
            type: 'POST',
            cache: false,
            success: function(response){

              woocart.refresh();
    

            }
          });

        });

      },

      ajax: function() {

        let button = $('.mfn-sidecart-apply-coupon-wrapper .mfn-sidecart-apply-coupon');
        if( button.hasClass('loading') ) return;

        $('.mfn-chft-apply-coupon-wrapper .mfn-sidecart-notice').remove();
        $('.mfn-sidecart-apply-coupon-wrapper .mfn-sidecart-apply-coupon-input').removeClass('mfn-error');

        if( !$('.mfn-sidecart-apply-coupon-wrapper .mfn-sidecart-apply-coupon-input').val().length ){
          $('.mfn-sidecart-apply-coupon-wrapper .mfn-sidecart-apply-coupon-input').addClass('mfn-error');
          return;
        }

        let val = $('.mfn-sidecart-apply-coupon-wrapper .mfn-sidecart-apply-coupon-input').val();

        button.addClass('loading');

        $.ajax({
          url: mfnwoovars.ajaxurl,
          data: {
              'mfn-woo-nonce': mfnwoovars.wpnonce,
              action: 'mfnapplycoupon',
              code: val
          },
          type: 'POST',
          cache: false,
          success: function(response){

            if( response ){

              let noticeHtml = '';

              if( typeof response.notice.error === 'undefined' ) {

                $('.mfn-cart-holder .mfn-ch-content').html(response.content);
                $('.mfn-cart-holder .mfn-ch-footer .mfn-ch-footer-totals').html(response.footer);

              }else{
                $('.mfn-sidecart-apply-coupon-wrapper .mfn-sidecart-apply-coupon-input').addClass('mfn-error');
              }

              for (const [key, value] of Object.entries(response.notice)) {
                
                noticeHtml += '<div class="mfn-sidecart-notice mfn-sidecart-notice-'+key+'">';
                
                if( value ){
                  noticeHtml += value.map((x) => `<p>${x.notice}</p>`).join('');
                }

                noticeHtml += '</div>';

                //$('.mfn-chft-apply-coupon').append();
              }

              $('.mfn-chft-apply-coupon-wrapper').prepend(noticeHtml);
              woocart.coupons.removeNotices();
            }
            
            button.removeClass('loading');

          }
        });

      },

      apply: function() {

        $(document).on('click', '.mfn-sidecart-apply-coupon-wrapper .mfn-sidecart-apply-coupon', function(e) {
          e.preventDefault();
          woocart.coupons.ajax();
        });

        $(document).on('keypress', '.mfn-sidecart-apply-coupon-wrapper .mfn-sidecart-apply-coupon-input', function(e) {
            if (e.which == 13) woocart.coupons.ajax();
        });

      },

      removeNotices: function() {
        setTimeout(function() {
          $('.mfn-chft-apply-coupon-wrapper .mfn-sidecart-notice').remove();
        }, 3000);
      }
    },

    start: function() {
        /*if( $('a#header_cart .header-cart-count').length ){
            if( $('#Top_bar a#header_cart .header-cart-count').text() == '0' ){
                $('.mfn-ch-footer-buttons').hide();
            }
        }*/

      return false;
    },

    click: function() {
        if($('body').hasClass('shop-sidecart-active') && $('.mfn-cart-holder').length ){
            $('html').toggleClass('mfn-cart-opened');
            woocart.force_open = false;
        }
    },

    refresh: function(){
      $.ajax({
        url: mfnwoovars.ajaxurl,
        data: {
            'mfn-woo-nonce': mfnwoovars.wpnonce,
            action: 'mfnrefreshcart'
        },
        type: 'POST',
        cache: false,
        success: function(response){
          $('.mfn-cart-holder .mfn-ch-content').html(response.content);
          $('.mfn-cart-holder .mfn-ch-footer .mfn-ch-footer-totals').html(response.footer);
          $('.mfn-cart-holder').removeClass('loading');

          // side cart buttons
          if( response.total == 0 ){
            $('.mfn-ch-footer-buttons').hide();
          }else{
            $('.mfn-ch-footer-buttons').show();
          }

          if( woocart.force_open ) woocart.click();

          return;
        }
      });
    },

    delete: function(id){
      $.ajax({
        url: mfnwoovars.ajaxurl,
        data: {
            'mfn-woo-nonce': mfnwoovars.wpnonce,
            action: 'mfnremovewooproduct',
            pid: id
        },
        type: 'POST',
        cache: false,
        success: function(response){
          $(document.body).trigger('wc_fragment_refresh');
          woocart.refresh();
          if($('body').hasClass('woocommerce-cart')){
            $('.woocommerce .shop_table .product-remove a.remove[data-product_id="'+id+'"]').trigger('click');
          }
        }
      });
    },

    updatequantity: function(id, qty) {
      $.ajax({
        url: mfnwoovars.ajaxurl,
        data: {
            'mfn-woo-nonce': mfnwoovars.wpnonce,
            action: 'mfnchangeqtyproduct',
            pid: id,
            qty: qty
        },
        type: 'POST',
        cache: false,
        success: function(response){
          $(document.body).trigger('wc_fragment_refresh');
          woocart.refresh();
          if($('body').hasClass('woocommerce-cart')){
            $('.woocommerce .shop_table .product-remove a.remove[data-product_id="'+id+'"]').parent().siblings('.product-quantity').find('input.qty').val(qty).trigger('change');
            $('.woocommerce-cart-form .button[name="update_cart"]').trigger('click');
          }

        }
      });
    }

  };

  woocart.coupons.init();

  var mfnFakeSale = {

    active: true,

    time: function() {
      let arr = [20000, 25000, 30000, 35000, 40000, 50000];
      return arr[Math.floor(Math.random()*arr.length)];
    },

    init: function() {

      if( $('body').hasClass('mfn-ui') ) return;

      if( mfnFakeSale.checkCookie("mfnFakeSale") ) mfnFakeSale.active = false;

      if( typeof mfn_fake_sale === 'undefined' || !mfnFakeSale.active ) return;

      let delay = typeof mfn_fake_sale.delay !== 'undefined' ? mfn_fake_sale.delay : 5;

      delay = parseFloat(delay)*1000;

      setTimeout(mfnFakeSale.show, delay);

      $(document).on('click', '.mfn-fake-sale-noti .mfn-fake-sale-noti-close', function(e) {
        e.preventDefault();
        mfnFakeSale.active = false;
        mfnFakeSale.hide();
        mfnFakeSale.addCookie(1, "mfnFakeSale");
      });

    },

    show: function() {
      var item = mfn_fake_sale.items[Math.floor(Math.random() * mfn_fake_sale.items.length)];

      var html = `<div class="mfn-fake-sale-noti mfn-fake-sale-noti-${mfn_fake_sale.position}">${item} ${mfn_fake_sale.closeable == '1' ? '<a href="/" class="mfn-fake-sale-noti-close"><span class="icon">&#10005;</span></a>' : ''}</div>`;

      $('body').append(html);

      setTimeout(mfnFakeSale.hide, 15000);
    },

    hide: function() {
      if( $('.mfn-fake-sale-noti').length ) {
        $('.mfn-fake-sale-noti').addClass('mfn-fake-sale-noti-out');
        setTimeout(function() {$('.mfn-fake-sale-noti').remove(); }, 500);
        if( mfnFakeSale.active ) mfnFakeSale.reset();
      }
    },

    reset: function() {
      setTimeout(mfnFakeSale.show, mfnFakeSale.time());
    },

    addCookie(days, cookie_name){
      let date=new Date();
      date.setTime(date.getTime()+(parseInt(days)*24*60*60*1000));
      let expires="; expires="+date.toGMTString();
      document.cookie=cookie_name+"=true"+expires+"; path=/";
    },

    checkCookie(cookie_name){
      var nameEQ = cookie_name+"=";
      var ca = document.cookie.split(';');
      for(var i=0;i<ca.length;i++){
        var c = ca[i];
        while(c.charAt(0)==' ') c = c.substring(1,c.length);
        if( c.indexOf(nameEQ) == 0 ) return c.substring(nameEQ.length,c.length)
      }
      return null
    }

  };


  var productgallery = {
    start: function() {

      if($('.flex-viewport').length){
        $loup = $('.woocommerce-product-gallery__trigger').clone(true).empty().appendTo('.flex-viewport');
        $('.woocommerce-product-gallery > .woocommerce-product-gallery__trigger').remove();

        if($('.woocommerce-product-gallery .mfn-wish-button').length){
          $('.woocommerce-product-gallery .mfn-wish-button').clone(true).appendTo('.flex-viewport');
          $('.woocommerce-product-gallery > .mfn-wish-button').remove();
          $(document).trigger('resize');
        }
      }else if( $('.woocommerce-product-gallery__trigger').length ){
        $('.woocommerce-product-gallery__trigger').empty();
      }

      if( $('.mfn-product-gallery').length ){
        if($('.flex-control-thumbs').length){
          $('.flex-control-thumbs').wrap('<div class="mfn-flex-control-thumbs-wrapper"></div>');
        }
        $('.woocommerce-product-gallery').imagesLoaded( function() {
          if( $('.mfn-thumbnails-left').length || $('.mfn-thumbnails-right').length ){
            productgallery.verticalThumbs();
          }else if( $('.mfn-thumbnails-bottom').length ){
            productgallery.horizontalThumbs();
          }
        });
      }

    },
    horizontalThumbs: function() {
        var $container = $('.mfn-product-gallery');
        var containerW = $container.outerWidth();
        var $scroller = $container.find('.flex-control-thumbs');
        var scrollerW = 0;

        $scroller.find('li').each(function() {
          $(this).addClass('swiper-slide');
          scrollerW += $(this).outerWidth();
        });

        if( !$container.length || !$scroller.length ){
          return;
        }

        if( scrollerW > containerW ){
          //return;
          $scroller.css({ 'justify-content': 'flex-start', 'width': '100%' });
          $('.mfn-flex-control-thumbs-wrapper').addClass('mfn-scroller-active');
        }

        $scroller.addClass('swiper-wrapper');

        var swiper_opts = {
          slidesPerView: 5,
          spaceBetween: parseInt(mfnwoovars.productthumbs),
        };


        $scroller.parent().addClass('mfn-arrows-absolute');
        $scroller.parent().append('<div class="swiper-button-next mfn-swiper-arrow"><i class="icon-right-open-big"></i></div><div class="swiper-button-prev mfn-swiper-arrow"><i class="icon-left-open-big"></i></div>');
        swiper_opts['navigation'] = {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        };

        var swiper = new Swiper(".mfn-flex-control-thumbs-wrapper", swiper_opts);
    },
    verticalThumbs: function() {
        var $container = $('.mfn-product-gallery');
        var containerH = $container.find('.woocommerce-product-gallery__image').first().outerHeight();
        var $scroller = $container.find('.flex-control-thumbs');
        var scrollerH = 0;
        var mimgm = 0; // main image margin
        var overlay = mfnwoovars.productthumbsover ? mfnwoovars.productthumbsover : 0;

        $scroller.find('li img').css({ 'height': 'auto' });
        $scroller.find('li').css({ 'height': 'auto' });

        $scroller.find('li').each(function() {
          $(this).addClass('swiper-slide').css({ 'margin-bottom': parseInt(mfnwoovars.productthumbs) });
          scrollerH += $(this).outerHeight()+parseInt(mfnwoovars.productthumbs);
          $(this).css({ 'opacity': '1' });
        });

        if(mfnwoovars.mainimgmargin == 'mfn-mim-2'){
          mimgm = 4;
        }else if(mfnwoovars.mainimgmargin == 'mfn-mim-5'){
          mimgm = 10;
        }else if(mfnwoovars.mainimgmargin == 'mfn-mim-10'){
          mimgm = 20;
        }else if(mfnwoovars.mainimgmargin == 'mfn-mim-15'){
          mimgm = 30;
        }else if(mfnwoovars.mainimgmargin == 'mfn-mim-20'){
          mimgm = 40;
        }else if(mfnwoovars.mainimgmargin == 'mfn-mim-25'){
          mimgm = 50;
        }else if(mfnwoovars.mainimgmargin == 'mfn-mim-30'){
          mimgm = 60;
        }

        if( !$container.length || !$scroller.length ){
          return;
        }

        $container.find('.flex-viewport').css({'height': 'auto'});

        if( scrollerH > containerH ){
          if(overlay == 'mfn-thumbnails-overlay'){
            $('.mfn-flex-control-thumbs-wrapper').height( (containerH-mimgm) );
          }else{
            $('.mfn-flex-control-thumbs-wrapper').height(containerH);
          }

          $scroller.css({ 'align-items': 'flex-start' });
          $('.mfn-flex-control-thumbs-wrapper').addClass('mfn-scroller-active');

          $scroller.addClass('swiper-wrapper');

          var swiper = new Swiper(".mfn-flex-control-thumbs-wrapper", {
            slidesPerView: 4,
            spaceBetween: parseInt(mfnwoovars.productthumbs),
            direction: "vertical",
            mousewheel: true,
          });

          $scroller.find('li').each(function() {
            $(this).find('img').css({ 'height': $(this).outerHeight() });
            $(this).css({ 'opacity': '1' });
          });

        }

        $container.find('.flex-viewport').css('height', containerH);

    }
  };

  $(window).on('debouncedresize', function() {
    if( $('.mfn-thumbnails-left').length || $('.mfn-thumbnails-right').length ){
        setTimeout(productgallery.verticalThumbs(), 300);
    }
  });

  var initPhotoSwipeFromDOM = function(gallerySelector) {

    var parseThumbnailElements = function() {
        var items = [];

    $(gallerySelector).find('div img').not('.zoomImg').each(function() {
        var img = $(this);
        var large_image_src   = img.attr( 'data-large_image' ),
              large_image_w   = img.attr( 'data-large_image_width' ),
              large_image_h   = img.attr( 'data-large_image_height' ),
              alt             = img.attr( 'alt' ),
              item            = {
                alt  : alt,
                src  : large_image_src,
                w    : large_image_w,
                h    : large_image_h,
                title: img.attr( 'data-caption' ) ? img.attr( 'data-caption' ) : img.attr( 'title' )
              };
            items.push( item );
      });

        return items;
    };

    var openPhotoSwipe = function(index) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            items;

        items = parseThumbnailElements();

        var options = {
          index: parseInt(index, 10),
          //showAnimationDuration: 0,
          getThumbBoundsFn: function(index) {
                var thumbnail = $('.mfn-product-gallery-grid .mfn-product-gg-img[data-index="'+index+'"] div img:first-child'),
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.offset();
                return {x:rect.left, y:rect.top, w:thumbnail.width()};
            }
        };

        if( isNaN(options.index) ) {
            return;
        }

        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    $('.mfn-product-gallery-grid a.woocommerce-product-gallery__trigger').on('click', function(e) {
        e.preventDefault();
        var index = $(this).closest('.mfn-product-gg-img').attr('data-index');
        openPhotoSwipe( index );
    });


    $('.mfn-product-gallery-grid .woocommerce-product-gallery__image a').on('click', function(e) {
      e.preventDefault();
      if( !$(this).closest('.elementor-widget-container').length ){
        $(this).closest('.mfn-product-gg-img').find('.woocommerce-product-gallery__trigger').trigger('click');
      }
    });

};


$(document).on('click', '.mfn-woocommerce-tabs .mfn-woocommerce-tabs-nav a', function(e) {
  e.preventDefault();
  if( $(this).parent('li').hasClass('active') ) return;

  $(this).parent().siblings('li').removeClass('active');
  $(this).closest('.mfn-woocommerce-tabs').find('.mfn-woocommerce-tabs-content.active').removeClass('active');

  $(this).parent('li').addClass('active');
  $($(this).attr('href')).addClass('active');

});

})(jQuery);
