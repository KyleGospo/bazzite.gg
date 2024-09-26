class MfnForm {

	constructor(fields, formrow = true) {
		this.fields = fields;
		this.formrow = formrow;
		this.html = '';
		this.i = 0;
	}

	responsive(active) {

 		return `<ul class="responsive-switcher">
 			<li class="${ active == 'desktop' ? 'active' : '' }" data-device="desktop" data-tooltip="Desktop">
 				<span data-device="desktop" class="mfn-icon mfn-icon-desktop"></span>
 			</li>
 			<li class="${ active == 'laptop' ? 'active' : '' }" data-device="laptop" data-tooltip="Laptop">
 				<span data-device="laptop" class="mfn-icon mfn-icon-laptop"></span>
 			</li>
 			<li class="${ active == 'tablet' ? 'active' : '' }" data-device="tablet" data-tooltip="Tablet">
 				<span data-device="tablet" class="mfn-icon mfn-icon-tablet"></span>
 			</li>
 			<li class="${ active == 'mobile' ? 'active' : '' }" data-device="mobile" data-tooltip="Mobile">
 				<span data-device="mobile" class="mfn-icon mfn-icon-mobile"></span>
 			</li>
 		</ul>`;

	}

	render() {

		_.map(this.fields, (field) => {

			let field_name = _.has(field, 'type') ? 'mfn_field_'+field.type : 'mfn_field_header';
			let classes = ['mfn-form-row', 'mfn-vb-formrow'];
			let label_classes = ['form-label'];
			let isModified = false;

			// responsive
			if( _.has(field, 'responsive') ){
				classes.push(`mfn_field_${field.responsive}`);
				//label += `${this.responsive(field.responsive)}`;
			}

			if( _.has(field, 'themeoptions') ){
				let to_split = field.themeoptions.split(':');
				if( to_split.length > 0 ){
					if( ( !_.isEmpty(mfnDbLists.themeoptions[to_split[0]]) && mfnDbLists.themeoptions[to_split[0]] != to_split[1]) || ( _.isEmpty(mfnDbLists.themeoptions[to_split[0]]) && !_.isEmpty(to_split[1]) ) ){
						return;
					}else{
						if( !_.isEmpty(mfnDbLists.themeoptions['style']) ){
							classes.push('theme-simple-style');
						}else{
							classes.push('theme-classic-style');
						}
					}
				}
			}

			// classes
			if( _.has(field, 'class') ){

				if( field_name != 'mfn_field_header' && field.class.includes('mfn-deprecated') && ( !_.has(edited_item['attr'], field.id) || ( _.has(field, 'std') && edited_item['attr'][field.id] == field.std ) ) ){
					return;
				}

				classes.push(field.class);
			}

			if( _.has(edited_item, 'jsclass') ){
				let element_type = edited_item.jsclass;
				if( element_type == 'button' || element_type == 'chart' || element_type == 'code' || element_type == 'sliderbar' ){
					element_type = 'widget-'+element_type;
				}
				classes.push(element_type)
			}

			if( _.has(edited_item, 'uid') && edited_item.uid == 'pageoptions' ){
				classes.push('option');
			}

			// slider input for dimensional inputs
			if( _.has(field, 'type') && field.type == 'dimensions' ){
				classes.push('mfn-slider-input');
			}

			if( field_name == 'mfn_field_html' ){

				// no form-row field
				this.html += window[field_name](field);

			}else if( field_name == 'mfn_field_info' ){

				// no form-row field
				this.html += `<div class="${classes.join(' ')}">${window[field_name](field)}</div>`;

			}else{

				let id = _.has(field, 'attr_id') ? `id="${field.attr_id}"` : '';
				let data_attr = [];
				let label = _.has(field, 'title') ? field.title : '';

				// responsive
				if( _.has(field, 'responsive') ){
					label += `${this.responsive(field.responsive)}`;
				}

				// label after
				if( _.has(field, 'label_after') ){
					label += field.label_after;
				}

				// desc switcher
				if( _.has(field, 'desc') ){
					label_classes.push('form-label-wrapper');
					label += '<a class="mfn-option-btn mfn-option-blank mfn-fr-help-icon" target="_blank" data-tooltip="Toggle description" href="#"><span class="mfn-icon mfn-icon-desc"></span></a>';
				}

				// conditions 
				if( _.has(field, 'condition') ){
					classes.push(`activeif activeif-${field.condition.id}`);
					data_attr.push(`data-conditionid="${field.condition.id}"`);
					data_attr.push(`data-opt="${field.condition.opt}"`);
					data_attr.push(`data-val="${field.condition.val}"`);
				}

				if( _.has(field, 'dynamic_data') ){
					classes.push('is_dynamic_data');
					data_attr.push(`data-dynamic="${field.dynamic_data}"`);
				}

				// edit text
				if( _.has(field, 'edit_tag') ){
					classes.push(`content-txt-edit`);
					data_attr.push(`data-edittag="${field['edit_tag']}"`);

					if( _.has(field, 'edit_tagchild') ){
						data_attr.push(`data-edittagchild="${field['edit_tagchild']}"`);
					}
					if( _.has(field, 'edit_position') ){
						data_attr.push(`data-tagposition="${field['edit_position']}"`);
					}
					if( _.has(field, 'edit_tag_var') ){
						data_attr.push(`data-edittagvar="${field['edit_tag_var']}"`);
					}
				}

				if( _.has(field, 'id') ) {
					data_attr.push(`data-id="${field.id}"`);
					if( !field.id.includes('style:') ) {
						classes.push(field.id);
						data_attr.push(`data-name="${field.id}"`);
						field['input_class'] = 'preview-'+field.id+'input';
					}
				}

				// style
				if( _.has(field, 'id') && field.id.includes('style:') ) {
					let style_tag = field.id.split(':');
					let style_name = style_tag[2].replace('_mobile', '').replace('_tablet', '');
					if( _.has(field, 'key') ){
						data_attr.push(`data-name="${field.key}"`);
					}else{
						data_attr.push(`data-name="${style_name.replace('gradient', 'background-image')}"`);
					}
					data_attr.push(`data-csspath="${style_tag[1].replaceAll('mfnuidelement', edited_item.uid).replaceAll('postid', mfnvbvars.pageid)}"`);
					classes.push('inline-style-input');
					classes.push( style_name );
					field['input_class'] = 'preview-'+style_name+'input';
				}

				if( _.has(field, 'key') ) {
					classes.push(field.key);
				}

				if( _.has(field, 'data_attr') ) {
					data_attr.push(field['data_attr']);
				}

				if( _.has(field, 're_render') ){
					classes.push('re_render');
				}

				if( _.has(field, 're_render_if') ){
					let explode_rrf = field['re_render_if'].split('|');
					if( explode_rrf.length == 2 ){
						data_attr.push(`data-retype="${explode_rrf[0]}"`);
						data_attr.push(`data-reelement="${explode_rrf[1]}"`);
					}
					classes.push('re_render_if')
				}

				//console.log(field_name);

				if( this.formrow ) this.html += `<div ${id} class="${classes.join(' ')}" ${data_attr.join(' ')}>`;

				this.html += `
					${ field_name != 'mfn_field_info' && field_name != 'mfn_field_header' && field_name != 'mfn_field_subheader' && field_name != 'mfn_field_helper' ? `<label class="${label_classes.join(' ')}">${label}</label>` : '' }
					${ _.has(field, 'desc') ? `<div class="desc-group"><span class="description">${field.desc}</span></div>` : '' }
					${ _.has(window, field_name) ? window[field_name](field) : '* '+field_name }
				`;

				if( this.formrow ) this.html += `</div>`;
	
			}

		});

		return this.html;

	}


}