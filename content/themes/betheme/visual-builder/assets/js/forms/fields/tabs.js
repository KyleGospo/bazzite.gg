function mfn_field_tabs(field) {
	let html = '';
	let preview = '';
	let primary = 'title';
	let secondary = 'title';
	let ul_classes = ['tabs-wrapper']
	let options = [];
	let tabs = [];

	if( _.has(field, 'preview') ){
		ul_classes.push('preview-'+field.preview);
	}

	if( _.has(field, 'primary') ){
		primary = field.primary;
	}

	if( _.has(field, 'secondary') ){
		secondary = field.secondary;
	}

	if( _.has(field, 'options') ){
		options = field.options;
	}

	if( _.has(edited_item['attr'], field.id) && edited_item['attr'][field.id].length ){
		tabs = edited_item['attr'][field.id];
	}else if( _.has(field, 'std') && field.std.length ){
		tabs = field.std;
	}

	const inputs = {
		input: function input(val, o, i) {
			let input_classes = ['not-empty field-to-object mfn-form-control mfn-form-input', 'mfn-tab-'+o];
			if( o == primary ) input_classes.push('js-title');
			return `<input data-order="${i}" data-label="${o}" class="${input_classes.join(' ')}" type="text" name="${field.id}[${i}][${o}]" value="${_.escape(val)}" />`;
		},
		select: function select(val, o, i) {
			let input_classes = ['not-empty field-to-object mfn-form-control mfn-form-select', 'mfn-tab-'+o];
			if( o == primary ) input_classes.push('js-title');
			let html = `<select data-order="${i}" data-label="${o}" class="${input_classes.join(' ')}" name="${field.id}[${i}][${o}]">`;
			if( typeof options[o][3] === 'array' || typeof options[o][3] === 'object' ){
				_.map( options[o][3], function(option, opt) { html += `<option value="">${option}</option>` }).join('')
			}else if( typeof options[o][3] === 'string' ){
				_.map( mfnDbLists[options[o][3]], (opt, o) => html += '<option '+( val && val == o ? 'selected' : '' )+' value="'+o+'">'+opt+'</option>' ).join('')
			}
			html += `</select>`;
			return html;
		},
		textarea: function textarea(val, o, i) {
			let input_classes = ['ot-empty field-to-object mfn-form-control mfn-form-textarea', 'mfn-tab-'+o];
			if( o == primary ) input_classes.push('js-title');
			return `<textarea data-order="${i}" data-label="${o}" class="n${input_classes.join(' ')}" rows="3" name="${field.id}[${i}][${o}]">${val}</textarea>`;
		},
		icon: function icon(val, o, i) {
			let input_classes = ['not-empty field-to-object mfn-form-control mfn-form-input', 'mfn-tab-'+o];
			if( o == primary ) input_classes.push('js-title');
			return `<div class="form-group browse-icon has-addons has-addons-prepend not-empty"><div class="form-addon-prepend"><a href="#" class="mfn-button-upload"><span class="label"><span class="text">Browse</span><i class="icon-basket"></i></span></a></div><div class="form-control has-icon has-icon-right"><input data-order="${i}" name="${field.id}[${i}][${o}]" data-label="${o}" class="${input_classes.join(' ')}" type="text" name="icon" value="${val}" placeholder="icon-dot"><a class="mfn-option-btn mfn-button-delete" title="Delete" href="#"><span class="mfn-icon mfn-icon-delete"></span></a></div></div>`;
		},
		image: function image(val, o, i) {
			let input_classes = ['not-empty field-to-object mfn-form-control mfn-form-input', 'mfn-tab-'+o];
			let input_wrapper_classes = ['form-group browse-image has-addons has-addons-append'];
			if( o == primary ) input_classes.push('js-title');
			if( val == '' ) input_wrapper_classes.push('empty');
			return `<div class="${input_wrapper_classes.join(' ')}"><div class="form-control has-icon has-icon-right"><input name="${field.id}[${i}][${o}]" data-order="${i}" data-label="${o}" class="${input_classes.join(' ')}" type="text" name="${field.id}[${i}][${o}]" value="${val}" data-type="image"><a class="mfn-option-btn mfn-button-delete" title="Delete" href="#"><span class="mfn-icon mfn-icon-delete"></span></a></div><div class="form-addon-append"><a href="#" class="mfn-button-upload"><span class="label">Browse</span></a></div></div>`;
		},
		color: function color(val, o, i) {
			let input_classes = ['not-empty field-to-object mfn-form-control color-picker-vb mfn-form-input', 'mfn-tab-'+o];
			if( o == primary ) input_classes.push('js-title');
			return `<div class="form-group color-picker has-addons has-addons-prepend"><div class="color-picker-group"><div class="form-addon-prepend"><a href="#" class="color-picker-open"><span class="label"><i class="icon-bucket"></i></span></a></div><div class="form-control has-icon has-icon-right"><input name="${field.id}[${i}][${o}]" data-order="${i}" data-label="${o}" class="${input_classes.join(' ')}" type="text" value="${val}" autocomplete="off" /><a class="mfn-option-btn mfn-option-text color-picker-clear" href="#"><span class="text">Clear</span></a></div></div></div>`;
		}
	}

	html += `<div class="form-content"><div class="form-group tabs mfn-form-verical">
		<ul class="${ul_classes.join(' ')}">
			<li class="tab default">
				
				<div class="tab-header">
					<a class="mfn-option-btn mfn-option-blank mfn-tab-toggle mfn-tab-show" href="#"><span class="mfn-icon mfn-icon-arrow-down"></span></a>
					<a class="mfn-option-btn mfn-option-blank mfn-tab-toggle mfn-tab-hide" href="#"><span class="mfn-icon mfn-icon-arrow-up"></span></a>
					<h6 class="title">${field.options[primary][2]}</h6>
					<a class="mfn-option-btn mfn-option-blue mfn-tab-clone" href="#"><span class="mfn-icon mfn-icon-clone"></span></a>
					<a class="mfn-option-btn mfn-option-blue mfn-tab-delete" href="#"><span class="mfn-icon mfn-icon-delete"></span></a>
				</div>

				<div class="tab-content">
					${ _.map( options, (opt, o) => `
						<div class="mfn-form-row mfn-tabs-row">
							<label class="form-label">${opt[1]}</label>
							<div class="form-content">
								${ inputs[opt[0]](opt[2], o, 0) }
							</div>
						</div>
					` ).join('') }
				</div>
				
			</li>

			${ _.map( tabs, (val, v) => `
				<li class="tab">
				
					<div class="tab-header">
						<a class="mfn-option-btn mfn-option-blank mfn-tab-toggle mfn-tab-show" href="#"><span class="mfn-icon mfn-icon-arrow-down"></span></a>
						<a class="mfn-option-btn mfn-option-blank mfn-tab-toggle mfn-tab-hide" href="#"><span class="mfn-icon mfn-icon-arrow-up"></span></a>
						<h6 class="title">${_.escape(val[primary])}</h6>
						<a class="mfn-option-btn mfn-option-blue mfn-tab-clone" href="#"><span class="mfn-icon mfn-icon-clone"></span></a>
						<a class="mfn-option-btn mfn-option-blue mfn-tab-delete" href="#"><span class="mfn-icon mfn-icon-delete"></span></a>
					</div>

					<div class="tab-content">
						${ _.map( options, function(opt, o) {
							let val_input = typeof val[o] !== 'undefined' ? val[o]+'' : '';
							return `
							<div class="mfn-form-row mfn-tabs-row">
								<label class="form-label">${o}</label>
								<div class="form-content">
									${ inputs[opt[0]](val_input, o, v) }
								</div>
							</div>`;
						}).join('') }
					</div>
					
				</li>
			`).join('') }
		</ul>
		<a href="#" class="mfn-button-add">Add new</a>
	</div></div>`;

	return html;
}