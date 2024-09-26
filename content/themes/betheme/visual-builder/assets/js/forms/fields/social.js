function mfn_field_social(field) {
	let items = [];

	let socials = {
		'skype': {
			'title': 'Skype',
			'desc': 'Skype login. You can use callto: or skype: prefix',
			'icon': 'icon-skype',
		},
		'whatsapp': {
			'title': 'WhatsApp',
			'desc': 'WhatsApp URL. You can use whatsapp: prefix',
			'icon': 'icon-whatsapp',
		},
		'facebook': {
			'title': 'Facebook',
			'icon': 'icon-facebook',
		},
		'twitter': {
			'title': 'Twitter',
			'icon': 'icon-twitter',
		},
		'vimeo': {
			'title': 'Vimeo',
			'icon': 'icon-vimeo',
		},
		'youtube': {
			'title': 'YouTube',
			'icon': 'icon-play',
		},
		'flickr': {
			'title': 'Flickr',
			'icon': 'icon-flickr',
		},
		'linkedin': {
			'title': 'LinkedIn',
			'icon': 'icon-linkedin',
		},
		'pinterest': {
			'title': 'Pinterest',
			'icon': 'icon-pinterest',
		},
		'dribbble': {
			'title': 'Dribbble',
			'icon': 'icon-dribbble',
		},
		'instagram': {
			'title': 'Instagram',
			'icon': 'icon-instagram',
		},
		'snapchat': {
			'title': 'Snapchat',
			'icon': 'icon-snapchat',
		},
		'behance': {
			'title': 'Behance',
			'icon': 'icon-behance',
		},
		'tumblr': {
			'title': 'Tumblr',
			'icon': 'icon-tumblr',
		},
		'tripadvisor': {
			'title': 'Tripadvisor',
			'icon': 'icon-tripadvisor',
		},
		'vkontakte': {
			'title': 'VKontakte',
			'icon': 'icon-vkontakte',
		},
		'viadeo': {
			'title': 'Viadeo',
			'icon': 'icon-viadeo',
		},
		'xing': {
			'title': 'Xing',
			'icon': 'icon-xing',
		},
		'custom': true,
		'rss': true,
    };


    if( _.has(edited_item, field.id) && _.has(edited_item[field.id], 'order') && edited_item[field.id]['order'].length ){
		items = edited_item[field.id]['order'].split(',');
	}


	let html = `<div class="form-group social-icons">
		<ul class="social-wrapper">
			${ _.map( items, function(item) {
				let html = '';

				if( item.includes('custom') ){
					html = ``;
				}else if( item == 'rss' ){
					html = `<li data-key="rss">
						<div class="drag"><i class="icon-arrow-combo"></i></div>
						<div class="label"><i class="icon-rss"></i> RSS</div>
						<div class="form-control">
							<span>Show the RSS icon if enabled <a href="admin.php?page=be-options#social&rss">below</a><span>
						</div>
					</li>`;
				}else if( item != 'order'){

					let social = socials[item];

					let value = '';
					if( _.has(edited_item, field.id) && _.has(edited_item[field.id], item) && edited_item[field.id][item] != '' ){
						value = edited_item[field.id][item];
					}


					html = `<li data-key="${item}">
						<div class="drag"><i class="icon-arrow-combo"></i></div>
						<div class="label"><i class="${social.icon}"></i> ${social.title}</div>
						<div class="form-control">
							<input class="mfn-form-control mfn-form-input" type="text" name="${field.id}" data-key="${item}" value="${value}"/>
						</div>
					</li>`;
				}

				return html;
			}).join('') }
		</ul>
		<input type="hidden" class="social-order" data-key="order" name="${field.id}" value="${edited_item[field.id]['order']}" />
	</div>`;
	return html;
}