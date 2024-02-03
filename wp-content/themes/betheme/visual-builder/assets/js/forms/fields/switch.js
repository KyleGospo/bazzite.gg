function mfn_field_switch(field) {
	let classes = ['form-group', 'segmented-options'];
	let ul_classes = [];
	let value= '';

	if( _.has(field, 'std') ){
		value = field.std;
	}

	if( _.has(edited_item['attr'], field.id) && edited_item['attr'][field.id].length ){
		// builder
		value = edited_item['attr'][field.id];
	}else if( (edited_item.jsclass == 'pageoption' || edited_item.jsclass == 'themeoption') && _.has(edited_item, field.id) ){
		// themeoption
		value = edited_item[field.id];
	}

	if( _.has(field, 'visual_options') ){
		classes.push('visual-segmented-options');
	}

	if( _.has(field, 'version') && field.version == 'multiple' ){
		classes.push('multiple-segmented-options');
	}else{
		classes.push('single-segmented-option');
	}

	classes.push('checkboxes-list');

	if( _.has(field, 'invert') ){
		classes.push('invert');
	}

	if( _.has(field, 'class') ){
		classes.push(field.class);
	}

	if( _.has(field, 'active_tooltip') ){
		classes.push('active-tooltip-ready');
	}

	if( _.has(field, 'preview') ){
		ul_classes.push('preview-'+field.preview);
	}

	if( _.has(field, 'id') ){
		ul_classes.push('preview-'+field.id+'input');
	}

	let html = `<div class="form-content"><div class="${classes.join(' ')}">
		<div class="form-control">
			<ul class="${ul_classes.join(' ')}">

				${ _.has(field, 'options') ? _.map(field.options, function(opt, o) {
					let data_tags = '';
					let checked = false;

					if( _.has(field, 'visual_options') ) {
						data_tags = `data-tooltip="${opt.replace('<span>', '').replace('</span>', '')}"`;
					}

					if( _.has(field, 'active_tooltip') ) {
						data_tags += ` data-tooltip-active="${field['active_tooltip'][o].replace('<span>', '').replace('</span>', '').replace('<br>', '')}"`;
					}

					if( _.has(field, 'version') && field.version == 'multiple' ){
						let exploded = value.split(' ');
						if( value.includes(o) ) checked = true;
					}else if( value == o ){
						checked = true;
					}

					return `<li ${ checked ? 'class="active"' : '' } ${data_tags}>
						<fieldset>
							<input ${ checked ? 'checked' : '' } type="checkbox" class="mfn-field-value" value="${o}" name="${field.id}" autocomplete="off" />
							${ _.has(field, 'visual_options') ? `<a href="#"><span class="img img-${o}">${ field['visual_options'][o] ? field['visual_options'][o] : '' }</span></a>` : `<a href="#"><span class="text">${opt}</span></a>` }
						</fieldset>
					</li>`;

				}).join('') : '' }

				${ _.has(field, 'kl_options') ? _.map(field.kl_options, function(opt, o) {
					let data_tags = '';
					let checked = false;

					if( _.has(field, 'visual_options') ) {
						data_tags = `data-tooltip="${opt.label.replace('<span>', '').replace('</span>', '')}"`;
					}

					if( _.has(field, 'active_tooltip') ) {
						data_tags += ` data-tooltip-active="${field['active_tooltip'][opt.key].replace('<span>', '').replace('</span>', '').replace('<br>', '')}"`;
					}

					if( _.has(field, 'version') && field.version == 'multiple' ){
						let exploded = value.split(' ');
						if( value.includes(opt.key) ) checked = true;
					}else if( value == opt.key ){
						checked = true;
					}

					return `<li ${ checked ? 'class="active"' : '' } ${data_tags}>
						<fieldset>
							<input ${ checked ? 'checked' : '' } type="checkbox" class="mfn-field-value" value="${opt.key}" name="${field.id}" autocomplete="off" />
							${ _.has(field, 'visual_options') ? `<a href="#"><span class="img img-${opt.key}">${ field['visual_options'][opt.key] ? field['visual_options'][opt.key] : '' }</span></a>` : `<a href="#"><span class="text">${opt.label}</span></a>` }
						</fieldset>
					</li>`;

				}).join('') : '' }

			</ul>
		</div>
	</div></div>`;

	return html;
}