function mfn_field_select(field) {
	let classes = ['mfn-form-control','mfn-form-select'];
	let data_attr = '';
	let value = '';
	let html = '';
	let name_attr = '';

	if( _.has(field, 'key') ) {
		data_attr = `data-key="${field.key}"`;
	}

	if( _.has(field, 'preview') ){
		classes.push(field.preview);
	}

	if( _.has(field, 'input_class') ){
		classes.push(field.input_class);
	}

	if( _.has(edited_item['attr'], field.id) ){
		// builder
		value = edited_item['attr'][field.id];
	}else if( (edited_item.jsclass == 'pageoption' || edited_item.jsclass == 'themeoption') && _.has(edited_item, field.id) && edited_item[field.id].length ){
		// themeoption
		value = edited_item[field.id];
	}else if( _.has(field, 'std') ){
		value = field.std;
	}

	if( _.has(field, 'key') && _.has(edited_item['attr'], field.id) && _.has(edited_item['attr'][field.id], field.key) ){
		value = edited_item['attr'][field.id][field.key];
	}

	if( _.has(field, 'field_class') ){
		classes.push(field.field_class);
	}

	if( _.has(field, 'id') ){
		html += `<div class="form-content">`;
		name_attr = `name="${field.id}"`;
	}

	if( _.has(field, 'on_change') ){
		classes.push('field-to-object'); // object updater only
	}else{
		classes.push('mfn-field-value'); // all on change actions
	}

	if( !value.length && _.has(field, 'default_value') ){
		value = field.default_value;
	}

	if( !value.length && _.has(field, 'std') ){
		value = field.std;
	}

	// key / label options - prevents automatic sorting

	html += `
		<select ${data_attr} ${name_attr} class="${classes.join(' ')}" autocomplete="off">

		${ _.has(field, 'js_hierarchical_options') ? '<option value="">All</option>' : ''}

		${ _.has(field, 'options') ? _.map( field.options, function(opt, i) {
			let html = '';
			
			if( i.length && i.includes('#optgroup') ) {
				if( opt != '' ){
					html += `<optgroup label="${opt}">`;
				}else{
					html += `</optgroup>`;
				}
			}else{
				html += '<option '+( value == i ? 'selected' : '' )+' value="'+i+'">'+opt+'</option>';
			}

			return html;
		}).join('') : '' }

		${ _.has(field, 'js_options') ? _.map( mfnDbLists[field.js_options], (opt, o) => '<option '+( value == o ? 'selected' : '' )+' value="'+o+'">'+opt+'</option>' ).join('') : '' }
		${ _.has(field, 'js_hierarchical_options') ? _.map( mfnDbLists[field.js_hierarchical_options], (opt) => '<option '+( value == opt.slug ? 'selected' : '' )+' value="'+opt.slug+'">'+opt.name+'</option>' ).join('') : '' }

		${ _.has(field, 'kl_options') ? _.map( field.kl_options, (opt) => '<option '+( value == opt.key ? 'selected' : '' )+' value="'+opt.key+'">'+opt.label+'</option>' ).join('') : '' }


		${ _.has(field, 'opt_append') ? _.map( field.opt_append, (opta, o) => '<option '+( value == o ? 'selected' : '' )+' value="'+o+'">'+opta+'</option>' ).join('') : '' }
		
		</select>`;

	if( _.has(field, 'id') ){
		html += `</div>`;
	}

	return html;
}