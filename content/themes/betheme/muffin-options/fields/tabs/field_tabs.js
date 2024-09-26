(function($) {

  /* globals jQuery */

  "use strict";

  function mfnFieldTabs() {

    var group = '.form-group.tabs ';

    // add

    $('.mfn-ui').on('click', group + '.mfn-button-add', function(e) {

      e.preventDefault();

      var $form = $(this).closest('.form-group'),
        $clone = $('li.default', $form).clone(true);

      $('.tabs-wrapper', $form).append( $clone );

      $clone.find('input, textarea').each(function(){
        $(this).attr('name', $(this).data('default') )
          .removeAttr('data-default');
      });

      $clone.siblings().removeClass('show');

      $clone.removeClass('default').addClass('show')
        .hide().fadeIn(200);

    });

    // delete

    $('.mfn-ui').on('click', group + '.mfn-tab-delete', function(e) {

      e.preventDefault();

      $(this).closest('.tab').fadeOut( 200, function() {
        $(this).remove();
      });

    });

    // clone

    $('.mfn-ui').on('click', group + '.mfn-tab-clone', function(e) {

      e.preventDefault();

      var $tab = $(this).closest('.tab'),
        $clone = $tab.clone(true);

      $tab.removeClass('show').after( $clone );

      $clone.hide().fadeIn(200);

    });

    // toggle

    $('.mfn-ui').on('click', group + '.mfn-tab-toggle', function(e) {

      e.preventDefault();

      var $tab = $(this).closest('.tab');

      $('input', $tab).trigger('change');

      $tab.toggleClass('show')
        .siblings().removeClass('show');

    });

    // move title to header

    $('.mfn-ui').on('change', group + '.js-title', function(e) {

      e.preventDefault();

      var $tab = $(this).closest('.tab');

      var val = $(this).val();

      $('.tab-header .title', $tab).text(val);

    });

    // sort

    $(document).on('mfn:builder:edit', function( $this, modal ){

      var $modal = $(modal);

      $('.tabs-wrapper', $modal).sortable({
        axis: 'y',
        cursor: 'ns-resize',
        handle: '.tab-header',
        opacity: 0.9
      });

    });

    $(document).on('mfn:builder:close', function( $this ){

      $('.tabs-wrapper.ui-sortable').sortable('destroy');

    });

  }

  /**
   * $(document).ready
   * Specify a function to execute when the DOM is fully loaded.
   */

  $(function($) {
    mfnFieldTabs();
  });

})(jQuery);
