function mfn_field_backdrop_filter(field) {
	let html = '<div class="mfn-toggle-fields-wrapper backdrop_filters_form">';
	let value = '';

	if( _.has(edited_item['attr'], field.id) && _.has(edited_item['attr'][field.id], 'string') ){
		value = edited_item['attr'][field.id]['string'];
	}

	let used_fields = [
		{
			'id': field.id,
			'field_class': 'backdrop_filter-blur',
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
			'field_class': 'backdrop_filter-brightness',
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
			'field_class': 'backdrop_filter-contrast',
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
			'field_class': 'backdrop_filter-saturate',
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
			'field_class': 'backdrop_filter-hue-rotate',
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
		{
			'id': field.id,
			'field_class': 'backdrop_filter-grayscale',
			'on_change': 'object',
			'type': 'sliderbar',
			'title': 'Grayscale',
			'key': 'grayscale',
			'default_value': '0',
			'param': {
				'min': '0',
				'max': '1',
				'step': '0.1',
				'unit': '',
			}
		},
		{
			'id': field.id,
			'field_class': 'backdrop_filter-opacity',
			'on_change': 'object',
			'type': 'sliderbar',
			'title': 'Opacity',
			'key': 'opacity',
			'default_value': '0',
			'param': {
				'min': '0',
				'max': '1',
				'step': '0.1',
				'unit': '',
			}
		},
		{
			'id': field.id,
			'field_class': 'backdrop_filter-sepia',
			'on_change': 'object',
			'type': 'sliderbar',
			'title': 'Sepia',
			'key': 'sepia',
			'default_value': '0',
			'param': {
				'min': '0',
				'max': '100',
				'step': '1',
				'unit': '%',
			}
		},
		{
			'id': field.id,
			'field_class': 'backdrop_filter-invert',
			'on_change': 'object',
			'type': 'sliderbar',
			'title': 'Invert',
			'key': 'invert',
			'default_value': '0',
			'param': {
				'min': '0',
				'max': '100',
				'step': '1',
				'unit': '%',
			}
		},
	];

	html += `<input data-key="string" type="hidden" class="pseudo-field backdrop_filter-hidden mfn-field-value" name="${field.id}" value="${value}">`;

	const mfn_form_bf = new MfnForm( used_fields );
    html += mfn_form_bf.render();
    html += '</div>';
	return html;
}