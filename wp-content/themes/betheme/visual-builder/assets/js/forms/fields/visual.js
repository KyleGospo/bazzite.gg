function mfn_field_visual(field) {
	let html = '';
	let value = '';
	let classes = ['mfn-form-control editor wp-editor-area'];

	if( _.has(field, 'preview') ){
		classes.push( field.preview ); // object updater only
	}

	if( _.has(edited_item['attr'], field.id) && edited_item['attr'][field.id].length ){
		value = edited_item['attr'][field.id];
	}else if( edited_item.jsclass == 'themeoption' && _.has(edited_item, field.id) && edited_item[field.id].length ){
		// themeoption
		value = edited_item[field.id];
	}

	html += `<div class="form-group visual-editor">
		<div class="form-control">
			<div class="wp-core-ui wp-editor-wrap tmce-active">

				<div class="wp-editor-tools hide-if-no-js">
					<div class="wp-media-buttons">
						<button type="button" class="button insert-media add_media" data-editor="mfn-editor"><span class="wp-media-buttons-icon"></span> Add Media</button>
					</div>
					<div class="wp-editor-tabs">
						<button type="button" class="wp-switch-editor switch-tmce" data-wp-editor-id="mfn-editor">Visual</button>
						<button type="button" class="wp-switch-editor switch-html" data-wp-editor-id="mfn-editor">Text</button>
					</div>
				</div>

				<div class="wp-editor-container">
					<textarea class="${classes.join(' ')}" name="${field.id}" data-visual="mce" id="mfn-editor" rows="8">${value}</textarea>
				</div>

			</div>
		</div>
	</div>`;

	return html;
}