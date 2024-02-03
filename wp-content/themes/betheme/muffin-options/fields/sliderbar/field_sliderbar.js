(function($) {

  /* globals jQuery */

  "use strict";

  var group = '.form-group.range-slider '; // all field including builder

  var $on_load = $('.form-group.range-slider', '.mfn-options, .mfn-meta'); // theme options and page options only

  /**
   * Is numeric
   */

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Input change
   */

  function inputChange( $input ) {

    var $form = $input.closest('.form-group'),
      $hidden = $('.mfn-field-value', $form),
      $slider = $('.sliderbar', $form);

    var value = parseFloat($input.val()) || 0,
      min = parseFloat($input.attr( 'min' )),
      max = parseFloat($input.attr( 'max' )),
      unit = $input.attr('data-unit') || '';

    if( $('.mfn-slider-unit', $form).length ){
      var $active = $('.mfn-slider-unit li.active', $form);
      min = $active.attr('data-min');
      max = $active.attr('data-max');
      unit = $active.text();
    }

    if ( value && ( value < min || value > max ) ) {
      $input.addClass( 'error' );
    } else {
      $input.removeClass( 'error' );
    }

    if( $hidden.length ){
      if( value ){
        $hidden.val( value + unit ).trigger('change');
      } else {
        $hidden.val('').trigger('change');
      }
    }

    // update slider

    $slider.slider( 'value', value );

  }

  /**
   * Unit change
   */

  function unitChange( $el ) {

    var $li = $el.closest('li'),
      $form = $li.closest('.form-group'),
      $input = $('.mfn-form-input', $form),
      $slider = $('.sliderbar', $form);

    if( $li.hasClass('active') ){
      return;
    }

    $li.addClass('active')
      .siblings('li').removeClass('active');

    destroy( $slider );
    init( $slider );

    inputChange( $input );

  }

  /**
   * Destroy
   */

  function destroy( $slider ){

    $slider.slider( 'destroy' );

  }

  /**
   * Init
   */

  function init( $el ){

    if( $el.hasClass('ui-slider') ){
      return;
    }

    var $form = $el.closest('.form-group'),
      $input = $('.mfn-form-input', $form),
      $hidden = $('.mfn-field-value', $form);

    var value = $input.val(),
      std = $input.attr( 'placeholder' ),
      min = $input.attr('min') || 0,
      max = $input.attr('max') || 100,
      step = $input.attr('data-step') || 1,
      unit = $input.attr('data-unit') || '';

    if( $('.mfn-slider-unit', $form).length ){
      var $active = $('.mfn-slider-unit li.active', $form);
      min = $active.attr('data-min');
      max = $active.attr('data-max');
      step = $active.attr('data-step');
      unit = $active.text();
    }

    if( ! value && std ){
      value = std;
    }

    $el.slider({
      min: parseFloat(min),
      max: parseFloat(max),
      step: parseFloat(step),
      value: value || 0,
      slide: function(event, ui) {
        $input.val( ui.value );
        $input.removeClass( 'error' );
      },
      stop: function(event, ui) {
        $input.val( ui.value ).trigger('change');
        if( $hidden.length ){
          $hidden.val( ui.value + unit ).trigger('change');
        }
      }
    });

  }

	/**
   * $(document).ready
   * Specify a function to execute when the DOM is fully loaded.
   */

  $(function($){

    // theme options and page options on ready

    $('.sliderbar', $on_load).each(function() {
      init( $(this) );
    });

    // input value change

    $('.mfn-ui').on('blur', group + '.mfn-form-input', function() {
      inputChange($(this));
    });

    // unit

    $('.mfn-ui').on('click', group + '.mfn-slider-unit li a', function(e) {
      e.preventDefault();
      unitChange($(this));
    });

    // edit modal open

    $(document).on('mfn:builder:edit', function( $this, modal ){

      var $modal = $(modal);

      $('.sliderbar', $modal).each(function() {
        init( $(this) );
      });

    });

    // edit modal close

    $(document).on('mfn:builder:close', function( $this, modal ){

      var $modal = $(modal);

      $('.sliderbar', $modal).each(function() {
        destroy( $(this) );
      });

    });

  });

})(jQuery);
