(function($) {

  /* globals jQuery, wp */

  "use strict";

  var group = '.form-group.dynamic-items ',
    selector = '.dynamic-items';

  function MfnDynamicItems() {

    // update input names

    function updateOrder( $preview ){

      const regex = /\[dynamic_items\]\[[0-9]*\]/i;

      $preview.find('li').each(function(index, $el){
        $('input', $el).each(function(){
          var name = $(this).attr('name');
          var name2 = name.replace(regex, '[dynamic_items]['+index+']');
          $(this).attr('name', name2);
        });
      });

    }

    // add new item

    function addNew(){

    }

    // type change

    $('.mfn-ui').on('change', '.dynamic_items_wrapper .di-input-rule select', function() {
      var val = $(this).val();
      $(this).parent().siblings('.di-input-wrapper').removeClass('di-input-active');
      $(this).parent().siblings('.di-if-'+val).addClass('di-input-active');
    });

    // item remove

    $('.mfn-ui').on('click', '.dynamic_items_wrapper .di-remove', function(e) {

      e.preventDefault();

      var $preview = $(this).closest('.dynamic_items_preview');

      $(this).closest('li').remove();

      updateOrder($preview);

    });

    // item add

    $('.mfn-ui').on('click', '.mfn-modal-payments ul.mfn-items-list li a', function(e) {

      e.preventDefault();

      var url = $(this).find('img').attr('src'),
        id = $(this).find('.titleicon').text(),
        uid = Math.random().toString(36).substr(2, 9);

      var $form = $(this).closest(group),
        $preview = $('.dynamic_items_preview',$form),
        $clone = $('.new-item-wrapper li', $form).clone(true,true);

      $clone.find('input').each(function(){
        var name = $(this).attr('data-name');
        $(this).attr('name',name).removeAttr('data-name');
      });

      $clone.find('img').attr('src',url);
      $clone.find('input.url').val(url);
      $clone.find('input.id').val(id);
      $clone.find('input.uid').val(uid);

      $(document).trigger('mfn:modal:close');

      $preview.append($clone);

      updateOrder($preview);

    });

    // custom item add

    $('.mfn-ui').on('change', '.dynamic_items_wrapper .browse-image .mfn-field-value', function() {

      var url = $(this).val(),
        id = $(this).attr('data-id'),
        uid = Math.random().toString(36).substr(2, 9);

      var $form = $(this).closest(group),
        $preview = $('.dynamic_items_preview',$form),
        $clone = $('.new-item-wrapper li', $form).clone(true,true);

      $clone.find('input').each(function(){
        var name = $(this).attr('data-name');
        $(this).attr('name',name).removeAttr('data-name');
      });

      $clone.find('img').attr('src',url);
      $clone.find('input.url').val(url);
      $clone.find('input.id').val(id);
      $clone.find('input.uid').val(uid);
      $clone.find('input.type').val('custom');

      $(this).val(''); // empty input

      $preview.append($clone);

      updateOrder($preview);

    });

    // modal open

    $('.mfn-ui').on('click', '.dynamic_items_wrapper .di-show-modal', function(e) {
      var id = $(this).attr('data-modal');

      $(document).trigger('mfn:modal:open', $('#'+id));
    });

    // sortable

    $(document).on('mfn:builder:edit', function( $this, modal ){

      var $el = $('.dynamic-items .dynamic_items_preview', modal),
        $parent = $el.closest(selector);

      if ( $el.length ) {

        // init sortable

        if ( ! $el.hasClass( 'ui-sortable' ) ) {
          $el.sortable({
            opacity: 0.9,
            update: function() {
              updateOrder($el);
            }
          });
        }

        // enable inactive sortable

        if ( $el.hasClass( 'ui-sortable-disabled' ) ) {
          $el.sortable( 'enable' );
        }

      }

    });

    // sortable destroy

    $(document).on('mfn:builder:close', function( $this ){

      $('.dynamic_items_preview.ui-sortable').sortable('destroy');

    });

  }

  /**
   * $(document).ready
   * Specify a function to execute when the DOM is fully loaded.
   */

  $(function() {
    MfnDynamicItems();
  });

})(jQuery);
