(function($) {

  /* globals jQuery */

  "use strict";

  var MfnFieldDimensions = (function() {

    var group = '.form-group.multiple-inputs '; // all field including builder

    /**
     * Change field values on keypress
     */

    function changeVal( $el, key ){

      var $form = $el.closest( '.form-group.multiple-inputs' );

      var val = $el.val();

      if( val && ( ! isNaN(val) ) ){
        val += 'px';
        $el.val( val );
      }

      if( $form.hasClass('isLinked') ){
        $( '.disableable input', $form ).val( val );
      }

      $( '.numeral', $form ).trigger( 'change' );

      if( $form.hasClass('pseudo') ){
        pseudo.change( $form );
      }

    }

    /**
     * Link values
     */

    function link( $el ){

      var $form = $el.closest( '.form-group.multiple-inputs' );

      var val = $('input.field-top, input.field-0', $form).val();

      if( $form.hasClass('isLinked') ){

        $form.removeClass('isLinked');

        $( '.disableable input', $form )
          .removeClass('readonly').removeAttr('readonly');

      } else {

        $form.addClass('isLinked');

        $( '.disableable input', $form ).val(val).trigger('change')
          .addClass('readonly').attr('readonly','readonly');

        pseudo.change( $form );

      }

    }

    /**
     * Pseudo field
     */

    var pseudo = {

      // pseudo.change()

      change: function( $form ){

        var val = [],
          value = 0,
          empty = true;

        $('.mfn-form-input', $form).each(function(){

          value = $(this).val() || 0;

          if( value && ( ! isNaN(value) ) ){
            value += 'px';
          }

          if( value ){
            empty = false;
          }

          if( ! value && $(this).hasClass('boxshadow-inset') ){
            value = ''; // box shadow not inset
          }

          val.push(value);

        });

        if( empty ){
          val = '';
        } else {
          val = val.join(' ');
        }

        $('input.pseudo-field', $form).val(val).trigger('change');

      }

    }

    /**
     * Attach events to buttons.
     */

    function bind() {

      $('.mfn-ui').on('blur', group + '.mfn-form-input', function(key) {
        changeVal( $(this), key );
      });

      $('.mfn-ui').on('click', group + '.link', function(e) {
        e.preventDefault();
        link( $(this) );
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
    MfnFieldDimensions.init();
  });

})(jQuery);
