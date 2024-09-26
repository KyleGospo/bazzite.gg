(function ($) {

  $(window).on("elementor/frontend/init", function () {

    var rtl = $('body').hasClass('rtl');

    function clientsSliderResponsive(slider, max, size, round = false) {

      if (!max){
        max = 5;
      }
      if (!size){
        size = 380;
      }

      var width = slider.width() || 0;
      var count;

      if ( round ) {
        count = Math.floor(width / size);
      } else {
        count = Math.ceil(width / size);
      }

      if (count < 1) count = 1;
      if (count > max) count = max;

      return count;
    };

    elementorFrontend.hooks.addAction("frontend/element_ready/mfn_clients_slider.default", function ($scope, $) {

      $scope.find('.clients_slider_ul').each(function () {

        var slider = $(this);

        var clientsPerSlide = slider.closest('.clients_slider').attr('data-client-per-slide') ? parseInt(slider.closest('.clients_slider').attr('data-client-per-slide')) : 4;
        var navigationPosition = slider.closest('.clients_slider').attr('data-navigation-position') || false;
        var appendArrows = ( navigationPosition == 'content' ) ? slider : slider.siblings('.blog_slider_header').children('.slider_navigation');
        var size = 400;

        var calc = () => clientsSliderResponsive(slider, clientsPerSlide, size - (clientsPerSlide * 40), true);
        var calcScroll = calc;
        var slidesToScroll = slider.closest('.clients_slider').attr('data-slides-to-scroll') ? parseInt(slider.closest('.clients_slider').attr('data-slides-to-scroll')) : calc();

        if( 1 === slidesToScroll ){
          calcScroll = () => clientsSliderResponsive(slider, 1, size - (clientsPerSlide * 40), true);
        }

        slider.slick({
          cssEase: 'ease-out',
          dots: false,
          infinite: true,
          touchThreshold: 10,
          speed: 300,

          prevArrow: '<a class="button the-icon slider_prev" href="#"><span class="button_icon"><i class="icon-left-open-big" aria-label="previous slide"></i></span></a>',
          nextArrow: '<a class="button the-icon slider_next" href="#"><span class="button_icon"><i class="icon-right-open-big" aria-label="next slide"></i></span></a>',
          appendArrows: appendArrows,

          rtl: rtl ? true : false,
          autoplay: mfn.slider.clients ? true : false,
          autoplaySpeed: mfn.slider.clients ? mfn.slider.clients : 5000,

          slidesToShow: calc(),
          slidesToScroll: calcScroll()
        });

        // ON | debouncedresize

        $(window).on('debouncedresize', function() {
          slider.slick('slickSetOption', 'slidesToShow', calc(), false);
          slider.slick('slickSetOption', 'slidesToScroll', calcScroll(), true);
        });

      });

    });

  });

})(jQuery);
