function mfn_field_dimensions(field) {
	let value = '';
	let test_the_same = 4;
	let splited_value = [];
	let classes = ['form-group','multiple-inputs','has-addons','has-addons-append'];
	let inputs = field.id.includes('border-radius') ? ['&#8598;', '&#8599;', '&#8600;', '&#8601;'] : ['top', 'right', 'bottom', 'left'];

	if( _.has(edited_item['attr'], field.id) && edited_item['attr'][field.id].length && typeof edited_item['attr'][field.id] == 'string' ){
		splited_value = edited_item['attr'][field.id].split(" ");
		value = edited_item['attr'][field.id];
		if( splited_value.length == 4 ) test_the_same = _.uniq(splited_value);
	}else if( !_.has(edited_item, 'attr') && _.has(edited_item, field.id) && edited_item[field.id].length && typeof edited_item[field.id] == 'string' ){
		splited_value = edited_item[field.id].split(" ");
		value = edited_item[field.id];
		if( splited_value.length == 4 ) test_the_same = _.uniq(splited_value);
	}

	if( _.has(field, 'version') ){
		classes.push(field.version);
		if( _.has(edited_item['attr'], field.id) && Object.keys(edited_item['attr'][field.id]).length == 4 ) {
			test_the_same = _.uniq( Object.values(edited_item['attr'][field.id]) );
		}else if( !_.has(edited_item, 'attr') && _.has(edited_item, field.id) && Object.keys(edited_item[field.id]).length == 4 ) {
			test_the_same = _.uniq( Object.values(edited_item[field.id]) );
		}
    inputs = ['top', 'right', 'bottom', 'left']; // override border radius fields
	}else{
		classes.push('pseudo');
	}

	if( test_the_same.length == 1 ) classes.push('isLinked');

	let html = `<div class="form-content"><div class="${classes.join(' ')}">
		<div class="form-control">

			${ !_.has(field, 'version') ? `<input type="hidden" class="mfn-field-value pseudo-field" name="${field.id}" value="${value}" autocomplete="off">` : '' }

			${ inputs && inputs.length ? _.map(inputs, function(input, i) {
				let input_classes = ['mfn-form-control mfn-form-input numeral'];
				let input_row_classes = ['field'];
				let name_attr = '';
				let key = input;
				value = '';

				if( _.has(field, 'version') ){
					input_classes.push('mfn-field-value');
					name_attr = `name="${field.id}"`;
					if( _.has(edited_item['attr'], field.id) && _.has(edited_item['attr'][field.id], key) ) {
						value = edited_item['attr'][field.id][key];
					}else if( _.has(edited_item, field.id) && _.has(edited_item[field.id], key) ) {
						value = edited_item[field.id][key];
					}
				}else{

					if( field.id.includes('border-radius') ){
						input_classes.push('field-'+i);
						key = i;
					}else{
						input_classes.push('field-'+input);
					}

					if( splited_value.length && splited_value[i].length ){
						value = splited_value[i];
					}

				}

				if( input != 'top' && input != '&#8598;' ) {
					input_row_classes.push('disableable');
				}

				if( input != 'top' && input != '&#8598;' && test_the_same.length == 1 ) {
					input_classes.push('readonly');
				}

				return `<div class="${input_row_classes.join(' ')}" data-key="${input}">
					<input class="${input_classes.join(' ')}" ${name_attr} data-key="${key}" value="${value}" autocomplete="off">
				</div>`;


			}).join('') : '' }

		</div>

		<div class="form-addon-append">
			<a href="#" class="link">
				<span class="label"><i class="icon-link"></i></span>
			</a>
		</div>
	</div></div>`;
	return html;
}