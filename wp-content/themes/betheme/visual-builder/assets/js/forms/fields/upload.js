function mfn_field_upload(field) {
	let placeholder = '';
	let data = 'image';
	let dynamic_data = '';
	let value = '';
	let reset_classes = ['mfn-option-btn', 'mfn-option-blank', 'reset-bg'];
	let input_classes = ['mfn-form-control mfn-field-value mfn-form-input'];
	let classes = ['form-group','browse-image','has-addons','has-addons-append'];

	if( _.has(field, 'std') ){
		placeholder = field.std;
	}

	if( _.has(field, 'preview') ){
		input_classes.push('preview-'+field.preview);
	}

	if( _.has(field, 'data') ){
		data = field.data;
	}

	if( _.has(field, 'input_class') ){
		input_classes.push(field.input_class);
	}

	if( _.has(field, 'dynamic_data') ){
		dynamic_data = '<a class="mfn-option-btn mfn-button-dynamic-data" title="Dynamic data" href="#"><span class="mfn-icon mfn-icon-dynamic-data"></span></a>';
	}

	if( _.has(edited_item['attr'], field.id) && edited_item['attr'][field.id].length ){
		// builder
		value = edited_item['attr'][field.id];
	}else if( (edited_item.jsclass == 'pageoption' || edited_item.jsclass == 'themeoption') && _.has(edited_item, field.id) && edited_item[field.id].length ){
		// themeoption
		value = edited_item[field.id];
	}else{
		classes.push('empty');
	}

	if( value == 'none' ) {
		classes.push('empty');
		reset_classes.push('active');
	}

	let html = `<div class="form-content has-icon has-icon-right">

	${ field.id.includes('style:') ? `<a href="#" class="${reset_classes.join(' ')}"><span class="mfn-icon mfn-icon-hide"></span></a>` : '' }

	<div class="${classes.join(' ')}">
		<div class="form-control">
			<input class="${input_classes.join(' ')}" type="text" name="${field.id}" value="${value}" data-type="${data}"/>
			${dynamic_data ? dynamic_data : ''}
			<a class="mfn-option-btn mfn-button-delete" title="Delete" href="#"><span class="mfn-icon mfn-icon-delete"></span></a>
		</div>

		<div class="form-addon-append browse-image-single">
			<a href="#" class="mfn-button-upload"><span class="label">Browse</span></a>
		</div>

		<div class="break"></div>
		<div class="selected-image">
			${ value != '' && !value.includes('{') ? `<img src="${value}" alt="">` : '' }
		</div>
	</div></div>`;
	return html;
}