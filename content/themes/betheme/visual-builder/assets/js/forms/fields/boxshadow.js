function mfn_field_boxshadow(field) {
	let value = {};
	let value_string = '';

    if( _.has(edited_item, field.id) ){
		value = edited_item[field.id];
	}

	let x = _.has(value, 'x') ? value.x : '';
	let y = _.has(value, 'y') ? value.y : '';
	let blur = _.has(value, 'blur') ? value.blur : '';
	let spread = _.has(value, 'spread') ? value.spread : '';
	let color = _.has(value, 'color') ? value.color : '';
	let inset = _.has(value, 'inset') ? value.inset : '';

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