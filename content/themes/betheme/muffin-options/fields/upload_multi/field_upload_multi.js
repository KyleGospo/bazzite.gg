(function($) {

  /* globals jQuery, wp */

  "use strict";

  var MfnUploadMulti = (function() {

    var group = '.form-group.browse-image.multi ';

    var multiFileFrame, multiFileFrameOpen, multiFileFrameSelect, handle,
      selector = '.browse-image.multi';

    /**
     * Attach events to buttons. Runs whole script.
     */

    function init() {

      openMediaGallery();
      attachRemoveAction();
      attachRemoveAllAction();

      uiSortable();

    }

    /**
     * UI Sortable Init
     */

    function uiSortable() {

      // TODO: when you add images to new item sortable won't init

      $(document).on('mfn:builder:edit', function( $this, modal ){

        var $el = $('.browse-image.multi .gallery-container', modal),
          $parent = $el.closest(selector);

        if ( $el.length ) {

          // init sortable

          if ( ! $el.hasClass( 'ui-sortable' ) ) {
            $el.sortable({
              opacity: 0.9,
              update: function() {
                fillInput( $parent, findAllIDs( $parent ) );
              }
            });
          }

          // enable inactive sortable

          if ( $el.hasClass( 'ui-sortable-disabled' ) ) {
            $el.sortable( 'enable' );
          }

        }

      });

      $(document).on('mfn:builder:close', function( $this ){

        $('.gallery-container.ui-sortable').sortable('destroy');

      });

    }

    /**
     * Click | Add
     */

    function openMediaGallery() {

      $('.mfn-ui').on('click', group + '.mfn-button-upload', function(e) {

        event.preventDefault();

        handle = this;

        // Create the media frame

        multiFileFrame = wp.media.frames.mfnGallery = wp.media({
          multiple: 'add',
          library: {
            type: 'image',
          }
        });

        // Attach hooks to the events

        multiFileFrame.on('open', multiFileFrameOpen);
        multiFileFrame.on('select', multiFileFrameSelect);

        multiFileFrame.open();

      });

    }

    /**
     * WP Media Frame | Open
     */

    multiFileFrameOpen = function() {

      var parent = handle.closest(selector),
        library = multiFileFrame.state().get('selection'),
        images = $('.upload-input', parent).val(),
        imageIDs;

      if (!images) {
        return true;
      }

      imageIDs = images.split(',');

      imageIDs.forEach(function(id) {
        var attachment = wp.media.attachment(id);
        attachment.fetch();
        library.add(attachment ? [attachment] : []);
      });
    };

    /**
     * WP Media Frame | Select
     */

    multiFileFrameSelect = function() {

      var parent = handle.closest(selector),
        gallery = $('.gallery-container', parent),
        library = multiFileFrame.state().get('selection'),
        imageURLs = [],
        imageIDs = [],
        imageURL, outputHTML, joinedIDs;

      gallery.html('');

      library.map(function(image) {

        image = image.toJSON();
        imageURLs.push(image.url);
        imageIDs.push(image.id);

        if (image.sizes.thumbnail) {
          imageURL = image.sizes.thumbnail.url;
        } else {
          imageURL = image.url;
        }

        outputHTML = '<li class="selected-image">' +
          '<img data-pic-id="' + image.id + '" src="' + imageURL + '" />' +
          '<a class="mfn-option-btn mfn-button-delete" data-tooltip="Delete" href="#"><span class="mfn-icon mfn-icon-delete"></span></a>' +
        '</li>';

        gallery.append(outputHTML);
      });

      joinedIDs = imageIDs.join(',').replace(/^,*/, '');
      if (joinedIDs.length !== 0) {
        $(parent).removeClass('empty');
      }

      fillInput(parent, joinedIDs);
    };

    /**
     * Click | Remove single
     */

    function attachRemoveAction() {

      $('.mfn-ui').on('click', group + '.mfn-button-delete', function(e) {

        event.preventDefault();

        var parent = $(this).closest(selector),
          joinedIDs;

        $(this).closest('.selected-image').remove();

        joinedIDs = findAllIDs(parent);

        if (joinedIDs === '') {
          parent.addClass('empty');
        }

        fillInput(parent, joinedIDs);

      });

    }

    /**
     * Click | Remove all
     */

    function attachRemoveAllAction() {

      $('.mfn-ui').on('click', group + '.mfn-button-delete-all', function(e) {

        event.preventDefault();

        var parent = $(this).closest(selector);

        parent.addClass('empty');

        $('input', parent).val('').trigger('change');
        $('.gallery-container', parent).html('');

      });

    }

    /**
     * Helper method. Find all IDs of added images.
     * @method findAllIDs
     * @return {String}		joined ids separated by `;`
     */

    function findAllIDs( parent ) {
      var imageIDs = [],
        id;

      $('.gallery-container img', parent).each(function() {
        id = $(this).attr('data-pic-id');
        imageIDs.push(id);
      });

      return imageIDs.join( ',' );
    }

    /**
     * Helper method. Set the value of image gallery input.
     * @method fillInput
     * @param  {String} joinedIDs - string to be set into input
     */

    function fillInput( parent, joinedIDs ) {

      $('.upload-input', parent)
        .val( joinedIDs )
        .trigger('change');
    }

    /**
     * Return
     * Method to start the closure
     */

    return {
      init: init
    };

  })(jQuery);

  /**
   * $(document).ready
   * Specify a function to execute when the DOM is fully loaded.
   */

  $(function() {
    MfnUploadMulti.init();
  });

})(jQuery);
