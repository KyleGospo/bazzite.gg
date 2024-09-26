(function($) {

  /* globals jQuery */

  "use strict";

  function MfnFieldCheckboxPseudo() {

    var group = '.form-group.checkboxes.pseudo ';

    $('.mfn-ui').on('click', group + 'li', function(e) {

      var $form = $(this).closest('.form-group'),
        $li = $(this);

      if( $li.hasClass('active') ){

        $li.removeClass('active');
        $li.children('input').prop('checked', false);

      } else {

        $li.addClass('active');
        $li.children('input').prop('checked', true);

      }

      // set pseudo input value

      var value = '';

      $('input:checked', $form).each(function() {
        value = value + ' ' + $(this).val();
      });

      $('input.value', $form).val( value ).trigger('change');

    });


  }

  /**
   * $(document).ready
   * Specify a function to execute when the DOM is fully loaded.
   */

  $(function($) {
    MfnFieldCheckboxPseudo();
  });

})(jQuery);
