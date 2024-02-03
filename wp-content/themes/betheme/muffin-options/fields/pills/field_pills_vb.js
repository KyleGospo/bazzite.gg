/* globals _, jQuery */
/* jshint esversion: 6 */

(function($) {

  "use strict";

  $(function($) {

    function init($input){

      var domLocation = $input;
      var instance = new PillField( domLocation );

      //calc the width on init!
      instance.resizeInputWidth();

    }

    function PillField(domLocation){
      var that = this;

      this.pills = [];
      this.domLocation = domLocation;
      this.userInputDOM = this.domLocation.find('.mfn-pills-input');
      this.hiddenInputDOM = this.domLocation.find('.mfn-pills-input-hidden');

      this.element = '.'+this.domLocation.closest('.mfn-form-row').data('element');


      this.checkForExistingClassess = function() {
        //we have to divide the input text, to make the array
        var inTextClasses = that.hiddenInputDOM.val().split(' ');

        that.pills = inTextClasses;
        if( '' == that.pills[0] ){
          that.pills = [];
        }else{
          that.refreshPillsOnFront();
        }

      };

      this.createPillsHTML = function(text){
        //dom pill creation
        var parent  = document.createElement('span');
        var removal = document.createElement('i');
            removal.classList.add("icon-cancel");

        $(removal).one('click', that.removeSelectedPill);

        return $(parent).append(removal).append(text);
      };

      this.refreshHiddenInput = function() {
        //update the backend input, not visible for user
        that.hiddenInputDOM.attr('value', that.pills.join(' ')).trigger('change');
        //MfnVbApp.getFieldChange( that.hiddenInputDOM );
        that.hiddenInputDOM.attr('name', that.hiddenInputDOM.attr('data-name'));
        return that.hiddenInputDOM.prop('value', that.pills.join(' '));
      };

      this.inputEvents = function(e) {
        var code = e.key;

        if( [" ", "Enter", "Tab"].includes( code ) ){

          e.preventDefault();
          that.pushWordToArray();
          that.userInputDOM.html('');

        } else if( "Backspace" === code ) {

          if( that.pills.length > 0 && that.userInputDOM.val().length === 0 ){
            that.pills.pop();
            that.userInputDOM.html('');
            that.refreshPillsOnFront();
          }

        }

      };

      this.resizeInputWidth = function(){
        //we need to calculate remaining space, to resize input
        var pills = $(that.domLocation).find('span');
        var boxWidth = $(that.domLocation).outerWidth();
        var widthTaken = 0;
        var actualHeight = 0;

        _.each(pills, function(pill){
          if( $(pill).position().top != actualHeight){
            widthTaken = 0;
            actualHeight = $(pill).position().top;
          }

          widthTaken += parseInt( $(pill).outerWidth(true) );
        });

        var calc = (boxWidth - widthTaken) - 25;
        return that.userInputDOM.css('width', calc+'px');
      };

      this.refreshPillsOnFront = function() {
        $(that.domLocation).find('span').remove();

        _.each(that.pills, (item) => {
          if(item === '') return;
          $( that.createPillsHTML(item) ).insertBefore( that.userInputDOM );
        });

        that.refreshHiddenInput();
      };

      this.pushWordToArray = function() {
        var cleanedText = _.without(that.userInputDOM.val(), ' ').join('').toString();

        //Table of contents, we need to block other types than heading!

        var hidden_attr_name = that.hiddenInputDOM.attr('name');
        var hidden_attr_dataname = that.hiddenInputDOM.attr('data-name');

        if( ( typeof hidden_attr_name !== 'undefined' && hidden_attr_name !== false && that.hiddenInputDOM.attr('name').indexOf('tags_anchors') !== -1) || ( typeof hidden_attr_dataname !== 'undefined' && hidden_attr_dataname !== false && hidden_attr_dataname.indexOf('tags_anchors') !== -1 ) ){
          var match = cleanedText.match(/(h|H)[1-7]/g);
          var hiddenInputValues = that.hiddenInputDOM.val().split(' ');

          if( match && hiddenInputValues.length <= 5){
            that.pills.push(match[0]);
          }

          that.refreshPillsOnFront();
          that.resizeInputWidth();
        }else if( cleanedText.length > 0 &&  !_.contains(that.pills, cleanedText) ){
          that.pills.push(cleanedText);

          if($content.find(that.element).length){
            $content.find(that.element).addClass(cleanedText);
          }

          that.refreshPillsOnFront();
          that.resizeInputWidth();
        }

        $(that.userInputDOM).val('');
      };

      this.removeSelectedPill = function(){
        //remove pill on click
        var selectedPill = $(this).closest('span');

        if($content.find(that.element).length){
          $content.find(that.element).removeClass(selectedPill.get(0).textContent);
        }

        that.pills = _.without(that.pills, selectedPill.get(0).textContent);
        selectedPill.remove();

        that.refreshPillsOnFront();
        that.resizeInputWidth();
      };

      this.focusHandler = function(e){

        if( e.type === 'focusin' ){
          $(that.domLocation).addClass('pills-focused');
        } else if( e.type === 'focusout' ){
          $(that.domLocation).removeClass('pills-focused');

          //if input won't be empty, then push pill
          that.pushWordToArray();
        }

      };

      // init

      this.checkForExistingClassess();

      /* WATCHERS */

      //click on the box

      $(this.domLocation).on('click', function(){
        $(that.userInputDOM)
          .trigger('focus')
          .off('click keydown')
          .on('keydown', that.inputEvents);
      });

      //regular input click

      $(this.userInputDOM).on('click', function(){
        $(that.userInputDOM)
          .off('click keydown')
          .on('keydown', that.inputEvents);
      });

      $(this.userInputDOM).on('focusin focusout', that.focusHandler);

      /* EO WATCHERS */
    }

    /* JUST FOR SHORTCODE EDITOR -- WHEN MOVING DOM, IT HAS TO BE RESTARTED */

    $(document).on('be:edit', function() {
      if( !$('.mfn-element-fields-wrapper .mfn-pills-field').hasClass('mfn-initialized') ){
        $('.mfn-element-fields-wrapper .mfn-pills-field:not(.mfn-initialized)').each(function() {
          $(this).addClass('mfn-initialized');
          init($(this));
        });
        
      }
    })

  });

})(jQuery);

