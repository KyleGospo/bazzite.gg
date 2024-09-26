function mfn_field_text(field) {
	let field_type = 'text';
	let placeholder = '';
	let html = '';
	let value = '';
	let classes = ['mfn-form-control', 'mfn-form-input', 'mfn-field-value'];
	let classes_formrow = ['form-group'];
	let data_attr = [];
	let classes_form_content = ['form-control'];

	if( _.has(field, 'default_unit') ){
		classes.push('has-default-unit');
		data_attr.push(`data-unit="${field['default_unit']}"`);
	}

	if( _.has(field, 'input_class') ){
		classes.push(field.input_class);
	}

	if( _.has(field, 'before') ){
		classes_formrow.push('has-addons has-addons-prepend');
	}

	if( _.has(field, 'after') ){
		classes_formrow.push('has-addons has-addons-append');
	}

	if( _.has(field, 'param') ){
		field_type = field.param;
	}

	if( _.has(field, 'placeholder') ){
		placeholder = field.placeholder;
	}

	if( _.has(field, 'std') ){
		placeholder = field.std;
	}

	if( _.has(field, 'js_std') ){
		placeholder = mfnDbLists[field.js_std];
	}

	if( _.has(edited_item['attr'], field.id) && edited_item['attr'][field.id].length ){
		// builder
		value = edited_item['attr'][field.id];
	}else if( (edited_item.jsclass == 'pageoption' || edited_item.jsclass == 'themeoption') && _.has(edited_item, field.id) && typeof edited_item[field.id] === 'string' ){
		// themeoption
		value = edited_item[field.id];
	}

	if( _.has(field, 'dynamic_data') ){
		classes_form_content.push('has-icon has-icon-right');
	}

	data_attr.push(`autocomplete="off"`);

	html += `
		<div class="${classes_formrow.join(' ')}">
		${ _.has(field, 'before') ? '<div class="form-addon-prepend"><span class="label">'+field.before+'</span></div>' : '' }
			<div class="${classes_form_content.join(' ')}">
				<input name="${field.id}" class="${classes.join(' ')}" type="${field_type}" placeholder="${placeholder}" value="${ value != '' ? value.replaceAll(/"/g, "&quot;") : '' }" ${data_attr.join(' ')}>
				${ _.has(field, 'dynamic_data') ? `<a class="mfn-option-btn mfn-button-dynamic-data" title="Dynamic data" href="#"><span class="mfn-icon mfn-icon-dynamic-data"></span></a>` : '' }
			</div>
		${ _.has(field, 'after') ? '<div class="form-addon-append"><span class="label">'+field.after+'</span></div>' : '' }
		</div>
	`;

	return html;
}