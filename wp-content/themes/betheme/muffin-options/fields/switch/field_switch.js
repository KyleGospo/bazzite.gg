(function($) {

  /* globals jQuery, ajaxurl */

  "use strict";

  var group = '.form-group.segmented-options:not(.settings)';

  function mfnFieldSwitch() {

    // Theme Options - Cache

    function cache( $li ){

      var $oldValue = $li.siblings('input.old-value');

      if ( ! $oldValue.length ) {
        return;
      }

      var name = $oldValue.data('id');

      if ( $li.find('input').val() === $oldValue.val() ) {

        $.ajax({
          url: ajaxurl,
          data: {
            action: 'mfn_delete_transient',
            name: name
          }
        });

      } else {

        $.ajax({
          url: ajaxurl,
          data: {
            action: 'mfn_set_transient',
            name: name
          }
        });

      }

    }

    // single select

    $('.mfn-ui').on('click', group + ':not(.multiple-segmented-options) .form-control li a', function(e) {

      e.preventDefault();

      var $li = $(this).closest('li');

      $li.siblings('li').removeClass('active').find('input').prop('checked', false);
      $li.addClass('active').find('input').prop('checked', true).trigger('change');

      // Theme Options - Cache

      cache( $li );

    });

    // multiple select

    $('.mfn-ui').on('click', group + '.multiple-segmented-options .form-control li a', function(e) {

      e.preventDefault();

      var $li = $(this).closest('li'),
        $form = $li.closest( '.form-group' );
      var value = '';

      if( $li.hasClass('active') ){
        $li.removeClass('active').find('input').prop('checked', false);
      } else {
        $li.addClass('active').find('input').prop('checked', true);
      }

      $('li input:checked', $form).each(function() {
        value += ' ' + $(this).val();
      });

      $('.mfn-field-value', $form).val(value).trigger('change');

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
