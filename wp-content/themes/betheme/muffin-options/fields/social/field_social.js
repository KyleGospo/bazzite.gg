(function($) {

  /* globals jQuery */

  "use strict";

  function mfnFieldSocial() {

    var group = '.form-group.social-icons ';

    // init

    function init( $el ){

      $('.social-wrapper', $el).sortable({
        axis: 'y',
        cursor: 'ns-resize',
        handle: '.drag, .label',
        opacity: 0.9,
        stop: function( event, ui ) {

          var $wrapper = ui.item.closest('.social-wrapper');
          var icons = [];

          $('li', $wrapper).each(function(){
            icons.push( $(this).data('key') );
          });

          icons = icons.join(',');

          $wrapper.siblings('.social-order').val( icons );
        }
      });

    }

    init( group );

  }

  /**
   * $(document).ready
   * Specify a function to execute when the DOM is fully loaded.
   */

  $(function($) {
    mfnFieldSocial();
  });

})(jQuery);
