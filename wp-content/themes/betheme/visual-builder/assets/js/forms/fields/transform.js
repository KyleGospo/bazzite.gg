function mfn_field_transform(field) {
	let html = '';
	let used_fields = [
		{
			'id': field.id,
			'type': 'sliderbar',
			'responsive': 'desktop',
			'title': 'TranslateX',
			'key': 'translateX',
			'param': {
				'min': '-1040',
				'max': '1040',
				'step': '1',
				'unit': '%',
			}
		},
		{
			'id': field.id+'_laptop',
			'type': 'sliderbar',
			'responsive': 'laptop',
			'class': 'transform',
			'title': 'TranslateX',
			'key': 'translateX_laptop',
			'param': {
				'min': '-1040',
				'max': '1040',
				'step': '1',
				'unit': '%',
			}
		},
		{
			'id': field.id+'_tablet',
			'type': 'sliderbar',
			'responsive': 'tablet',
			'class': 'transform',
			'title': 'TranslateX',
			'key': 'translateX_tablet',
			'param': {
				'min': '-1040',
				'max': '1040',
				'step': '1',
				'unit': '%',
			}
		},
		{
			'id': field.id+'_mobile',
			'type': 'sliderbar',
			'responsive': 'mobile',
			'class': 'transform',
			'title': 'TranslateX',
			'key': 'translateX_mobile',
			'param': {
				'min': '-1040',
				'max': '1040',
				'step': '1',
				'unit': '%',
			}
		},
		{
			'id': field.id,
			'type': 'sliderbar',
			'title': 'TranslateY',
			'responsive': 'desktop',
			'key': 'translateY',
			'param': {
				'min': '-1040',
				'max': '1040',
				'step': '1',
				'unit': '%',
			}
		},
		{
			'id': field.id+'_laptop',
			'type': 'sliderbar',
			'title': 'TranslateY',
			'class': 'transform',
			'responsive': 'laptop',
			'key': 'translateY_laptop',
			'param': {
				'min': '-1040',
				'max': '1040',
				'step': '1',
				'unit': '%',
			}
		},
		{
			'id': field.id+'_tablet',
			'type': 'sliderbar',
			'title': 'TranslateY',
			'class': 'transform',
			'responsive': 'tablet',
			'key': 'translateY_tablet',
			'param': {
				'min': '-1040',
				'max': '1040',
				'step': '1',
				'unit': '%',
			}
		},
		{
			'id': field.id+'_mobile',
			'type': 'sliderbar',
			'title': 'TranslateY',
			'class': 'transform',
			'responsive': 'mobile',
			'key': 'translateY_mobile',
			'param': {
				'min': '-1040',
				'max': '1040',
				'step': '1',
				'unit': '%',
			}
		},
		{
			'id': field.id,
			'type': 'sliderbar',
			'responsive': 'desktop',
			'title': 'Rotate',
			'key': 'rotate',
			'param': {
				'min': '0',
				'max': '359',
				'step': '1',
				'unit': 'deg',
			}
		},
		{
			'id': field.id+'_laptop',
			'type': 'sliderbar',
			'class': 'transform',
			'responsive': 'laptop',
			'title': 'Rotate',
			'key': 'rotate_laptop',
			'param': {
				'min': '0',
				'max': '359',
				'step': '1',
				'unit': 'deg',
			}
		},
		{
			'id': field.id+'_tablet',
			'type': 'sliderbar',
			'class': 'transform',
			'responsive': 'tablet',
			'title': 'Rotate',
			'key': 'rotate_tablet',
			'param': {
				'min': '0',
				'max': '359',
				'step': '1',
				'unit': 'deg',
			}
		},
		{
			'id': field.id+'_mobile',
			'type': 'sliderbar',
			'class': 'transform',
			'responsive': 'mobile',
			'title': 'Rotate',
			'key': 'rotate_mobile',
			'param': {
				'min': '0',
				'max': '359',
				'step': '1',
				'unit': 'deg',
			}
		},

		{
			'id': field.id,
			'type': 'sliderbar',
			'responsive': 'desktop',
			'title': 'ScaleX',
			'key': 'scaleX',
			'param': {
				'min': '0',
				'max': '3',
				'step': '0.05',
				'unit': '',
			}
		},
		{
			'id': field.id+'_laptop',
			'type': 'sliderbar',
			'responsive': 'laptop',
			'title': 'ScaleX',
			'class': 'transform',
			'key': 'scaleX_laptop',
			'param': {
				'min': '0',
				'max': '3',
				'step': '0.05',
				'unit': '',
			}
		},
		{
			'id': field.id+'_tablet',
			'type': 'sliderbar',
			'responsive': 'tablet',
			'title': 'ScaleX',
			'class': 'transform',
			'key': 'scaleX_tablet',
			'param': {
				'min': '0',
				'max': '3',
				'step': '0.05',
				'unit': '',
			}
		},
		{
			'id': field.id+'_mobile',
			'type': 'sliderbar',
			'responsive': 'mobile',
			'title': 'ScaleX',
			'class': 'transform',
			'key': 'scaleX_mobile',
			'param': {
				'min': '0',
				'max': '3',
				'step': '0.05',
				'unit': '',
			}
		},

		{
			'id': field.id,
			'type': 'sliderbar',
			'responsive': 'desktop',
			'title': 'ScaleY',
			'key': 'scaleY',
			'param': {
				'min': '0',
				'max': '3',
				'step': '0.05',
				'unit': '',
			}
		},
		{
			'id': field.id+'_laptop',
			'type': 'sliderbar',
			'responsive': 'laptop',
			'class': 'transform',
			'title': 'ScaleY',
			'key': 'scaleY_laptop',
			'param': {
				'min': '0',
				'max': '3',
				'step': '0.05',
				'unit': '',
			}
		},
		{
			'id': field.id+'_tablet',
			'type': 'sliderbar',
			'responsive': 'tablet',
			'class': 'transform',
			'title': 'ScaleY',
			'key': 'scaleY_tablet',
			'param': {
				'min': '0',
				'max': '3',
				'step': '0.05',
				'unit': '',
			}
		},
		{
			'id': field.id+'_mobile',
			'type': 'sliderbar',
			'responsive': 'mobile',
			'class': 'transform',
			'title': 'ScaleY',
			'key': 'scaleY_mobile',
			'param': {
				'min': '0',
				'max': '3',
				'step': '0.05',
				'unit': '',
			}
		},

		{
			'id': field.id,
			'type': 'sliderbar',
			'responsive': 'desktop',
			'title': 'SkewX',
			'key': 'skewX',
			'param': {
				'min': '-4',
				'max': '4',
				'step': '0.05',
				'unit': '',
			}
		},
		{
			'id': field.id+'_laptop',
			'type': 'sliderbar',
			'class': 'transform',
			'responsive': 'laptop',
			'title': 'SkewX',
			'key': 'skewX_laptop',
			'param': {
				'min': '-4',
				'max': '4',
				'step': '0.05',
				'unit': '',
			}
		},
		{
			'id': field.id+'_tablet',
			'type': 'sliderbar',
			'class': 'transform',
			'responsive': 'tablet',
			'title': 'SkewX',
			'key': 'skewX_tablet',
			'param': {
				'min': '-4',
				'max': '4',
				'step': '0.05',
				'unit': '',
			}
		},
		{
			'id': field.id+'_mobile',
			'type': 'sliderbar',
			'class': 'transform',
			'responsive': 'mobile',
			'title': 'SkewX',
			'key': 'skewX_mobile',
			'param': {
				'min': '-4',
				'max': '4',
				'step': '0.05',
				'unit': '',
			}
		},

		{
			'id': field.id,
			'type': 'sliderbar',
			'responsive': 'desktop',
			'title': 'SkewY',
			'key': 'skewY',
			'param': {
				'min': '-4',
				'max': '4',
				'step': '0.05',
				'unit': '',
			}
		},
		{
			'id': field.id+'_laptop',
			'type': 'sliderbar',
			'class': 'transform',
			'responsive': 'laptop',
			'title': 'SkewY',
			'key': 'skewY_laptop',
			'param': {
				'min': '-4',
				'max': '4',
				'step': '0.05',
				'unit': '',
			}
		},
		{
			'id': field.id+'_tablet',
			'type': 'sliderbar',
			'class': 'transform',
			'responsive': 'tablet',
			'title': 'SkewY',
			'key': 'skewY_tablet',
			'param': {
				'min': '-4',
				'max': '4',
				'step': '0.05',
				'unit': '',
			}
		},
		{
			'id': field.id+'_mobile',
			'type': 'sliderbar',
			'class': 'transform',
			'responsive': 'mobile',
			'title': 'SkewY',
			'key': 'skewY_mobile',
			'param': {
				'min': '-4',
				'max': '4',
				'step': '0.05',
				'unit': '',
			}
		},

	];

	html += `<div class="form-group multiple-inputs multiple-inputs-with-color has-addons has-addons-append transform_field">`;
		html += `<input class="mfn-field-value mfn-pseudo-val" name="${field.id}" data-key="string" type="hidden">`;
		const mfn_form_transform = new MfnForm( used_fields );
	    html += mfn_form_transform.render();
    html += `</div>`;

	return html;
}