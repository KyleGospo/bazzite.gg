function mfn_field_ace(field = false) {

	let html = `<div class="mfn-ace-editor-wrapper"><pre id="editor"></pre></div>`;

	setTimeout(function() {initAceEditor(field);}, 50);

	return html;
}

function initAceEditor(field = false) {
	ace.require("ace/ext/language_tools");
    var editor = ace.edit("editor");
    editor.session.setMode("ace/mode/html");

    if( jQuery('#mfn-visualbuilder').hasClass('mfn-ui-dark') ){
    	editor.setTheme("ace/theme/tomorrow_night");
    }else{
    	editor.setTheme("ace/theme/tomorrow");
    }

    editor.setOptions({
		minLines: 20,
		maxLines: Infinity,
		showGutter: true,
		useWorker: true,
		wrap: true,
		enableBasicAutocompletion: true,
		enableLiveAutocompletion: true
    });

    if( _.has(edited_item['attr'], field.id) && edited_item['attr'][field.id].length ){
   		editor.setValue( edited_item['attr'][field.id] );
   	}

    editor.session.on('change', function(delta) {
		var val = editor.getValue();

		if( !val ){

			$content.find('.mcb-item-'+edited_item.uid+' .mfn-html-editor-wrapper').html('<div class="mfn-widget-placeholder"><img class="item-preview-image" src="'+mfnvbvars.themepath+'/visual-builder/assets/_dark/svg/items/code.svg" alt=""></div>');
		
		}else{

			let ready_html = val
				.replaceAll('<!DOCTYPE html>', '')
				.replaceAll('<html', '<div')
				.replaceAll('<head>', '')
				.replaceAll('</head>', '')
				.replaceAll('<body', '<div')
				.replaceAll('</body>', '</div>')
				.replaceAll('</html>', '</div>');

			$content.find('.mcb-item-'+edited_item.uid+' .mfn-html-editor-wrapper').html(ready_html);

		}

		if( !_.has(edited_item, 'attr') ) edited_item.attr = {};
	    edited_item.attr[field.id] = val;
	});
}