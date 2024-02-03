(function($) {

  /* globals jQuery */

  "use strict";

  var MfnFieldTypographyVB = (function() {

    var group = '.form-content.toggle_fields ';

    /**
     * Toggle form
     */

    function toggle( $el ){

      var $form = $el.closest('.form-content.toggle_fields');

      $form.toggleClass('active');

    }

    /**
     * Attach events to buttons.
     */

    function bind() {

      $('.mfn-ui').on('click', group + '.mfn-typo-button', function(e) {
        e.preventDefault();
        toggle( $(this) );
      });

      // close on click outside

      $('.mfn-modal').on('mouseup', function(e) {
        if( $('.mfn-toggled.active').length && $('.mfn-toggle-fields-wrapper').length && ( ! $('.mfn-toggle-fields-wrapper').is(e.target) && $('.mfn-toggle-fields-wrapper').has(e.target).length === 0 ) ) {
          $('.mfn-toggled.active').removeClass('active');
        }
      });

    }

    /**
     * Runs whole script.
     */

    function init() {
      bind();
    }

    /**
     * Return
     * Method to start the closure
     */

    return {
      init: init
    };

  })();

  /**
   * $(document).ready
   * Specify a function to execute when the DOM is fully loaded.
   */

  $(function() {
    MfnFieldTypographyVB.init();
  });

})(jQuery);
