(function($) {

  /* globals jQuery */

  "use strict";

  function mfnFieldRadioImg() {

    var group = '.form-group.visual-options '; // all field including builder

    $('.mfn-ui').on('click', group + '.form-control li a', function(e) {

      var $li = $(this).closest('li');

      if($li.find('input').val() != 'custom_tmpl'){
        e.preventDefault();

        $li.siblings('li').removeClass('active').find('input').prop('checked', false);
        $li.addClass('active').find('input').prop('checked', true).trigger('change');

      }

    });

    // theme options - shop - custom template

    if( $('.mfn-ui .shop-layout-visual-choose .form-group.visual-options .form-control li input[value="custom_tmpl"]').length ){
      $('.mfn-ui .shop-layout-visual-choose .form-group.visual-options .form-control li input[value="custom_tmpl"]').closest('li').find('a').attr('href', 'edit.php?post_type=template&tab=shop-archive').attr('target', '_blank');
    }

    if( $('.mfn-ui .product-layout-visual-choose .form-group.visual-options .form-control li input[value="custom_tmpl"]').length ){
      $('.mfn-ui .product-layout-visual-choose .form-group.visual-options .form-control li input[value="custom_tmpl"]').closest('li').find('a').attr('href', 'edit.php?post_type=template&tab=single-product').attr('target', '_blank');
    }

  }

  /**
   * $(document).ready
   * Specify a function to execute when the DOM is fully loaded.
   */

  $(function($) {
    mfnFieldRadioImg();
  });

})(jQuery);
