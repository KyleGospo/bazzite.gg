function mfn_field_color_multi(field) {
	let options = [];
	
	if( _.has(field, 'std') ) {
		options = field.std;
	}

	let html = `<div class="form-group color-picker multi has-addons has-addons-prepend">

		${ _.map(options, function(opt, o) {
			let value = opt;

			if( _.has(edited_item, field.id) && _.has(edited_item[field.id], o) ) {
				value = edited_item[field.id][o];
			}

			return `<div class="color-picker-group color-${o}-field" data-key="${o}">
				<div class="form-addon-prepend"><a href="#" class="color-picker-open"><span ${ value != '' ? `style="background-color: ${value}; border-color: ${value};"` : '' } class="label"><i class="icon-bucket"></i></span></a></div>
				<div class="form-control has-icon has-icon-right field">
					<input class="mfn-form-control mfn-form-input color-picker-vb mfn-field-value" name="${field.id}" data-key="${o}" type="text" value="${value}" autocomplete="off" />
					<a class="mfn-option-btn mfn-option-text color-picker-clear" href="#"><span class="text">Clear</span></a>
				</div>
			</div>`;

		}).join('') }
		
	</div>`;

	return html;
}