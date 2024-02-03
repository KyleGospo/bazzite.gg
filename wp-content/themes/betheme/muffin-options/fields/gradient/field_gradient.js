(function($) {

  /* globals jQuery */

  "use strict";

  var MfnFieldGradient = (function() {

    var group = '.gradient-form '; // all field including builder

    /**
     * Prepare pseudo value
     */

    function prepare( $el ){

      var $form = $el.closest( '.gradient-form' ),
        $hidden = $form.find('.mfn-field-value');

      var type = $form.find('.gradient-type').val();
      var color = $form.find('.gradient-color').val();
      var location = $form.find('.gradient-location').val();
      var color2 = $form.find('.gradient-color2').val();
      var location2 = $form.find('.gradient-location2').val();
      var position = $form.find('.gradient-position').val();
      var angle = $form.find('.gradient-angle').val();

      var val = '';

      if( type.length && color.length && location.length && (angle.length || position.length) && color2.length && location2.length ){

        val += type+'(';

        if( type == 'linear-gradient' ){
            val += angle+'deg, ';
        }else{
            val += 'at '+position+', ';
        }

        val += color+' ';
        val += location+'%, ';
        val += color2+' ';
        val += location2+'%)';

      }

      $hidden.val( val ).trigger('change');

    }

    /**
     * Attach events to buttons.
     */

    function bind() {

      $('.mfn-ui').on('change blur', group + '.mfn-form-input', function(e) {
        prepare( $(this) );
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
    MfnFieldGradient.init();
  });

})(jQuery);
