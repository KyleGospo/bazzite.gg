function mfn_field_checkbox_pseudo(field) {
	let classes = ['form-group', 'checkboxes', 'pseudo'];
	let value = '';

	if( _.has(field, 'std') ){
		value = field.std;
	}

	if( _.has(edited_item['attr'], field.id) && edited_item['attr'][field.id].length ){
		// builder
		value = edited_item['attr'][field.id];
	}else if( (edited_item.jsclass == 'pageoption' || edited_item.jsclass == 'themeoption') && _.has(edited_item, field.id) && edited_item[field.id].length ){
		// themeoption
		value = edited_item[field.id];
	}

	let html = `<div class="form-content"><div class="${classes.join(' ')}">
			<input type="hidden" class="value mfn-field-value">
			<div class="form-control">
				<ul>
				${ _.has(field, 'options') ? _.map(field.options, function(opt, o) {
					
					if( !['full-screen', 'full-width', 'equal-height', 'equal-height-wrap'].includes(o) || value.split(' ').includes(o) ) {

						return `<li class="${ value.split(' ').includes(o) ? 'active' : ''}">
								<input type="checkbox" class="mfn-form-checkbox" ${ value.split(' ').includes(o) ? 'checked' : '' } name="${field.id}" value="${o}" />
								<span class="title">${opt}</span>
							</li>`;
					}

				}).join('') : '' }
				</ul>
			</div>
		</div></div>`;

	return html;
}