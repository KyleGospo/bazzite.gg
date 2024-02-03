(function($) {

  /* globals jQuery */

  "use strict";

  function mfnFieldCheckbox() {

    var $group = $('.mfn-ui .form-group.checkboxes:not(.pseudo)');

    $group.on('click', 'li', function(e) {

      var $li = $(this);

      if( $li.hasClass('active') ){

        $li.removeClass('active');
        $li.children('input').prop('checked', false).trigger('change');

      } else {

        $li.addClass('active');
        $li.children('input').prop('checked', 'checked').trigger('change');

      }

    });

  }

  /**
   * $(document).ready
   * Specify a function to execute when the DOM is fully loaded.
   */

  $(function($) {
    mfnFieldCheckbox();
  });

})(jQuery);
