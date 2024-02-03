(function($) {

	/* globals jQuery */

	"use strict";

	/**
	 * Header Menu Icon choose
	 * */

	var mfnMenuIcon = {
		editbox: false,

		init: function() {
			$(document).on('click', '.browse-icon .mfn-button-upload', function(e) {
				e.preventDefault();
				mfnMenuIcon.editbox = $(this).closest('.browse-icon');

				$('.modal-select-icon').addClass('show');

			});

			$(document).on('click', '.browse-icon .mfn-button-delete', function(e) {
				e.preventDefault();
				var metaBox = $(this).closest('.browse-icon'),
	                imgIdInput = metaBox.find( '.mfn-form-input' );

	                metaBox.addClass('empty');
	                imgIdInput.val( '' );
			});

			$(document).on('click', '.btn-modal-close', function(e) {
				e.preventDefault();
				mfnMenuIcon.hide();
			});

			$(document).on('change', '.modal-select-icon .modalbox-search .mfn-form-select', function() {
				var val = $(this).val();
				$('.modal-select-icon.show .mfn-items-list li').hide();
				$('.modal-select-icon.show .mfn-items-list li.'+val).show();
			});

			$(document).on('keyup', '.modal-select-icon .modalbox-search .mfn-form-input', function() {
				var select = $('.modal-select-icon .modalbox-search .mfn-form-select').val();
				var val = $(this).val().replace(/ /g, '-').toLowerCase();
				if( val.length > 1 ){
					$('.modal-select-icon.show .mfn-items-list li').hide();
					$('.modal-select-icon.show .mfn-items-list li[data-rel*="'+val+'"]').show();
				}else{
					$('.modal-select-icon.show .mfn-items-list li').hide();
					$('.modal-select-icon.show .mfn-items-list li.'+select).show();
				}
			});

			$(document).on('click', '.modal-select-icon .mfn-items-list li a', function(e) {
				e.preventDefault();
				var id = $(this).closest('li').attr('data-rel');
				mfnMenuIcon.editbox.find('input').val(id);
				mfnMenuIcon.editbox.find('.mfn-button-upload i').attr('class', id);
				mfnMenuIcon.editbox.removeClass('empty');
				mfnMenuIcon.hide();
			});
		},

		hide: function() {
			$('.mfn-modal.show').removeClass('show');
		}
	};

	var uploader = {
		init: function() {
			uploader.browse();
			uploader.delete();
		},
	    browse: function() {
	        $(document).on('click', '.browse-image .mfn-button-upload', function(e) {
	            e.preventDefault();
	            var frame,
	                addImgLink = $(this),
	                metaBox = addImgLink.closest('.browse-image'),
	                imgContainer = metaBox.find( '.selected-image'),
	                imgIdInput = metaBox.find( '.mfn-field-value' );

	            if ( frame ) { frame.open(); return; }

	            frame = wp.media({
	                multiple: false,
	            });

                frame.on( 'select', function() {

                    metaBox.removeClass('empty');
                    var attachment = frame.state().get('selection').first().toJSON();
                    imgIdInput.val( attachment.url ).trigger('change');
                    if(imgContainer) { 
                    	imgContainer.html( '<img src="'+attachment.url+'" alt="">' ); 
                    	metaBox.removeClass('empty'); 
                    }

                });

                frame.open();
	            
	        });
	    },

	    delete: function() {
	        $(document).on('click', '.browse-image .mfn-button-delete', function(e) {
	            e.preventDefault();

	            var metaBox = $(this).closest('.browse-image'),
	                imgContainer = metaBox.find( '.selected-image'),
	                imgIdInput = metaBox.find( '.mfn-form-input' );

	                imgContainer.html( '' );
	                metaBox.addClass('empty');
	                imgIdInput.val( '' );
	                
	        });
	    }
	}


	mfnMenuIcon.init();
	uploader.init();

})(jQuery);