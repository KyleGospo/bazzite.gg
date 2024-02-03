function mfn_field_font_select(field) {
	let value = '';
	let html = '';
	let name_attr = '';
	let data_attr = '';

	if( _.has(field, 'key') ){
		data_attr = `data-key="${field.key}"`;
	}

	if( _.has(edited_item['attr'], field.id) && !_.isEmpty(edited_item['attr'][field.id]) ){
		// builder
		if( _.has(field, 'key') && _.has(edited_item['attr'][field.id], field.key) && edited_item['attr'][field.id][field.key].length ){
			value = edited_item['attr'][field.id][field.key];
		}else if( typeof edited_item['attr'][field.id] === 'string' ){
			value = edited_item['attr'][field.id];
		}
	}else if( edited_item.jsclass == 'themeoption' && _.has(edited_item, field.id) && typeof edited_item[field.id] === 'string' ){
		// themeoption
		value = edited_item[field.id];
	}

	if( _.has(field, 'id') ){
		name_attr = `name="${field.id}"`;
	}

	html += `<div class="form-content">
		<div class="form-group font-family-select">
			<div class="form-control">
				<select ${name_attr} ${data_attr} class="mfn-field-value mfn-form-control mfn-form-select" data-value="${value}" autocomplete="off">
					<optgroup label="System">
						${ _.has(mfnDbLists.fonts, 'system') ? _.map(mfnDbLists.fonts.system, function(font) {
							return `<option value="${font}">${ font != '' ? font : 'Default' }</option>`;
						}).join('') : '' }
					</optgroup>

					${ _.has(mfnDbLists.fonts, 'custom') && mfnDbLists.fonts.custom.length ? 
					`<optgroup label="Custom Fonts">
						${ _.map(mfnDbLists.fonts.custom, function(font) { 
							return `<option value="${font}">${ font != '' ? font.replace('#', '') : 'Default' }</option>`; 
						}).join('') }
					</optgroup>` : '' }

					<optgroup label="Google Fonts">
						${ _.has(mfnDbLists.fonts, 'all') ? _.map(mfnDbLists.fonts.all, function(font) {   
							return `<option value="${font}">${ font != '' ? font : 'Default' }</option>`;
						}).join('') : '' }
					</optgroup>
				</select>
			</div>
		</div>
	</div>`;
	return html;
}