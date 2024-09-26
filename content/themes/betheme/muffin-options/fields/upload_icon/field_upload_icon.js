(function($) {

  /* globals jQuery, wp */

  "use strict";

  var group = '.form-group.browse-icon:not(.multi) ';

  function mfnFieldUploadIcon() {

    $('.mfn-ui').on('click', group + '.mfn-button-upload', function(e) {

      e.preventDefault();

      var $form = $(this).closest('.form-group'),
        type = $('.mfn-form-input', $form).data('type');

      var mediaFrame = wp.media.frames.customHeader = wp.media({
        library: {
          type: type
        }
      });

      mediaFrame.on('select', function() {

        var attachment = mediaFrame.state().get('selection').first(),
          url = attachment.attributes.url;

        $($form).closest('.form-content').find('.error').hide();

        $('.mfn-form-input', $form).val(url).trigger('change');

      });

      mediaFrame.open();
    });

		$('.mfn-ui').on('click', group + '.mfn-button-delete', function(e) {

      e.preventDefault();

      var $form = $(this).closest('.form-group');

      $($form).closest('.form-content').find('.error').hide();

      $('.mfn-form-input', $form).val('').trigger('change');
    });

  }

  /**
   * $(document).ready
   * Specify a function to execute when the DOM is fully loaded.
   */

  $(function() {

    if( ! $('.mfn-uploaded-custom-icons').length ) {
      $('.mfn-row').removeClass('hidden');
    }

    mfnFieldUploadIcon();
  });

})(jQuery);
