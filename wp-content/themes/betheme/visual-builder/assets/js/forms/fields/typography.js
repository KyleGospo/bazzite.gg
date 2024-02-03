function mfn_field_typography(field) {
	let disable = false;
	let html = '';
	let std = {};
	let value = {};
	let weightstyles = [
		{'val': '', 'label': 'Default'},
		{'val': '100', 'label': '100 thin'},
		{'val': '100italic', 'label': '100 thin italic'},
		{'val': '200', 'label': '200 extra-light'},
		{'val': '200italic', 'label': '200 extra-light italic'},
		{'val': '300', 'label': '300 light'},
		{'val': '300italic', 'label': '300 light italic'},
		{'val': '400', 'label': '400 regular'},
		{'val': '400italic', 'label': '400 regular italic'},
		{'val': '500', 'label': '500 medium'},
		{'val': '500italic', 'label': '500 medium italic'},
		{'val': '600', 'label': '600 semi-bold'},
		{'val': '600italic', 'label': '600 semi-bold italic'},
		{'val': '700', 'label': '700 bold'},
		{'val': '700italic', 'label': '700 bold italic'},
		{'val': '800', 'label': '800 extra-bold'},
		{'val': '800italic', 'label': '800 extra-bold italic'},
		{'val': '900', 'label': '900 black'},
		{'val': '900italic', 'label': '900 black italic'},
	];

	if( _.has(field, 'disable') ) {
		disable = field.disable;
	}

	if( _.has(field, 'std') ) {
		std = field.std;
	}else{
		std = {
			'size': 			'',
			'line_height': 		'',
			'weight_style': 	'',
			'letter_spacing': 	'',
		};
	}

	value = std;

	if( _.has(edited_item, field.id) && _.has(edited_item[field.id], 'size') ){
		value['size'] = edited_item[field.id]['size'];
	}
	if( _.has(edited_item, field.id) && _.has(edited_item[field.id], 'line_height') ){
		value['line_height'] = edited_item[field.id]['line_height'];
	}
	if( _.has(edited_item, field.id) && _.has(edited_item[field.id], 'weight_style') ){
		value['weight_style'] = edited_item[field.id]['weight_style'];
	}
	if( _.has(edited_item, field.id) && _.has(edited_item[field.id], 'letter_spacing') ){
		value['letter_spacing'] = edited_item[field.id]['letter_spacing'];
	}

	html += `<div class="form-group typography has-addons has-addons-append">`;

	html += `<div class="form-control" data-key="Font size">
			<input class="mfn-form-control mfn-form-number" type="number" name="${field.id}" value="${value.size}" data-obj="size" data-key="font-size" placeholder="${std.size}" data-std="" data-style="font-size" data-unit="px">
		</div>
		<div class="form-addon-append">
			<span class="label">px</span>
		</div>`;

	if( disable != 'line_height' ){
		html += `<div class="form-control" data-key="Line height">
			<input class="mfn-form-control mfn-form-number" type="number" name="${field.id}" value="${value.line_height}" data-obj="line_height" data-key="line-height" placeholder="${std.line_height}" data-unit="px">
		</div>
		<div class="form-addon-append">
			<span class="label">px</span>
		</div>`;
	}

	html += `<div class="form-control form-control-font" data-key="Font weight & style">
		<select class="mfn-form-control mfn-form-select" name="${field.id}" data-key="weight-style" data-obj="weight_style" data-style="font-weight" data-unit="">`;

	_.map(weightstyles, function(opt) {
		let selected = '';

		if( value['weight_style'] == opt.val ) selected = 'selected';

		html += `<option ${selected} value="${opt.val}">${opt.label}</option>`;
	}).join('')

	html += `</select></div>`;

	html += `<div class="form-control" data-key="Letter spacing">
			<input class="mfn-form-control mfn-form-number" type="number" name="${field.id}" value="${value.letter_spacing}" data-obj="letter_spacing" data-key="letter-spacing" placeholder="${std.letter_spacing}" data-std="" data-style="letter-spacing" data-unit="px">
		</div>
		<div class="form-addon-append">
			<span class="label">px</span>
		</div>`;

	html += `</div>`;
	return html;
}