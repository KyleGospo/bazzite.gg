function mfn_field_textarea(field) {
	let html = '';
	let value = '';
	let placeholder = '';
	let dynamic_data = '';
	let editor = '';
	let data_attr = [];
	let classes_input = ['mfn-form-control mfn-field-value mfn-form-textarea'];
	let classes = ['form-group'];

	if( _.has(field, 'preview') ){
		classes_input.push( field.preview );
	}

	if( _.has(field, 'input_class') ){
		classes_input.push(field.input_class);
	}

	if( _.has(field, 'editor') ){
		editor = field.editor;
		data_attr.push('data-editor="'+field.editor+'"'); // builder: basic (bold, i, etc), full (media, shortcodes) | HTML
	}

	if( _.has(field, 'cm') ){
		data_attr.push('data-cm="'+field.cm+'"'); // theme options: CSS, JS
	}

	if( data_attr.length ){
		classes.push( 'html-editor' );
	}

	if( _.has(field, 'placeholder') ){
		placeholder = field.placeholder;
	}

	if( _.has(field, 'std') ){
		if( !field.std.includes('"') ){
			placeholder = field.std;
		}else{
			value = field.std;
		}
	}

	if( _.has(edited_item['attr'], field.id) && edited_item['attr'][field.id].length ){
		value = edited_item['attr'][field.id];
	}else if( (edited_item.jsclass == 'pageoption' || edited_item.jsclass == 'themeoption') && _.has(edited_item, field.id) && edited_item[field.id].length ){
		// themeoption
		value = edited_item[field.id];
	}

	if( value == 'undefined' ) value = '';


	if( !data_attr.length ){
		
		if( _.has(field, 'dynamic_data') ){
			dynamic_data = '<a class="mfn-option-btn mfn-button-dynamic-data" title="Dynamic data" href="#"><span class="mfn-icon mfn-icon-dynamic-data"></span></a>';
		}
		html += `<div class="form-control has-icon has-icon-right">${dynamic_data}<textarea class="${classes_input.join(' ')}" name="${field.id}" rows="4" placeholder="${placeholder}">${value}</textarea></div>`;

	}else{

		if( _.has(field, 'dynamic_data') && editor == 'full' ){
			dynamic_data = '<span class="mfn-option-sep"></span><a class="mfn-option-btn btn-medium mfn-option-blank mfn-button-dynamic-data" title="Dynamic data" href="#"><span class="mfn-icon mfn-icon-dynamic-data"></span></a>';
		}

		html += `<div class="${classes.join(' ')}">
			<div class="form-control">
			${ editor == 'full' ? `
				<div class="editor-header">

				<div class="mfn-content-buttons"><div class="mfn-option-dropdown dropdown-megamenu"> <a class="mfn-option-btn mfn-option-text btn-icon-right btn-medium" href="#"><span class="text">Shortcode</span><span class="mfn-icon mfn-icon-unfold"></span></a> <div class="dropdown-wrapper"> <a class="mfn-dropdown-item" title="Alert" href="#" data-type="alert"><span class="mfn-icon mfn-icon-shortcode"></span> Alert</a> <a class="mfn-dropdown-item" title="Blockquote" href="#" data-type="blockquote"><span class="mfn-icon mfn-icon-shortcode"></span> Blockquote</a> <a class="mfn-dropdown-item" title="Button" href="#" data-type="button"><span class="mfn-icon mfn-icon-shortcode"></span> Button</a> <a class="mfn-dropdown-item" title="Code" href="#" data-type="code"><span class="mfn-icon mfn-icon-shortcode"></span> Code</a> <a class="mfn-dropdown-item" title="Content_Link" href="#" data-type="content_link"><span class="mfn-icon mfn-icon-shortcode"></span> Content Link</a> <a class="mfn-dropdown-item" title="Counter_Inline" href="#" data-type="counter_inline"><span class="mfn-icon mfn-icon-shortcode"></span> Counter Inline</a> <a class="mfn-dropdown-item" title="Dropcap" href="#" data-type="dropcap"><span class="mfn-icon mfn-icon-shortcode"></span> Dropcap</a> <a class="mfn-dropdown-item" title="Divider" href="#" data-type="divider"><span class="mfn-icon mfn-icon-shortcode"></span> Divider</a> <a class="mfn-dropdown-item" title="Fancy_Link" href="#" data-type="fancy_link"><span class="mfn-icon mfn-icon-shortcode"></span> Fancy Link</a> <a class="mfn-dropdown-item" title="Google_Font" href="#" data-type="google_font"><span class="mfn-icon mfn-icon-shortcode"></span> Google Font</a> <a class="mfn-dropdown-item" title="Heading" href="#" data-type="heading"><span class="mfn-icon mfn-icon-shortcode"></span> Heading</a> <a class="mfn-dropdown-item" title="Highlight" href="#" data-type="highlight"><span class="mfn-icon mfn-icon-shortcode"></span> Highlight</a> <a class="mfn-dropdown-item" title="Hr" href="#" data-type="hr"><span class="mfn-icon mfn-icon-shortcode"></span> Hr</a> <a class="mfn-dropdown-item" title="Icon" href="#" data-type="icon"><span class="mfn-icon mfn-icon-shortcode"></span> Icon</a> <a class="mfn-dropdown-item" title="Icon_Bar" href="#" data-type="icon_bar"><span class="mfn-icon mfn-icon-shortcode"></span> Icon Bar</a> <a class="mfn-dropdown-item" title="Icon_Block" href="#" data-type="icon_block"><span class="mfn-icon mfn-icon-shortcode"></span> Icon Block</a> <a class="mfn-dropdown-item" title="Idea" href="#" data-type="idea"><span class="mfn-icon mfn-icon-shortcode"></span> Idea</a> <a class="mfn-dropdown-item" title="Image" href="#" data-type="image"><span class="mfn-icon mfn-icon-shortcode"></span> Image</a> <a class="mfn-dropdown-item" title="Popup" href="#" data-type="popup"><span class="mfn-icon mfn-icon-shortcode"></span> Popup</a> <a class="mfn-dropdown-item" title="Progress_Icons" href="#" data-type="progress_icons"><span class="mfn-icon mfn-icon-shortcode"></span> Progress Icons</a> <a class="mfn-dropdown-item" title="Share_Box" href="#" data-type="share_box"><span class="mfn-icon mfn-icon-shortcode"></span> Share Box</a> <a class="mfn-dropdown-item" title="Tooltip" href="#" data-type="tooltip"><span class="mfn-icon mfn-icon-shortcode"></span> Tooltip</a> <a class="mfn-dropdown-item" title="Tooltip_Image" href="#" data-type="tooltip_image"><span class="mfn-icon mfn-icon-shortcode"></span> Tooltip Image</a> </div> </div>
				<div class="mfn-option-dropdown"> <a class="mfn-option-btn btn-icon-right mfn-option-text btn-icon-right btn-medium" href="#"><span class="text">Format</span><span class="mfn-icon mfn-icon-unfold"></span></a> <div class="dropdown-wrapper"> <h6>Headings</h6> <a class="mfn-dropdown-item" title="h1" href="#" data-type="h1"><span class="mfn-icon mfn-icon-format-h1"></span> Heading 1</a> <a class="mfn-dropdown-item" title="h2" href="#" data-type="h2"><span class="mfn-icon mfn-icon-format-h2"></span> Heading 2</a> <a class="mfn-dropdown-item" title="h3" href="#" data-type="h3"><span class="mfn-icon mfn-icon-format-h3"></span> Heading 3</a> <a class="mfn-dropdown-item" title="h4" href="#" data-type="h4"><span class="mfn-icon mfn-icon-format-h4"></span> Heading 4</a> <a class="mfn-dropdown-item" title="h5" href="#" data-type="h5"><span class="mfn-icon mfn-icon-format-h5"></span> Heading 5</a> <a class="mfn-dropdown-item" title="h6" href="#" data-type="h6"><span class="mfn-icon mfn-icon-format-h6"></span> Heading 6</a> <div class="mfn-dropdown-divider"></div> <h6>Others</h6> <a class="mfn-dropdown-item" title="Paragraph" href="#" data-type="paragraph"><span class="mfn-icon mfn-icon-format-p"></span> Paragraph</a> <a class="mfn-dropdown-item" title="Big" href="#" data-type="big"><span class="mfn-icon mfn-icon-format-p-big"></span> Big paragraph</a> <a class="mfn-dropdown-item" title="Code" href="#" data-type="code"><span class="mfn-icon mfn-icon-format-code"></span> Code</a> </div> </div>
				</div>

				<a class="mfn-option-btn btn-medium mfn-option-blank" title="Paragraph" data-type="paragraph" href="#"><span class="mfn-icon mfn-icon-format-p"></span></a> <a class="mfn-option-btn btn-medium mfn-option-blank" title="Bold" data-type="bold" href="#"><span class="mfn-icon mfn-icon-bold"></span></a> <a class="mfn-option-btn btn-medium mfn-option-blank" title="Italic" data-type="italic" href="#"><span class="mfn-icon mfn-icon-italic"></span></a> <a class="mfn-option-btn btn-medium mfn-option-blank" title="Underline" data-type="underline" href="#"><span class="mfn-icon mfn-icon-underline"></span></a>
				
				<a class="mfn-option-btn btn-medium mfn-option-blank" title="Text color" data-type="text color" href="#">
					<span class="mfn-icon mfn-icon-textcolor"></span>
					<div class="mfn-color-tooltip-picker">

						<div class="form-group color-picker has-addons has-addons-prepend">
							
								<div class="color-picker-group">
									<div class="form-addon-prepend"><a href="#" class="color-picker-open"><span class="label"><i class="icon-bucket"></i></span></a></div>
									<div class="form-control has-icon has-icon-right">
										<input class="mfn-form-control mfn-form-input" type="text" autocomplete="off" />
										<a class="mfn-option-btn mfn-option-text color-picker-clear" href="#"><span class="text">Clear</span></a>
									</div>
									<input class="has-colorpicker" type="text" value="" autocomplete="off" style="visibility:hidden" />
								</div>
							
						</div>

					</div>
				</a>

				<span class="mfn-option-sep"></span>

				<a class="mfn-option-btn btn-medium mfn-option-blank" title="List ordered" href="#" data-type="list ordered"><span class="mfn-icon mfn-icon-listordered"></span></a>
		        <a class="mfn-option-btn btn-medium mfn-option-blank" title="List unordered" href="#" data-type="list unordered"><span class="mfn-icon mfn-icon-listunordered"></span></a>

		        <span class="mfn-option-sep"></span>

		        <a class="mfn-option-btn btn-medium mfn-option-blank" title="Link" data-type="link" href="#"><span class="mfn-icon mfn-icon-link"></span></a>
		        <a class="mfn-option-btn btn-medium mfn-option-blank" title="Break" data-type="break" href="#"><span class="mfn-icon mfn-icon-break"></span></a>

		       	<a class="mfn-option-btn btn-medium mfn-option-blank mfn-table-creator-btn" title="Table" data-type="table" href="#"><span class="mfn-icon mfn-icon-table"></span> <div class="mfn-table-creator"></div></a><a class="mfn-option-btn btn-medium mfn-option-blank" title="Divider" data-type="divider" href="#"><span class="mfn-icon mfn-icon-divider"></span></a><a class="mfn-option-btn btn-medium mfn-option-blank mfn-lorem-creator-btn" title="Lorem" data-type="lorem" href="#"><span class="mfn-icon mfn-icon-lorem"></span></a>

		        <span class="mfn-option-sep"></span>

		        <a class="mfn-option-btn btn-medium mfn-option-blank" title="Undo" data-type="undo" href="#"><span class="mfn-icon mfn-icon-undo"></span></a>
		       	<a class="mfn-option-btn btn-medium mfn-option-blank" title="Redo" data-type="redo" href="#"><span class="mfn-icon mfn-icon-redo"></span></a>

		       	${dynamic_data}

				</div>
				` : '' }
				<div class="editor-content">
					${ editor == 'full' ? `<div class="mfn-tooltip-sc-editor">
						<a class="mfn-option-btn mfn-option-blank" data-type="edit" title="Edit" href="#"><span class="mfn-icon mfn-icon-edit-light"></span></a>
						<a class="mfn-option-btn mfn-option-blank" data-type="remove" title="Remove" href="#"><span class="mfn-icon mfn-icon-delete-light"></span></a>
					</div>` : '' }
					<textarea class="${classes_input.join(' ')}" name="${field.id}" rows="4" placeholder="${placeholder}" ${data_attr.join(' ')}>${value}</textarea>
				</div>
			</div>
		</div>`;
	}

	return html;
}