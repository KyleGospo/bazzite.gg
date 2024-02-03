(function($) {

  /* globals jQuery */

  "use strict";

  function mfnFieldFontSelect($select) {

    var options = '',
      value;

    if( typeof mfn_google_fonts !== 'undefined' ){

      mfn_google_fonts.forEach((entry) => {
        options += '<option value="'+ entry +'">'+ entry +'</option>';
      });

      //options += '</optgroup>';

      // console.log(options);

      if( $select.find('optgroup[data-type="google-fonts"] option').length == 1 ){
        $select.find('optgroup[data-type="google-fonts"]').html(options);

        value = $select.attr('data-value');
        if( typeof value !== 'undefined' ){ $select.val(value); }

      }

    }

  }

  /**
   * $(document).ready
   * Specify a function to execute when the DOM is fully loaded.
   */

  $(function() {
    
    $(document).on('mousedown', '.mfn-form .form-group.font-family-select select', function() {
      mfnFieldFontSelect($(this));
    });

  });

})(jQuery);
