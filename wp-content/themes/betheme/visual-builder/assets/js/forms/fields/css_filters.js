function mfn_field_css_filters(field) {
	let html = '<div class="mfn-toggle-fields-wrapper css_filters_form">';
	let value = '';

	if( _.has(edited_item['attr'], field.id) && _.has(edited_item['attr'][field.id], 'string') ){
		value = edited_item['attr'][field.id]['string'];
	}

	let used_fields = [
		{
			'id': field.id,
			'field_class': 'css_filters-blur',
			'on_change': 'object',
			'type': 'sliderbar',
			'title': 'Blur',
			'key': 'blur',
			'default_value': '0',
			'param': {
				'min': '0',
				'max': '20',
				'step': '0.1',
				'unit': 'px',
			}
		},
		{
			'id': field.id,
			'field_class': 'css_filters-brightness',
			'on_change': 'object',
			'type': 'sliderbar',
			'title': 'Brightness',
			'key': 'brightness',
			'default_value': '0',
			'param': {
				'min': '0',
				'max': '200',
				'step': '1',
				'unit': '%',
			}
		},
		{
			'id': field.id,
			'field_class': 'css_filters-contrast',
			'on_change': 'object',
			'type': 'sliderbar',
			'title': 'Contrast',
			'key': 'contrast',
			'default_value': '0',
			'param': {
				'min': '0',
				'max': '200',
				'step': '1',
				'unit': '%',
			}
		},
		{
			'id': field.id,
			'field_class': 'css_filters-saturate',
			'on_change': 'object',
			'type': 'sliderbar',
			'title': 'Saturate',
			'key': 'saturate',
			'default_value': '0',
			'param': {
				'min': '0',
				'max': '200',
				'step': '1',
				'unit': '%',
			}
		},
		{
			'id': field.id,
			'field_class': 'css_filters-hue-rotate',
			'on_change': 'object',
			'type': 'sliderbar',
			'title': 'Hue',
			'key': 'hue-rotate',
			'default_value': '0',
			'param': {
				'min': '0',
				'max': '360',
				'step': '1',
				'unit': 'deg',
			}
		},
	];

	html += `<input data-key="string" type="hidden" class="pseudo-field css_filters-hidden mfn-field-value" name="${field.id}" value="${value}">`;

	const mfn_form_gradient = new MfnForm( used_fields );
    html += mfn_form_gradient.render();
    html += '</div>';
	return html;
}