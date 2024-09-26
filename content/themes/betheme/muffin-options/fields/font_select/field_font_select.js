(function($) {

  /* globals jQuery */

  "use strict";

  function mfnFieldFontSelect() {

    var $group = $('.mfn-ui .form-group.font-family-select');

    var options = '',
      value;

    if( typeof mfn_google_fonts !== 'undefined' ){

      mfn_google_fonts.forEach((entry) => {
        options += '<option value="'+ entry +'">'+ entry +'</option>';
      });

      options += '</optgroup>';

      // console.log(options);

      $('optgroup[data-type="google-fonts"]', $group).empty()
        .append(options);

      $group.each(function(index, $el){

        value = $('select', $el).attr('data-value');
        if( value ){
          $('select', $el).val(value);
        }

      });

    }

  }

  /**
   * $(document).ready
   * Specify a function to execute when the DOM is fully loaded.
   */

  $(function() {
    mfnFieldFontSelect();
  });

})(jQuery);
