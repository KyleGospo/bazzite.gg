(function($) {

  /* globals jQuery, wp */

  "use strict";

  var group = '.form-group.browse-image:not(.multi) ';

  function mfnFieldUpload() {

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
          url = attachment.attributes.url,
          id = attachment.attributes.id || 0;

        $form.removeClass('empty');

        $('.selected-image img', $form).attr('src', url);
        $('.mfn-form-input', $form).val(url +'#'+ id).attr('data-id', id).trigger('change');

      });

      mediaFrame.open();
    });

		$('.mfn-ui').on('click', group + '.mfn-button-delete', function(e) {

      e.preventDefault();

      var $form = $(this).closest('.form-group');

      $form.addClass('empty');

      $('.selected-image img', $form).attr('src', '');
      $('.mfn-form-input', $form).val('').trigger('change');
    });

  }

  /**
   * $(document).ready
   * Specify a function to execute when the DOM is fully loaded.
   */

  $(function() {
    mfnFieldUpload();
  });

})(jQuery);
