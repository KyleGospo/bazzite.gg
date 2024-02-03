(function($) {

  /* globals jQuery */

  "use strict";

  function mfnFieldAjax() {

    var $group = $('.mfn-ui .form-group.ajax');

    $group.on('click', '.mfn-btn', function(e) {

      e.preventDefault();

      var confirmed = $(this).attr('data-confirm');

      if ( confirmed || confirm( "Continue?" ) ) {

        var el = $(this),
          ajax = el.attr('data-ajax'),
          param = el.attr('data-param'),
          action = el.attr('data-action'),
          nonce = el.attr('data-nonce'),
          button_text = el.text();

        el.addClass('loading');

        var post = {
          'mfn-builder-nonce': nonce,
          action: action,
          post_type: param
        };

        $.post(ajax, post, function(data) {
          el.removeClass('loading');
          $('.btn-wrapper', el).text(data);

          setTimeout(function(){
            $('.btn-wrapper', el).text(button_text);
          },2000)

        });

      } else {
        return false;
      }

    });

  }

  /**
   * $(document).ready
   * Specify a function to execute when the DOM is fully loaded.
   */

  $(function() {
    mfnFieldAjax();
  });

})(jQuery);
