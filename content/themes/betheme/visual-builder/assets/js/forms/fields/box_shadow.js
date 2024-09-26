function mfn_field_box_shadow(field) {
	let value = [];
	let value_string = '';
	let inset = '';
	let x = '';
	let y = '';
	let blur = '';
	let spread = '';
	let color = '';

    if( _.has(edited_item['attr'], field.id) && edited_item['attr'][field.id].length ){
		value = edited_item['attr'][field.id].split(' ');
		value_string = edited_item['attr'][field.id];
	}else if( (edited_item.jsclass == 'pageoption' || edited_item.jsclass == 'themeoption') && _.has(edited_item, field.id) && edited_item[field.id].length ){
		value = edited_item[field.id].split(' ');
		value_string = edited_item[field.id];
	}

	//if( value.length && value[0] == 'inset' ) inset = value.shift();
	if( value.length && (value[0] == 'inset' || value.length == 6) ) inset = value.shift();

	if( value.length ) {
		x = value[0];
		y = value[1];
		blur = value[2];
		spread = value[3];
		color = value[4];
	}

	let html = `<div class="form-content"><div class="form-group multiple-inputs equal-full-inputs has-addons has-addons-append ${inset != '' ? 'isInset' : ''}">
		<div class="field"><input class="boxshadow-inset" type="hidden" name="${field.id}"  data-key="inset" value="${inset}" autocomplete="off"/></div>
		<div class="form-control">
			<input class="pseudo-field mfn-form-control mfn-field-value" type="hidden" name="${field.id}" value="${value_string}" autocomplete="off"/>

			<div class="field" data-key="x">
				<input type="text" class="mfn-form-control mfn-form-input numeral mfn-group-field-x" data-key="x" value="${x}" autocomplete="off" placeholder="" />
			</div>

			<div class="field" data-key="y">
				<input type="text" class="mfn-form-control mfn-form-input numeral mfn-group-field-y" data-key="y" value="${y}" autocomplete="off" placeholder="" />
			</div>

			<div class="field" data-key="blur">
				<input type="text" class="mfn-form-control mfn-form-input numeral mfn-group-field-blur" data-key="blur" value="${blur}" autocomplete="off" placeholder="" />
			</div>

			<div class="field" data-key="spread">
				<input type="text" class="mfn-form-control mfn-form-input numeral mfn-group-field-spread" data-key="spread" value="${spread}" autocomplete="off" placeholder="" />
			</div>

		</div>

		<div class="form-addon-append">
			<a href="#" class="inset"><span class="label">Inset</span></a>
		</div>

		${mfn_field_color(color)}

	</div></div>`;
	return html;
}