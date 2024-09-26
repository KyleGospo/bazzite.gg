function mfn_field_gradient(field) {
	let html = '<div class="gradient-form">';
	let rand = Math.random().toString(36).substring(4);
	let cond_id = 'gradient-type-'+rand;
	let value = '';

	if( _.has(edited_item['attr'], field.id) && _.has(edited_item['attr'][field.id], 'string') ){
		value = edited_item['attr'][field.id]['string'];
	}

	let used_fields = [
		{
			'id': field.id,
			'field_class': 'gradient-color',
			'on_change': 'object',
			'key': 'color',
			'type': 'color',
			'title': 'Color',
		},
		{
			'id': field.id,
			'field_class': 'gradient-location',
			'on_change': 'object',
			'type': 'sliderbar',
			'title': 'Location',
			'key': 'location',
			'default_value': '0%',
			'param': {
				'min': '0',
				'max': '100',
				'step': '1',
				'unit': '%',
			}
		},
		{
			'id': field.id,
			'field_class': 'gradient-color2',
			'on_change': 'object',
			'key': 'color2',
			'type': 'color',
			'title': 'Second color',
		},
		{
			'id': field.id,
			'field_class': 'gradient-location2',
			'type': 'sliderbar',
			'on_change': 'object',
			'default_value': '100%',
			'key': 'location2',
			'title': 'Second location',
			'param': {
				'min': '0',
				'max': '100',
				'step': '1',
				'unit': '%',
			}
		},
		{
			'id': field.id,
			'field_class': 'gradient-type',
			'on_change': 'object',
			'attr_id': cond_id,
			'type': 'select',
			'title': 'Type',
			'key': 'type',
			'default_value': 'linear-gradient',
			'options': {
				'linear-gradient': 'Linear gradient',
				'radial-gradient': 'Radial gradient',
			}
		},
		{
			'id': field.id,
			'field_class': 'gradient-angle',
			'on_change': 'object',
			'type': 'sliderbar',
			'key': 'angle',
			'condition': { 'id': cond_id, 'opt': 'is', 'val': 'linear-gradient' },
			'title': 'Angle',
			'default_value': '0deg',
			'param': {
				'min': '0',
				'max': '359',
				'step': '1',
				'unit': 'deg',
			}
		},
		{
			'id': field.id,
			'type': 'select',
			'on_change': 'object',
			'field_class': 'gradient-position',
			'default_value': 'center center',
			'key': 'position',
			'condition': { 'id': cond_id, 'opt': 'is', 'val': 'radial-gradient' },
			'title': 'Position',
			'options': {
				'center center': 'Center Center',
				'center left': 'Center Left',
				'center right': 'Center Right',
				'top center': 'Top Center',
				'top left': 'Top Left',
				'top right': 'Top Right',
				'bottom center': 'Bottom Center',
				'bottom left': 'Bottom Left',
				'bottom right': 'Bottom Right',
			}
		},
	];

	html += `<input type="hidden" data-key="string" class="pseudo-field gradient-hidden mfn-field-value" name="${field.id}" value="${value}">`;
	const mfn_form_gradient = new MfnForm( used_fields );
    html += mfn_form_gradient.render();

	html += '</div>';
	return html;
}