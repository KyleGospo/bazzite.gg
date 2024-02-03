(function($) {

  /* globals _, fieldVisualJS, quicktags, tinymce, wp */

  "use strict";

  var MfnFieldVisual = (function() {

    var __shortcodeManager = {};
    var __editorSettings = {};
    var newEditor = true;

    function init() {

      if ( typeof window.wpEditorL10n === "undefined" ) {
        newEditor = false;
      }

      bind();

      if (newEditor) {
        mergeSettings();
      }

    }

    /**
     * Bind events
     */

    function bind() {

      // event fired after popup created, before show

      $(document).on('mfn:builder:edit', function( $this, modal ) {
        create( $(modal) );
      });

      // event fired after popup close, before destroy

      $(document).on('mfn:builder:close', function( $this, modal ) {
        destroy( $(modal) );
      });

    }

    /**
     * Merge Settings
     */

    function mergeSettings() {
      __editorSettings = {
        tinymce: _.extend(
          window.wpEditorL10n.tinymce.settings, {
            menubar: false,
            statusbar: false,
            external_plugins: {
              'mfnsc': fieldVisualJS.mfnsc,
            },
            toolbar1: "formatselect,bold,italic,bullist,numlist,blockquote,alignleft,aligncenter,alignright,link,wp_more,spellchecker,dfw,wp_adv,mfnsc",
            toolbar2: "strikethrough,hr,forecolor,pastetext,removeformat,charmap,outdent,indent,undo,redo,wp_help",
            //tinymce events
            init_instance_callback: function(editor){
              var keyFired = _.debounce(function(e){
                __scLinter.methods.changeWatcher();
                __scEditor.methods.moveWatcher(e);

                __scLinter.methods.removeLineNumbers();
              }, 150);

              var removeTooltip = function(){
                __scEditor.methods.tooltip.hide()
              }

              editor.on('click', keyFired);

              //tooltip have to be hidden when typing!
              editor.on('keydown', removeTooltip);
            },
          }
        ),
      };

      __shortcodeManager = {
        tinymce: _.extend(
          wp.oldEditor, {
            shortcodeManager: {
              getContent: () => tinymce.activeEditor.dom.doc.body.childNodes,
              getCursorLocation: () => tinymce.activeEditor.selection.getSel()
            }
          }
        )
      }
    }

    /**
     * Create Tiny MCE instance
     * https://developer.wordpress.org/reference/functions/wp_editor/
     */

    function create( $modal ) {

      var $editor = $( 'textarea[data-visual]', $modal );

      if( ! $editor.length ){
        return false;
      }

      try {

        $editor.attr( 'id', 'mfn-editor' ); // add index when change used inside $.each

        $('#content-tmce.wp-switch-editor').click();

        quicktags({
          id: 'mfn-editor'
        });

        if ( newEditor ) {
          wp.oldEditor.initialize('mfn-editor', __editorSettings);
        } else {
          tinymce.execCommand('mceAddEditor', true, 'mfn-editor');
        }

        $('.switch-html', $modal).click(function() {
          $(this).closest('.wp-editor-wrap').removeClass('tmce-active').addClass('html-active');
        });

        $('.switch-tmce', $modal).click(function() {
          $(this).closest('.wp-editor-wrap').removeClass('html-active').addClass('tmce-active');
        });

        setTimeout(function(){
          $('#mfn-editor_ifr').contents().find('body').attr('style','background-color:#F2F6FA');
        }, 500);

      } catch (err) {}

    }

    /**
     * Destroy Tiny MCE instance
     * Prepare data to save in WP friendly format
     */

    function destroy( $modal ) {

      var $editor = $('#mfn-editor');

      var editorContent = '';

      if( ! $editor.length ){
        return false;
      }

      try {
        // try/catch: tinymce or quicktags may not exist in WP 5.0+

        if ( ! tinymce.getContent ) {
          tinymce.execCommand( 'mceToggleEditor', false, 'mfn-editor' );
        }

        /*
         * Do NOT change order of below lines
         * Get editor content, save it to variable, destroy editor, set textarea content
         */

        editorContent = tinymce.get( 'mfn-editor' ).getContent();

        $( '.wp-editor-wrap', $modal ).removeClass( 'html-active' ).addClass( 'tmce-active' );

        if ( newEditor ) {
          wp.oldEditor.remove( 'mfn-editor' );
        } else {
          tinymce.execCommand( 'mceRemoveEditor', false, 'mfn-editor' );
        }

        $editor.val( editorContent );

      } catch (err) {}

      $editor.removeAttr('id').trigger('change');

    }

    let __scLinter = {

      shortcodes:{

        content: ['alert', 'blockquote', 'dropcap', 'highlight', 'tooltip', 'tooltip_image', 'heading', 'google_font', 'alert', 'idea', 'popup', 'code'],
        noContent: ['button', 'icon_block', 'fancy_link', 'image', 'idea_block', 'progress_icons', 'hr',  'content_link', 'icon_bar', 'divider', 'icon', 'countdown_inline', 'counter_inline', 'sharebox'],

        inTextarea: [],
        wholeLines: [],

        regex: /\[(.*?)?\](?:([^\[]+)?\[\/\])?/,

      },

      methods:{

        removeSlash: (name) => _.without(name, '/').join('').toString(),
        checkIfHasContent: (name) => _.contains(__scLinter.shortcodes.content, __scLinter.methods.removeSlash(name)),

        parseScFromLines: (line, lineNr) => {
          //parser, check by letter
          let shortcode = {line: lineNr, bracket1: undefined, bracket2: undefined, content: '', attributes: []},
              bracketOpen = false,
              spacePressed = false,
              attributesString = '';

          _.each(line, function(letter, pos) {

            switch(true){
              case ('[' === letter && !bracketOpen):
                bracketOpen = true;
                shortcode.bracket1 = pos;
                break;
              case ('[' === letter && bracketOpen):
                shortcode.bracket1 = pos;
                shortcode.content = '';
                break;
              case (' ' === letter && bracketOpen && !spacePressed):
                spacePressed = true;
                break;
              case (spacePressed && letter === ']' && !_.contains( _.flatten([__scLinter.shortcodes.content, __scLinter.shortcodes.noContent]), shortcode.content)):
                spacePressed = false;
                bracketOpen = false;
                shortcode = {...shortcode, bracket1: undefined, bracket2: undefined, content: ''};
                attributesString = '';
                break;
              case (' ' === letter && !bracketOpen):
                break;
              case ('/' === letter && !spacePressed):
              case(bracketOpen && !_.contains([ ']', '[', ' '], letter) && !spacePressed):
                shortcode.content += letter;
                break;
              case (']' === letter && _.contains( _.flatten([__scLinter.shortcodes.content, __scLinter.shortcodes.noContent]), shortcode.content)):
              case ('/' === shortcode.content[0] &&  _.contains(__scLinter.shortcodes.content, __scLinter.methods.removeSlash(shortcode.content))):
              case (']' === letter && spacePressed &&  _.contains(__scLinter.shortcodes.noContent, shortcode.content)):
                shortcode.attributes = __scLinter.methods.getAttributes(attributesString);
                shortcode.bracket2 = pos+1;
                __scLinter.shortcodes.inTextarea.push(shortcode);

                bracketOpen = false;
                spacePressed = false;
                attributesString = '';
                shortcode = {...shortcode, bracket1: undefined, bracket2: undefined, content: ''};
                break;
              case (spacePressed && bracketOpen):
                attributesString += letter;
                break;
              default:
                bracketOpen = false;
                shortcode = {...shortcode, bracket1: undefined, bracket2: undefined, content: ''};
                break;
            }
          });
        },

        getAttributes: (attributesString) => {
          //for parser (function above), just get the attributes from shortcodes in CM
          const attributes = [];
          let attribute = {isOpened: false, name:'', value: ''},
              quoteCount = 0;


          _.each(attributesString, (letter) => {
            switch(true){
              case (!_.contains(['=', ' '], letter)&& !attribute.isOpened):
                attribute.name += letter;
                break;
              case ('=' === letter):
                attribute.isOpened = true;
                break;
              case (attribute.isOpened):
                if('"' == letter) quoteCount++;
                if(quoteCount === 2) {
                  attributes.push({name: attribute.name, value: attribute.value });

                  attribute.isOpened = false;
                  attribute.value = '';
                  attribute.name = '';
                  quoteCount = 0;
                }else if('"' != letter){
                  attribute.value += letter;
                }

                break;
            }
          });

          return attributes;
        },

        ifShortcodePushToArray: (lineContent, lineNr) => {

            if(__scLinter.shortcodes.regex.test(lineContent)){
              __scLinter.methods.parseScFromLines(lineContent, lineNr);
              __scLinter.shortcodes.wholeLines.push({...lineContent, line: lineNr});
            }

        },

        iterateAndSetLines: () => {
          __scLinter.shortcodes.inTextarea = [];
          __scLinter.shortcodes.wholeLines = [];

          var lines = wp.oldEditor.shortcodeManager.getContent();
          var lineNr = 0;
          lines.forEach(line => {
            $(line).attr('data-line', lineNr);

            __scLinter.methods.ifShortcodePushToArray($(line).text(), lineNr);

            lineNr++;
          })
        },

        removeLineNumbers: () => {
          var lines = wp.oldEditor.shortcodeManager.getContent();
          $(lines).removeAttr('data-line');
        },

        changeWatcher: () => {
          __scLinter.methods.iterateAndSetLines()
        },

      }

    };

    let __scEditor = {
      allShortcodesDOM : $('.mfn-isc-builder'),
      shortcodeParentDOM: $('.mfn-sc-editor'),
      shortcodeModal: $('.modal-add-shortcode'),
      shortcode: {
        focusedBrackets1: {line:0, bracket1: 0, bracket2:0, content: '', attributes:[]},
        focusedBrackets2: {line:0, bracket1: 0, bracket2:0, content: '', attributes:[]}
      },

      iframeContent: () => $('#mfn-editor_ifr').contents(),
      methods:{

        tooltip:{
          isDisplayed: false,
          instance: undefined,
          turnOn: function(){
            __scEditor.methods.tooltip.instance = new tinymce.ui.Menu({
              items: [{
                text: "Edit",
                onclick: function() {
                  let clickedSc = __scEditor.shortcode.focusedBrackets1.content,
                      scName = clickedSc[0] !== "/"
                        ? clickedSc.charAt(0)+ clickedSc.slice(1)
                        : clickedSc.charAt(1) + clickedSc.slice(2);

                  let shortcodeDOM = $(__scEditor.allShortcodesDOM).find(`.mfn-isc-builder-${scName}`);

                  //Append fields + display modal
                  __scEditor.shortcodeParentDOM.find('.modalbox-content').empty().append( shortcodeDOM.clone(true) );
                  __scEditor.shortcodeModal.addClass('show');

                  __scEditor.methods.modal.prepareToEdit(__scEditor.shortcodeParentDOM.find(`.mfn-isc-builder-${scName}`));
                  }
              },
              {
                text: "Delete",
                onclick: function() {
                  __scEditor.methods.replaceShortcode(' ');
                }
              },
            ],
              context: "contextmenu",
              onhide: function() {
                __scEditor.methods.tooltip.hide();
              }
            });

            //Render!
            console.log($('.mce-tinymce'));

            __scEditor.methods.tooltip.instance.renderTo($('.mce-tinymce'));
            __scEditor.methods.tooltip.isDisplayed = true;
          },
          hide: function(){
            if(__scEditor.methods.tooltip.isDisplayed){
              __scEditor.methods.tooltip.isDisplayed = false;
              __scEditor.methods.tooltip.instance.remove();
            }
          },
          toggle: (e) => {
            let shortcodeFocused = __scEditor.shortcode.focusedBrackets1;

            if(!shortcodeFocused){
              //remove the event of scroll when not focused
              $( __scEditor.iframeContent() ).off('scroll');
              return;
            }else if(!__scEditor.methods.tooltip.isDisplayed){

              //in case, when sc is not closed or does not have closing tag
              //do nothing, prevent doing anything!
              switch(true){
                case __scLinter.methods.checkIfHasContent(shortcodeFocused.content) && !__scEditor.shortcode.focusedBrackets2.content:
                case _.contains(['sharebox'], shortcodeFocused.content):
                  return;
              }

              __scEditor.methods.tooltip.turnOn(e.clientX, e.clientY);
              __scEditor.methods.tooltip.instance.moveTo(e.clientX, e.clientY);

              //remove tooltip when scrolling
              $( __scEditor.iframeContent() ).one('scroll', function(){
                shortcodeFocused = undefined;
                __scEditor.methods.tooltip.hide();
              });
            }

          },

          acceptButtonWatcher: () => {
            const acceptButton = __scEditor.shortcodeParentDOM.find('.btn-modal-close-sc');

            const acceptButtonFooter = $(__scEditor.shortcodeParentDOM).find('.modalbox-footer .btn-modal-close-sc');
                  acceptButtonFooter.html('Update');

            $(acceptButton).one('click', function(e){
              try{

                //get name, attrs of actual shortcode
                const shortcodeName = __scEditor.shortcodeParentDOM.find('[data-shortcode]').attr('data-shortcode');
                const shortcodeAttributes = __scEditor.shortcodeParentDOM.find('input[data-name], select[data-name], textarea[data-name]');

                //for security reasons, prevent making [undefined]
                if(!shortcodeName) return;

                __scEditor.methods.modal.createShortcode(shortcodeName, shortcodeAttributes);

                //fix for iris error
                __scEditor.shortcodeModal.trigger('click');
                setTimeout(function(){
                    //make it look like creating shortcode by removing html and triggering modal:close
                    __scEditor.shortcodeModal.removeClass('show');
                  }, 50
                );



                //important! it prevents further event bubbling.
                return false;
              }catch(err){
                //
              }
            });

          }

        },

        modal: {

          prepareToEdit: (modal) => {
            let modalInputs = $(modal).find(`select, input, textarea`),
                shortcodeAttr = _.isEmpty(__scEditor.shortcode.focusedBrackets1.attributes)
                  ? __scEditor.shortcode.focusedBrackets2.attributes
                  : __scEditor.shortcode.focusedBrackets1.attributes;

            //for each attribute, you have to set the existing value
            _.each(shortcodeAttr, (attr) => {

              let modalAttr = $(modalInputs).closest(`[data-name="${attr.name}"]`)[0];
              //not existing attrs, must be avoided
              if(!modalAttr) return;

              switch(true){
                case 'checkbox' === modalAttr.type:
                  const liParent = $(modalAttr).closest('.segmented-options'),
                        newActiveLi = liParent.find(`[value="${attr.value}"]`);

                  //remove default li and attach the one from shortcode
                  liParent.find('.active').removeClass();
                  newActiveLi.prop('checked', 'checked');
                  newActiveLi.closest('li').addClass('active');
                  break;

                case _.contains(['type', 'icon'], $(modalAttr).attr('data-name')):
                  const parent = $(modalAttr).closest('.browse-icon');
                        parent.find('i').removeClass().addClass(attr.value);

                  $(modalAttr).val(attr.value).trigger('change');
                  break;

                case _.contains(['font_color', 'color', 'background'], $(modalAttr).attr('data-name')):
                  $(modalAttr).closest('.color-picker-group').find('input.has-colorpicker').val(attr.value); //alpha, not visible input
                  $(modalAttr).closest('.color-picker-group').find('input[data-name]').val(attr.value); // just in case fill the visible input too
                  $(modalAttr).closest('.color-picker-group').find('.color-picker-open span').css('background-color', attr.value); //for not-alpha colors
                  break;

                case _.contains(['image', 'link_image', 'src'], $(modalAttr).attr('data-name')):
                  const parentLocation = $(modalAttr).closest('.browse-image');
                  parentLocation.removeClass('empty');
                  parentLocation.find('.selected-image').html(`<img src="${attr.value}" alt="" />`);
                  parentLocation.find('.mfn-form-input').val(attr.value);
                  break;

                default:
                  if(attr.value){
                    $(modalAttr).val(attr.value);
                    $(modalAttr).attr('value', attr.value);
                  }else{
                    //
                  }

                  break;

              }

            });

            //if shortcode has content
            if( $(modalInputs).closest('textarea').length ){
              let {first, second} = __scEditor.methods.getFromToPos();

              let getContent = function(){
                let buildedContent = '';
                const whichLine = _.find(__scLinter.shortcodes.wholeLines, function(lineObject){
                  return lineObject.line === first.line;
                })

                for(first.bracket2; first.bracket2 < second.bracket1; first.bracket2++){
                  buildedContent += whichLine[first.bracket2];
                }

                return buildedContent;
              }

              $(modalInputs).closest('textarea').val( getContent() );
            }

            $(document).trigger('mfn:builder:edit', $(modal).closest('.mfn-modal'));

            __scEditor.methods.tooltip.acceptButtonWatcher();

          },

          createShortcode: (shortcodeName, shortcodeAttributes) => {
            //create ready HTML shortcode structure
            let scPrepareCode,
            scParam,
            textareaContent;

            scPrepareCode = `[${shortcodeName}`;
            $(shortcodeAttributes).each(function(){
              scParam = $(this)[0];

              if( (!_.contains(['textarea', 'checkbox'], $(scParam).prop('type')) && $(scParam).val()) && $(scParam).val() !== 0 && $(scParam).val() !== '0'){
                //name has the lbracket and rbracket, remove them
                scPrepareCode += ` ${ $(scParam).attr('data-name') }="${ $(scParam).val() }"`;

              }else if($(scParam).parents('li').hasClass('active') && $(scParam).prop('type') == 'checkbox'){
                scPrepareCode += ` ${ $(scParam).attr('data-name') }="${ $(scParam).val() }"`;
              }else if($(scParam).prop('type') == 'textarea'){
                //Even if the textarea field is empty, assign value for it to close the tag
                textareaContent = $(scParam).val() ? $(scParam).val() : '\t' ;
              }
            });

            scPrepareCode += ']';

            if(textareaContent){
              scPrepareCode += `${textareaContent}[/${shortcodeName}]`;
            }

            //update after saving!
            __scEditor.methods.replaceShortcode(scPrepareCode);
          },

        },

        focus: {
        //highlight focused(cursor above) shortcode
          brackets1: _ => {
            __scEditor.methods.getTriggeredShortcode();
            __scEditor.shortcode.focusedBrackets2 = {line:0, bracket1: 0, bracket2:0, content: '', attributes:[]};

            if(!__scEditor.shortcode.focusedBrackets1) return __scEditor.methods.tooltip.hide();

            __scEditor.methods.focus.brackets2(__scEditor.shortcode.focusedBrackets1);
          },

          brackets2: (shortcode) => {
            //if sc has the content, then find his ending (second bracket)
            let similarScFound = 0;

            if(_.contains(__scLinter.shortcodes.content, shortcode.content)){
              let similarSc = _.filter(__scLinter.shortcodes.inTextarea, ({content}) => `/${shortcode.content}` === content || shortcode.content === content),
                  focusedScPos = _.indexOf(similarSc, shortcode) + 1,
                  nextShortcodes = _.last(similarSc, similarSc.length - focusedScPos);

              _.find(nextShortcodes, function(nextShortcode){
                if(shortcode.content === nextShortcode.content) similarScFound++;
                if('/' === nextShortcode.content[0] && similarScFound === 0) return __scEditor.shortcode.focusedBrackets2 = nextShortcode;
                if('/' === nextShortcode.content[0] ) similarScFound--;
              });

            }else if(shortcode.content[0] === '/'){
              let scName = __scLinter.methods.removeSlash(shortcode.content),
                  similarSc = _.filter(__scLinter.shortcodes.inTextarea, ({content}) => content === `/${scName}` || content === scName),
                  focusedScPos = _.indexOf(similarSc, shortcode),
                  nextShortcodes = _.first(similarSc, focusedScPos);

              _.find(nextShortcodes.reverse(), function(nextShortcode){
                if('/' === nextShortcode.content[0]) similarScFound++;
                if(scName === nextShortcode.content && similarScFound === 0) return __scEditor.shortcode.focusedBrackets2 = nextShortcode;
                if(scName === nextShortcode.content) similarScFound--;
              });
            }
          }

        },

        getFromToPos: _ => {
          /**
           * set proper position of shortcodes (to know, where it started and ended)
          */
          var first  = __scEditor.shortcode.focusedBrackets1,
              second = __scEditor.shortcode.focusedBrackets2;

          if(!second.content){
            second = first;
          }else
          if(second.line < first.line || (second.line === first.line && second.bracket1 < first.bracket1) || (second.line === first.line &&  second.bracket2 < first.bracket2) ){
            second = __scEditor.shortcode.focusedBrackets1;
            first  = __scEditor.shortcode.focusedBrackets2;
          }

          return {first, second};
        },

        getTriggeredShortcode: () => {
          //get info about focused shortcode
          let getCursorPos = wp.oldEditor.shortcodeManager.getCursorLocation();

          const cursorPos = {
            x: parseInt( getCursorPos.anchorOffset) ,
            line: parseInt( $(getCursorPos.focusNode.parentNode).attr('data-line') )
          };

          let shortcode = _.findIndex(__scLinter.shortcodes.inTextarea, function(index){
            if(index.bracket1 <= cursorPos.x && index.bracket2 >= cursorPos.x && index.line === cursorPos.line){
              return index;
            }
          });

          __scEditor.shortcode.focusedBrackets1 = __scLinter.shortcodes.inTextarea[shortcode];

          return __scLinter.shortcodes.inTextarea[shortcode];
        },


        replaceShortcode(readyShortcode){

          let {first, second} = __scEditor.methods.getFromToPos();

          //recog, which line we are going to edit.
          const whichLine = _.find(__scLinter.shortcodes.wholeLines, function(lineObject){
            return lineObject.line === first.line;
          })

          let oldLineContent = Object.values(whichLine);
              oldLineContent.pop();
              oldLineContent = oldLineContent.join('');

          //DOM of TinyMCE required for working
          let lineDOM = $(wp.oldEditor.shortcodeManager.getContent()[whichLine.line]);
          let lineContent = lineDOM.text();
          let lineLength = lineContent.length;

          //Utils, for debugging
          const replaceDebug = {
            shortcodeCreated: readyShortcode,
            oldLine: lineContent,
            oldLength: lineLength,
            newLength: readyShortcode.length,
          }

          //Required
          let buildedContent = '';
          let isClosed = first === second ? false : true;
          let stringLength = replaceDebug.oldLength > replaceDebug.newLength ? lineLength : readyShortcode.length - 1;
          let x = 0;

          let flags = {
            new: {
              slashNoticed: false,
              firstOpenBracketPosition: undefined,
              endingClosingBracketNoticed: false,
              positionWhereSCEnded: undefined,
              builded: '',
            },
            old: {
              slashNoticed: false,
              firstOpenBracketPosition: undefined,
              endingClosingBracketNoticed: false,
              positionWhereSCEnded: undefined,
              builded: '',

              isShortcodeNameInserted: false,
            },

            skipShortcode: false,
          }

          if(isClosed) { //Recog, if SC is closed type [/] or not

            /* Getting info for params like, where it ends etc. */
            for(x; x <= stringLength; x++){
              //new
              if (readyShortcode[x] === '/') flags.new.slashNoticed = true;
              if (!flags.new.endingClosingBracketNoticed) flags.new.builded += readyShortcode[x];
              if (readyShortcode[x] === ']' && flags.new.slashNoticed) {
                flags.new.endingClosingBracketNoticed = true;
                flags.new.slashNoticed = false;
              }

              //old
              if (lineContent[x] === '/') flags.old.slashNoticed = true;
              if (!flags.old.endingClosingBracketNoticed) flags.old.builded += lineContent[x];
              if (lineContent[x] === ']' && flags.old.slashNoticed) {
                flags.old.endingClosingBracketNoticed = true;
                flags.old.slashNoticed = false;
              }

            }

            flags.old.firstOpenBracketPosition = first.bracket1;
            flags.old.positionWhereSCEnded = second.bracket2-1;
          }else{

            for(x; x <= stringLength; x++){
              //new
              if (!flags.new.endingClosingBracketNoticed) flags.new.builded += readyShortcode[x];
              if (readyShortcode[x] === ']' && !flags.new.endingClosingBracketNoticed) {
                flags.new.endingClosingBracketNoticed = true;
              }

              //old
              if (!flags.old.endingClosingBracketNoticed) flags.old.builded += lineContent[x];
              if (lineContent[x] === ']' && !flags.old.endingClosingBracketNoticed && !flags.skipShortcode) {
                flags.old.endingClosingBracketNoticed = true;
              }

            }

            flags.old.firstOpenBracketPosition = second.bracket1;
            flags.old.positionWhereSCEnded = second.bracket2-1;

          }

          /* Prepare proper string */
          let stringToArray = lineContent.split('');
          let cleanedStringObject = {before:'', after:''};

          stringToArray.filter( (item, index) => {
            if( flags.old.firstOpenBracketPosition > index ){
              cleanedStringObject.before += item;
            }else if(index > flags.old.positionWhereSCEnded) {
              cleanedStringObject.after += item;
            }
          })

          //DELETE case
          if(readyShortcode === ' ') {
            buildedContent = cleanedStringObject.before+''+cleanedStringObject.after;
          } else {
            buildedContent = cleanedStringObject.before+''+flags.new.builded+''+cleanedStringObject.after;
          }

          //replace whole html code of actual line (paragraph in tinymce)*/
          $(lineDOM).html(buildedContent)
        },

        moveWatcher: (e) => {
          __scEditor.methods.focus.brackets1();
          __scEditor.methods.tooltip.toggle(e);
        }

      }

    };

    /**
     * Return
     * Method to start the closure
     */

    return {
      init: init
    };

  })();

  /**
   * $(document).ready
   * Specify a function to execute when the DOM is fully loaded.
   */

  $(function() {
    MfnFieldVisual.init();
  });

})(jQuery);
