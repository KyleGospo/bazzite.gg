function mfn_field_typography_vb(field) {
	let html = '';
	let used_fields = [
		{
			'id': field.id,
			'key': 'font-size',
			'type': 'sliderbar',
			'responsive': 'desktop',
			'class': 'typo-font-size',
			'title': 'Size',
			'units': {
				'px': {'min': 1, 'max': 100, 'step': 1},
				'em': {'min': 0.1, 'max': 10, 'step': 0.1},
				'rem': {'min': 0.1, 'max': 10, 'step': 0.1},
				'vw': {'min': 1, 'max': 100, 'step': 1}
			}
		},
		{
			'id': field.id,
			'key': 'font-size_laptop',
			'type': 'sliderbar',
			'responsive': 'laptop',
			'class': 'typo-font-size',
			'title': 'Size',
			'units': {
				'px': {'min': 1, 'max': 100, 'step': 1},
				'em': {'min': 0.1, 'max': 10, 'step': 0.1},
				'rem': {'min': 0.1, 'max': 10, 'step': 0.1},
				'vw': {'min': 1, 'max': 100, 'step': 1}
			}
		},
		{
			'id': field.id,
			'key': 'font-size_tablet',
			'type': 'sliderbar',
			'responsive': 'tablet',
			'class': 'typo-font-size',
			'title': 'Size',
			'units': {
				'px': {'min': 1, 'max': 100, 'step': 1},
				'em': {'min': 0.1, 'max': 10, 'step': 0.1},
				'rem': {'min': 0.1, 'max': 10, 'step': 0.1},
				'vw': {'min': 1, 'max': 100, 'step': 1}
			}
		},
		{
			'id': field.id,
			'key': 'font-size_mobile',
			'type': 'sliderbar',
			'responsive': 'mobile',
			'class': 'typo-font-size',
			'title': 'Size',
			'units': {
				'px': {'min': 1, 'max': 100, 'step': 1},
				'em': {'min': 0.1, 'max': 10, 'step': 0.1},
				'rem': {'min': 0.1, 'max': 10, 'step': 0.1},
				'vw': {'min': 1, 'max': 100, 'step': 1}
			}
		},
		{
			'id': field.id,
			'key': 'line-height',
			'type': 'sliderbar',
			'responsive': 'desktop',
			'class': 'typo-line-height',
			'title': 'Line height',
			'units': {
				'px': {'min': 1, 'max': 100, 'step': 1},
				'em': {'min': 0.1, 'max': 10, 'step': 0.1},
				'rem': {'min': 0.1, 'max': 10, 'step': 0.1},
				'vw': {'min': 1, 'max': 100, 'step': 1}
			}
		},
		{
			'id': field.id,
			'key': 'line-height_laptop',
			'type': 'sliderbar',
			'responsive': 'laptop',
			'class': 'typo-line-height',
			'title': 'Line height',
			'units': {
				'px': {'min': 1, 'max': 100, 'step': 1},
				'em': {'min': 0.1, 'max': 10, 'step': 0.1},
				'rem': {'min': 0.1, 'max': 10, 'step': 0.1},
				'vw': {'min': 1, 'max': 100, 'step': 1}
			}
		},
		{
			'id': field.id,
			'key': 'line-height_tablet',
			'type': 'sliderbar',
			'responsive': 'tablet',
			'class': 'typo-line-height',
			'title': 'Line height',
			'units': {
				'px': {'min': 1, 'max': 100, 'step': 1},
				'em': {'min': 0.1, 'max': 10, 'step': 0.1},
				'rem': {'min': 0.1, 'max': 10, 'step': 0.1},
				'vw': {'min': 1, 'max': 100, 'step': 1}
			}
		},
		{
			'id': field.id,
			'key': 'line-height_mobile',
			'type': 'sliderbar',
			'responsive': 'mobile',
			'class': 'typo-line-height',
			'title': 'Line height',
			'units': {
				'px': {'min': 1, 'max': 100, 'step': 1},
				'em': {'min': 0.1, 'max': 10, 'step': 0.1},
				'rem': {'min': 0.1, 'max': 10, 'step': 0.1},
				'vw': {'min': 1, 'max': 100, 'step': 1}
			}
		},
		{
			'id': field.id,
			'key': 'font-weight',
			'type': 'select',
			'class': 'typo-font-weight',
			'title': 'Font weight',
			'kl_options': {
				0: {'key': '', 'label': 'Default'},
				1: {'key': 'normal', 'label': 'Normal'},
				2: {'key': 'bold', 'label': 'Bold'},
				3: {'key': '100', 'label': '100'},
				4: {'key': '200', 'label': '200'},
				5: {'key': '300', 'label': '300'},
				6: {'key': '400', 'label': '400'},
				7: {'key': '500', 'label': '500'},
				8: {'key': '600', 'label': '600'},
				9: {'key': '700', 'label': '700'},
				10: {'key': '800', 'label': '800'},
				11: {'key': '900', 'label': '900'}
			}
		},
		{
			'id': field.id,
			'key': 'letter-spacing',
			'type': 'sliderbar',
			'responsive': 'desktop',
			'class': 'typo-letter-spacing',
			'title': 'Letter spacing',
			'units': {
				'px': {'min': 1, 'max': 20, 'step': 1},
				'em': {'min': 0.1, 'max': 3, 'step': 0.1},
				'rem': {'min': 0.1, 'max': 3, 'step': 0.1},
				'vw': {'min': 1, 'max': 3, 'step': 1}
			}
		},
		{
			'id': field.id,
			'key': 'letter-spacing_laptop',
			'type': 'sliderbar',
			'responsive': 'laptop',
			'class': 'typo-letter-spacing',
			'title': 'Letter spacing',
			'units': {
				'px': {'min': 1, 'max': 20, 'step': 1},
				'em': {'min': 0.1, 'max': 3, 'step': 0.1},
				'rem': {'min': 0.1, 'max': 3, 'step': 0.1},
				'vw': {'min': 1, 'max': 3, 'step': 1}
			}
		},
		{
			'id': field.id,
			'key': 'letter-spacing_tablet',
			'type': 'sliderbar',
			'responsive': 'tablet',
			'class': 'typo-letter-spacing',
			'title': 'Letter spacing',
			'units': {
				'px': {'min': 1, 'max': 20, 'step': 1},
				'em': {'min': 0.1, 'max': 3, 'step': 0.1},
				'rem': {'min': 0.1, 'max': 3, 'step': 0.1},
				'vw': {'min': 1, 'max': 3, 'step': 1}
			}
		},
		{
			'id': field.id,
			'key': 'letter-spacing_mobile',
			'type': 'sliderbar',
			'responsive': 'mobile',
			'class': 'typo-letter-spacing',
			'title': 'Letter spacing',
			'units': {
				'px': {'min': 1, 'max': 20, 'step': 1},
				'em': {'min': 0.1, 'max': 3, 'step': 0.1},
				'rem': {'min': 0.1, 'max': 3, 'step': 0.1},
				'vw': {'min': 1, 'max': 3, 'step': 1}
			}
		},
		{
			'id': field.id,
			'key': 'text-transform',
			'type': 'select',
			'class': 'typo-text-transform',
			'title': 'Transform',
			'options': {
				'': 'Default',
				'uppercase': 'Uppercase',
				'lowercase': 'Lowercase',
				'capitalize': 'Capitalize',
				'none': 'Normal',
			}
		},
		{
			'id': field.id,
			'key': 'font-family',
			'type': 'font_select',
			'class': 'typo-font-family',
			'title': 'Font family',
			'options': 'fonts'
		},
		{
			'id': field.id,
			'key': 'font-style',
			'type': 'select',
			'class': 'typo-font-style',
			'title': 'Style',
			'options': {
				'': 'Default',
				'italic': 'Italic',
				'normal': 'Normal',
				'oblique': 'Oblique',
			}
		},
		{
			'id': field.id,
			'key': 'text-decoration',
			'type': 'select',
			'class': 'typo-text-decoration',
			'title': 'Decoration',
			'options': {
				'': 'Default',
				'underline': 'Underline',
				'overline': 'Overline',
				'line-through': 'Line through',
				'none': 'None',
			}
		},


	];

	const mfn_form_typo = new MfnForm( used_fields );

	html += `<div class="mfn-toggle-fields-wrapper">`;
        html += mfn_form_typo.render();
	html += `</div>`;
	return html;
}