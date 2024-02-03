function mfn_field_pills(field) {
	let value = '';
	let splited_value = [];

	if( _.has(edited_item['attr'], field.id) && edited_item['attr'][field.id].length ){
		value = edited_item['attr'][field.id];
		splited_value = edited_item['attr'][field.id].split(" ");
	}

	let html = `<div class="form-content"><div class="form-group mfn-pills-field">
		<input type="hidden" name="${field.id}" class="mfn-pills-input-hidden mfn-field-value" value="${value}">
		<div class="form-control">
			${ splited_value.length ? _.map(splited_value, function(c) { '<span><i class="icon-cancel"></i>'+c+'</span>' }).join('') : '' }
			<input type="text" class="mfn-pills-input" placeholder="type in..."/>
		</div>
	</div></div>`;
	
	return html;
}