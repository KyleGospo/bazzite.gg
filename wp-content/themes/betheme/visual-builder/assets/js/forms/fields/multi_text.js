function mfn_field_multi_text(field) {
	let value = [];
	let classes = ['form-group sidebar-add has-addons has-addons-append'];

	if( _.has(edited_item, field.id) && edited_item[field.id].length ){
		value = edited_item[field.id];
	}else{
		classes.push('empty');
	}

	let html = `<div class="${classes.join(' ')}">
		
		<div class="form-control">
			<input class="mfn-form-control mfn-form-input mfn-prevent-change" type="text" placeholder="Type sidebar title here" autocomplete=off />
		</div>

		<div class="form-addon-append">
			<a href="#" class="sidebar-add-button"><span class="label">Add sidebar</span></a>
		</div>

		<div class="break"></div>

		<div class="added-sidebars">
			<ul>

				${ _.map( value, function(v,i) {
					return `<li><input type="hidden" data-key="${i}" name="${field.id}" value="${v}" /><span class="sidebar-title">${v}</span><a class="mfn-option-btn mfn-option-blue mfn-btn-delete" title="Delete" href="#"><span class="mfn-icon mfn-icon-delete"></span></a></li>`;
				}).join('') }

				<li class="default">
					<input type="hidden" data-name="${field.id}" value="" />
					<span class="sidebar-title">Default sidebar</span>
					<a class="mfn-option-btn mfn-option-blue mfn-btn-delete" title="Delete" href="#"><span class="mfn-icon mfn-icon-delete"></span></a>
				</li>

			</ul>
		</div>

	</div>`;
	return html;
}