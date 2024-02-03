(function($) {

  /* globals jQuery */

  "use strict";

  var MfnFieldBoxshadow = (function() {

    var $group = $('.mfn-ui .form-group.multiple-inputs-with-color');

    /**
     * Change field values on keypress
     */

    function changeVal( $el, key ){

      var $form = $el.closest( '.form-group' );

      var val = $el.val();

      if( 38 == key.which ){
        val = parseInt( val ) + 1;
        $el.val( val );
      }

      if( 40 == key.which ){
        val = parseInt( val ) - 1;
        $el.val( val );
      }

      if( $form.hasClass('isLinked') ){
        $( '.disableable input', $form ).val( val );
      }

      $( '.numeral', $form ).trigger( 'change' );

    }

    /**
     * Inset values
     */

    function inset( $el ){

      var $form = $el.closest( '.form-group' ),
        $input = $( 'input', $el );

      var val = $('input[data-key="top"]', $form).val();

      if( 1 == $input.val() ){

        $input.val(0);
        $form.removeClass('isInset');

      } else {

        $input.val(1);
        $form.addClass('isInset');

      }

    }

    /**
     * Attach events to buttons.
     */

    function bind() {

      $( '.numeral', $group ).on('keyup', function(key) {
        changeVal( $(this), key );
      });

      $( '.inset', $group ).on('click', function(key) {
        inset( $(this) );
      });

      $('.color-mirror-source', $group).on('change input', function(key) {
        var newValue = $(key.target).val();
        $('.color-mirror input').val(newValue);
      })

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
    MfnFieldBoxshadow.init();
  });

})(jQuery);
