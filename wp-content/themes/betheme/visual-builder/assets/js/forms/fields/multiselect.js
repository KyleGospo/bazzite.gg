function mfn_field_multiselect(field) {
	let value = [];
	let options = _.has(field, 'js_hierarchical_options') ? mfnDbLists[field.js_hierarchical_options] : '';

	if( _.has(edited_item['attr'], field.id) && edited_item['attr'][field.id].length ){
		value = edited_item['attr'][field.id];
	}

	let html = `<div class="form-content"><div class="form-group mfn-multiselect-field-wrapper">
		<div class="form-control">
			${ _.map( value, (val) => `<span data-id="${val.key}">&#10005; ${val.value}</span>` ).join('') }
			<input type="text" class="mfn-multiselect-input" placeholder="Type...">
		</div>
		<ul class="mfn-multiselect-options"> 
			${ _.has(field, 'opt_append') ? _.map( field.opt_append, (opta, o) => `<li data-name="${o}" data-id="${o}" ${value == o ? 'class="selected"' : ''}>${opta}</li>` ).join('') : '' }
			${ _.map( options, (opt) => `
				<li data-name="${opt.name.replaceAll("&nbsp;", "")}" data-id="${opt.id}" ${ _.has(edited_item['attr'], field.id) && typeof edited_item['attr'][field.id] === 'object' && edited_item['attr'][field.id].filter( (item) => item.key == opt.id ).length ? "class=\"selected\"" : "" }>
					${opt.name}
					</li>`).join('') 
			}
		</ul>
	</div></div>`;
	return html;
}