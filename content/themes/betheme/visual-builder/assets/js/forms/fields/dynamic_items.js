function mfn_field_dynamic_items(field) {
	let x = 0;
	let items = [];
	let options = [];

	if( _.has(edited_item['attr'], field.id) && edited_item['attr'][field.id].length ){
		items = edited_item['attr'][field.id];
	}else if( _.has(field, 'std') && field.std.length ){
		items = field.std;
	}

	if( _.has(field, 'options') ){
		options = field.options;
	}

	let html = `<div class="form-content"><div class="form-group dynamic-items">
		<div class="dynamic_items_wrapper" data-name="${field.id}" data-preview="${field.options.preview}">
			<ul class="dynamic_items_preview di-preview-${field.options.preview}">
				${ _.map( items, function(el, i) {
					return `<li data-uid="${el.uid}" class="uid-${el.uid}" data-order="${i}"><img src="${el.url}" alt=""><a class="mfn-option-btn mfn-button-delete di-remove" data-tooltip="Delete" href="#"><span class="mfn-icon mfn-icon-delete"></span></a></li>`;
				}).join('') }
			</ul>

			<label>Add new</label>

			<div class="dynamic_items_form">
				<div class="dynamic_items_row">

					${ _.has(options, 'var') ?
						`<div class="di-input-wrapper di-input-rule">
							<select class="mfn-form-control di-input">
								${ _.map( options.var, function(va, v) {
									return `<option value="${v}">${va}</option>`;
								}).join('') }
							</select>
						</div>`
					 : 'Undefined var option.' }

					 ${ _.has(options, 'options') ?

					 	_.map( options.options, function(fie, f) {
					 		let input_class = `di-if-${f}`;
					 		if( ++x == 1 ) input_class += ' di-input-active';

					 		let rh = `<div class="di-input-wrapper ${input_class}">`;
						 		if( fie.type == 'select-img' ){
						 			let input_uid = Math.random().toString(36).substring(4);

						 			rh += `<a href="#" data-modal="mfn-modal-${input_uid}" class="di-show-modal mfn-btn btn-icon-left"><span class="btn-wrapper"><span class="mfn-icon mfn-icon-add"></span>Select</span></a>`;
						 			rh += `<div class="mfn-modal mfn-modal-payments" id="mfn-modal-${input_uid}"><div class="mfn-modalbox mfn-form mfn-shadow-1"><div class="modalbox-header"><div class="options-group"><div class="modalbox-title-group"><span class="modalbox-icon mfn-icon-add-big"></span><div class="modalbox-desc"><h4 class="modalbox-title">Select payment method</h4></div></div></div><div class="options-group"><a class="mfn-option-btn mfn-option-blank btn-large btn-modal-close inner" href="#"><span class="mfn-icon mfn-icon-close"></span></a></div></div><div class="modalbox-content"><ul class="mfn-items-list list">`;
						 			
						 			_.map( fie.options, function(li, l) {
						 				rh += `<li><a href="#"><span class="mfn-icon"><img src="${li}" alt=""></span><p class="titleicon">${l}</p></a></li>`;
						 			}).join('')

						 			rh += `</ul></div></div></div>`;

						 		}else if( fie.type == 'upload' ){
						 			rh += `<div class="form-group browse-image has-addons has-addons-append empty">
						 				<div class="form-control has-icon has-icon-right"><input type="text" name="" class="mfn-form-control mfn-field-value mfn-form-input preview-icon" value="" /><a class="mfn-option-btn mfn-button-delete" title="Delete" href="#"><span class="mfn-icon mfn-icon-delete"></span></a></div>
						 				<div class="form-addon-append"><a href="#" class="mfn-button-upload"><span class="label">Browse</span></a></div>
						 				<div class="selected-image"></div>
						 				</div>`;
						 		}else{
						 			rh += `Undefined field`;
						 		}
						 	rh += `</div>`;
						 	return rh;
					 	}).join('')

					 : 'Undefined options' }

				</div>
			</div>

		</div>
	</div></div>`;
	return html;
}