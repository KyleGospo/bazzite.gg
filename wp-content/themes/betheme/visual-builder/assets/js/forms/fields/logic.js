function mfn_field_logic(field = false) {
	let value = '';
	let html = '';
	let label = 'Add conditions';

	if( _.has(edited_item, 'attr') && _.has(edited_item.attr, 'conditions') ){
		label = 'Edit conditions';
		html += mfn_field_logic_sidebar_used();
	}

	html += `<a href="#" class="mfn-btn mfn-btn-blue mfn-conditional-logic-add-button"><span class="btn-wrapper">${label}</span></a>`;

	return html;
}

function mfn_field_logic_sidebar_used() {
	let html = '';
	let item = document.getElementById("mfn-vb-ifr").contentWindow.window.jQuery('.vb-item[data-uid="'+edited_item.uid+'"]');

	if( edited_item.jsclass != 'section' && edited_item.jsclass != 'wrap' ){
		item = document.getElementById("mfn-vb-ifr").contentWindow.window.jQuery('.vb-item[data-uid="'+edited_item.uid+'"] > .mcb-column-inner');
	}

	_.map( edited_item.attr.conditions, function(val, x) {
			html += `<div class="mfn-used-conditional-logic mfn-used-conditional-logic-${val.length}">`;
			_.map( val, function(v, i) {

				var val_obj = typeof v.value === 'object' ? v.value.label : v.value;

				html += `<div class="mfn-used-conditional-logic-row">
					<div class="mfn-used-cl-col">${ i == 0 ? ( x > 0 ? 'or' : 'if' ) : 'and'}</div>
					<div class="mfn-used-cl-col"><span class="mfn-cl-highlighted">${v.key.replaceAll('_', ' ')}</span></div>
					<div class="mfn-used-cl-col">${v.var}</div>
					<div class="mfn-used-cl-col"><span class="mfn-cl-highlighted">${val_obj ? val_obj.replaceAll('_', ' ').replaceAll('-', ' ') : ''}</span></div>
				</div>`
			})
			html += `</div>`;
	});

	if( html.length ){ 
		jQuery('.mfn-conditional-logic-add-button span').text('Edit conditions'); 
		item.addClass('mfn-conditional-logic');
	}else{ 
		jQuery('.mfn-conditional-logic-add-button span').text('Add conditions'); 
		item.removeClass('mfn-conditional-logic');
	}

	return html;

}