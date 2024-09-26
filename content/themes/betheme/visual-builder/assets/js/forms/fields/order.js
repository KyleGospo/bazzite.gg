function mfn_field_order(field) {
	let value = '';
	let options = [];

	if( _.has(field, 'std') ){
		value = field.std;
	}

	if( _.has(edited_item['attr'], field.id) && typeof edited_item['attr'][field.id] === 'string' ){
		value = edited_item['attr'][field.id];
	}

	if( value !== '' ){
		options = value.split(',');
	}

	let html = `<div class="form-content"><div class="form-group order-field"><div class="form-control"><ul class="tabs-wrapper">

	${ _.map( options, (opt, i) => '<li class="tab tab-'+opt+'"><div class="tab-header"><span class="title">'+opt+'</span></div></li>' ).join('') }

	</ul></div>
	<input type="hidden" class="mfn-form-control mfn-field-value order-input-hidden" name="${field.id}" value="${value}" />
	</div></div>`;
	return html;
}