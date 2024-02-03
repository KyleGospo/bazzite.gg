(function($) {

  /* globals jQuery */

  "use strict";

  function mfnFieldMultiText() {

    var $group = $('.mfn-ui .form-group.sidebar-add');

    $group.on('click', '.mfn-btn-delete', function(e) {

      e.preventDefault();

      var $form = $(this).closest('.form-group');

      $(this).parent().fadeOut( 200, function() {

        $(this).remove();

        if( 1 >= $('.added-sidebars ul li', $form).length ){
          $form.addClass('empty');
        }

      });

    });

    $group.on('click', '.sidebar-add-button', function(e) {

      e.preventDefault();

      var $form = $(this).closest('.form-group'),
        $clone = $('li.default', $form).clone(true);

      var val = $('.mfn-form-input', $form).val();

      if( ! val ){
        return false;
      }

      $('.added-sidebars ul', $form).append( $clone );

      // $clone = $('.added-sidebars ul li:last-child', $form);

      $clone.removeClass('default')
        .hide().fadeIn(200);

      $clone.find('input').val( val )
        .attr('name', $clone.find('input').data('name') );
      $clone.find('.sidebar-title').text( val );

      $('.mfn-form-input', $form).val('');

      $form.removeClass('empty');

    });

  }

  /**
   * $(document).ready
   * Specify a function to execute when the DOM is fully loaded.
   */

  $(function($) {
    mfnFieldMultiText();
  });

})(jQuery);
