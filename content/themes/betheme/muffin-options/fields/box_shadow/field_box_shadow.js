(function($) {

  /* globals jQuery */

  "use strict";

  var MfnFieldBoxShadow = (function() {

    var group = '.form-group.multiple-inputs '; // all field including builder

    /**
     * Link values
     */

    function inset( $el ){

      var $form = $el.closest( '.form-group.multiple-inputs' ),
        $input = $('.boxshadow-inset', $form);

      if( $form.hasClass('isInset') ){

        $form.removeClass('isInset');

        $input.val('').trigger('change').trigger('keyup');

      } else {

        $form.addClass('isInset');

        $input.val('inset').trigger('change').trigger('keyup');

      }

    }

    /**
     * Attach events to buttons.
     */

    function bind() {

      $('.mfn-ui').on('click', group + '.inset', function(e) {
        e.preventDefault();
        inset( $(this) );
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
    MfnFieldBoxShadow.init();
  });

})(jQuery);
