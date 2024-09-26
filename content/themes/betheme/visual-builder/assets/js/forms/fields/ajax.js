function mfn_field_ajax(field) {
	let action = '';
	let param = '';
	let button = 'Randomize';

	if( _.has(field, 'action') ){
		action = field.action;
	}

	if( _.has(field, 'param') ){
		param = field.param;
	}

	let html = `<div class="form-group ajax">
		<div class="form-control">
			<a class="mfn-btn mfn-btn-blue" href="#" data-nonce="${mfnvbvars.wpnonce}" data-ajax="${mfnajaxurl}" data-action="${action}" data-param="${param}">
				<span class="btn-wrapper">${button}</span>
			</a>
		</div>
	</div>`;
	return html;
}   