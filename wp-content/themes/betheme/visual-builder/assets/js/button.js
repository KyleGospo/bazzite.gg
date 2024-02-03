(function ($) {
	'use strict';

	var MfnGutenberg = {
		init: function () {
			//if( !$('body').hasClass('post-new-php') ){
		      MfnGutenberg.addButton();
			//}
		},

		//PBL
		createFilteredLink: function() {

			/*if( wp.data.select("core/editor") == null ) return;

			var getThemeName = $('#mfn-builder').attr('data-label');
			var getThemeLogo = $('.betheme-custom-logo').attr('src') ? `style="background-image:url('${ $(".betheme-custom-logo").attr("src") }')"` : "";
			var getThemeSlug = $('#mfn-builder').attr('data-slug') ? $('#mfn-builder').attr('data-slug')  : 'mfn';

			if ( 'Be' !== getThemeName ) {
				return '<a href="post.php?post='+wp.data.select("core/editor").getCurrentPostId()+'&action='+ getThemeSlug +'-live-builder" class="mfn-live-edit-page-button mfn-switch-live-editor" '+getThemeLogo+'>Edit with '+ getThemeName +'Builder</a>';
			}

			// basic, original code
			return '<a href="post.php?post='+wp.data.select("core/editor").getCurrentPostId()+'&action='+ getThemeSlug +'-live-builder" class="mfn-live-edit-page-button mfn-switch-live-editor">Edit with BeBuilder</a>';*/

			if( $('.mfn-switch-live-editor').length ) return $('.mfn-switch-live-editor').clone();
		},

		addButton: function() {
			var that = this;
			setTimeout(function() {
				//if( !$('#editor .mfn-live-edit-page-button').length ){
					$('#editor').find('.edit-post-header .edit-post-header__toolbar').append( that.createFilteredLink() );
					MfnGutenberg.buttonAction();
				//}
			}, 2000);
		},

		buttonAction: function() {

			$('.mfn-switch-live-editor').on('click', function(e) {
				if( $('.edit-post-header__settings .editor-post-publish-button__button').hasClass('editor-post-publish-panel__toggle') ){
				e.preventDefault();
				var $btn = $(this);

				if(!$btn.hasClass('loading')){
					$btn.addClass('loading');
					$.ajax({
            url: ajaxurl,
            data: {
              'mfn-builder-nonce': $('input[name="mfn-builder-nonce"]').val(),
              action: 'mfnvbsavedraft',
              posttype: wp.data.select( 'core/editor' ).getCurrentPostType(),
              id: wp.data.select("core/editor").getCurrentPostId()
            },
            type: 'POST',
            success: function(response){
            	window.history.pushState("data", "Edit Page", 'post.php?post='+wp.data.select("core/editor").getCurrentPostId()+'&action=edit');
            	window.location.href = $btn.attr('href');
            }
	        });
				}
			}
			});
		}

	};

	$(function () {

		wp.domReady(function() {
			MfnGutenberg.init();
		});

	});

})(jQuery);
