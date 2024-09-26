(function($) {

  /* globals jQuery */
  // in visual used in shortcodes
  
  "use strict";

  var group = '.form-group.segmented-options:not(.settings) ';

  function mfnFieldSwitch() {

    $('.modal-add-shortcode').on('click', group + '.form-control li a', function(e) {

      e.preventDefault();

      var $li = $(this).closest('li');

      $li.addClass('active').find('input').prop('checked', 'checked');
      $li.siblings('li').removeClass('active').find('input').prop('checked', false);

    });

  }

  /**
   * $(document).ready
   * Specify a function to execute when the DOM is fully loaded.
   */

  $(function($) {
    mfnFieldSwitch();
  });

})(jQuery);
