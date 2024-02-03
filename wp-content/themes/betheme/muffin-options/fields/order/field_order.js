/* globals _, jQuery */
/* jshint esversion: 6 */

(function($) {

  "use strict";

  $(function($) {

    var $input, $list;

    var observer,
      observerConfig = { attributes: true, childList: true, subtree: true };

    $(document).on('mfn:builder:edit', function( $this, modal ){

      $list = $(modal).find('.form-group.order-field').find('ul');
      $input = $(modal).find('.order-input-hidden');

      if( ! $list.length ){
        return;
      }

      observer = new MutationObserver(function(){

        var value = [];

        $list.find('li').each(function(){
          value.push( this.innerText.toLowerCase() );
        });

        $input.val( value );
      });

      observer.observe( $list[0], observerConfig );

    });

    $(document).on('mfn:builder:close', function( $this, modal ){
      if( observer ){
        observer.disconnect();
      }
    });

  });

})(jQuery);
