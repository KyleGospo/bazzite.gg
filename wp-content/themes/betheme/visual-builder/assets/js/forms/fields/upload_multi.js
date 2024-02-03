function mfn_field_upload_multi(field) {
	let splited_value = [];
	let value = '';
	let classes = ['form-group browse-image multi'];
	let ul_classes = ['gallery-container clearfix'];
	let isBlocks = $content.find('body').hasClass('mfn-builder-blocks');

	if( _.has(edited_item['attr'], field.id) && edited_item['attr'][field.id].length ){
		value = edited_item['attr'][field.id];
		splited_value = edited_item['attr'][field.id].split(',');
	}else{
		classes.push('empty');
	}

	if ( _.has(field, 'preview') ){
		ul_classes.push('preview-'+field.preview);
	}

	let html = `<div class="form-content"><div class="${classes.join(' ')}">

		<div class="browse-options">
			<input type="hidden" class="upload-input mfn-field-value" name="${field.id}" value="${value}"/>
			<a href="#" class="mfn-button-upload">Browse</a>
			<a class="mfn-button-delete-all" title="Delete" href="#">Delete all</a>
		</div>

		<ul class="${ul_classes.join(' ')}">
			${ _.map( splited_value, function(x, i) {
				let li = '';
				let src = '';

				if( isBlocks ){
					src = $content.find('.mcb-item-'+edited_item.uid+' .item-preview-images li:nth-child('+(i+1)+') img').attr('src');
				} else {
					src = $content.find('.mcb-item-'+edited_item.uid+' .gallery .gallery-item:nth-child('+(i+1)+') img').attr('src');
				}

				li += `<li class="selected-image"><img data-pic-id="${x}" src="${src}" /><a class="mfn-option-btn mfn-button-delete" data-tooltip="Delete" href="#"><span class="mfn-icon mfn-icon-delete"></span></a></li>`;

				return li;
			}).join('') }
		</ul>

	</div></div>`;
	return html;
}
