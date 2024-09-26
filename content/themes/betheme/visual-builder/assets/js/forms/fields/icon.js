function mfn_field_icon(field) {
	let placeholder = '';
	let value = '';
	let preview = '';
	let classes = ['form-group','browse-icon','has-addons','has-addons-prepend'];

	if( _.has(field, 'std') ){
		placeholder = field.std;
	}

	if( _.has(field, 'preview') ){
		preview = 'preview-'+field.preview+'input';
	}

	if( _.has(edited_item['attr'], field.id) && edited_item['attr'][field.id].length ){
		value = edited_item['attr'][field.id];
	}else if( (edited_item.jsclass == 'pageoption' || edited_item.jsclass == 'themeoption') && _.has(edited_item, field.id) && edited_item[field.id].length ){
		// themeoption
		value = edited_item[field.id];
	}else{
		classes.push('empty');
	}

	let html = `<div class="form-content"><div class="${classes.join(' ')}">
		<div class="form-addon-prepend">
			<a href="#" class="mfn-button-upload">
				<span class="label">
					<span class="text">Browse</span>
					<i class="${value}"></i>
				</span>
			</a>
		</div>
		<div class="form-control has-icon has-icon-right">
			<input class="mfn-form-control mfn-field-value mfn-form-input ${preview}" type="text" name="${field.id}" value="${value}" placeholder="${placeholder}" />
			<a class="mfn-option-btn mfn-button-delete" title="Delete" href="#"><span class="mfn-icon mfn-icon-delete"></span></a>
		</div>
	</div></div>`;

	return html;
}