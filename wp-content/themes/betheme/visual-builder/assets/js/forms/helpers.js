const deprecated_fields = {
    item: ['style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-header-menu > li.current-menu-item.mfn-menu-li > a.mfn-menu-link:color','style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-header-menu > li.current-menu-item.mfn-menu-li > a.mfn-menu-link:background-color'],
    wrap: [],
    section: []
};

const replaced_values = {
    item: [
        {key: 'visibility', old: 'hide-desktop', new: 'hide-desktop hide-laptop'}
    ],
    wrap: [
        {key: 'visibility', old: 'hide-desktop', new: 'hide-desktop hide-laptop'}
    ],
    section: [
        {key: 'visibility', old: 'hide-desktop', new: 'hide-desktop hide-laptop'}
    ],
};

const sizes = [
    {index: 1, key: '1/6', desktop: 'one-sixth', laptop: 'laptop-one-sixth', tablet: 'tablet-one-sixth', mobile: 'mobile-one-sixth', percent: '16.666%'},
    {index: 2, key: '1/5', desktop: 'one-fifth', laptop: 'laptop-one-fifth', tablet: 'tablet-one-fifth', mobile: 'mobile-one-fifth', percent: '20%'},
    {index: 3, key: '1/4', desktop: 'one-fourth', laptop: 'laptop-one-fourth', tablet: 'tablet-one-fourth', mobile: 'mobile-one-fourth', percent: '25%'},
    {index: 4, key: '1/3', desktop: 'one-third', laptop: 'laptop-one-third', tablet: 'tablet-one-third', mobile: 'mobile-one-third', percent: '33.333%'},
    {index: 5, key: '2/5', desktop: 'two-fifth', laptop: 'laptop-two-fifth', tablet: 'tablet-two-fifth', mobile: 'mobile-two-fifth', percent: '40%'},
    {index: 6, key: '1/2', desktop: 'one-second', laptop: 'laptop-one-second', tablet: 'tablet-one-second', mobile: 'mobile-one-second', percent: '50%'},
    {index: 7, key: '3/5', desktop: 'three-fifth', laptop: 'laptop-three-fifth', tablet: 'tablet-three-fifth', mobile: 'mobile-three-fifth', percent: '60%'},
    {index: 8, key: '2/3', desktop: 'two-third', laptop: 'laptop-two-third', tablet: 'tablet-two-third', mobile: 'mobile-two-third', percent: '66%'},
    {index: 9, key: '3/4', desktop: 'three-fourth', laptop: 'laptop-three-fourth', tablet: 'tablet-three-fourth', mobile: 'mobile-three-fourth', percent: '75%'},
    {index: 10, key: '4/5', desktop: 'four-fifth', laptop: 'laptop-four-fifth', tablet: 'tablet-four-fifth', mobile: 'mobile-four-fifth', percent: '80%'},
    {index: 11, key: '5/6', desktop: 'five-sixth', laptop: 'laptop-five-sixth', tablet: 'tablet-five-sixth', mobile: 'mobile-five-sixth', percent: '83.333%'},
    {index: 12, key: '1/1', desktop: 'one', laptop: 'laptop-one', tablet: 'tablet-one', mobile: 'mobile-one', percent: '100%'}
];


const aliases = {
    'shop_cat_desc': [
        { key: 'content', val: '{content}' }
    ],
    'shop_cat_top_desc': [
        { key: 'content', val: '{termmeta:mfn_product_cat_top_content}' }
    ],
    'shop_cat_bottom_desc': [
        { key: 'content', val: '{termmeta:mfn_product_cat_bottom_content}' }
    ],
    'post_excerpt': [
        { key: 'content', val: '{excerpt}' }
    ],
    'archive_read_more': [
        { key: 'link', val: '{permalink}' },
        { key: 'title', val: 'Read more' }
    ],
    'archive_blog_categories': [
        { key: 'category', val: 'category' }
    ],
    'archive_portfolio_categories': [
        { key: 'category', val: 'portfolio-types' }
    ],
    'archive_heading': [
        { key: 'title', val: '{title}' }
    ],
    'archive_content': [
        { key: 'content', val: '{content}' }
    ],
    'archive_image': [
        { key: 'src', val: '{featured_image}' }
    ],
    'post_heading': [
        { key: 'title', val: '{title}' }
    ],
    'post_image': [
        { key: 'src', val: '{featured_image}' }
    ],
    'post_love': [
        { key: 'title', val: '{postmeta:mfn-post-love}' },
        { key: 'icon_position', val: 'left' },
        { key: 'link', val: '#' },
        { key: 'icon', val: 'icon-heart-empty-fa' },
        { key: 'content', val: '' },
        { key: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .icon-wrapper:width', val: '30px' },
        { key: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .icon-wrapper i:font-size', val: '25px' },
        { key: 'title_tag', val: 'p' }
    ],
    'post_author': [
        { key: 'title', val: '{author}' },
        { key: 'icon_position', val: 'left' },
        { key: 'link', val: '{permalink:author}' },
        { key: 'content', val: '' },
        { key: 'image', val: '{featured_image:author}' },
        { key: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .icon-wrapper:width', val: '48px' },
        { key: 'title_tag', val: 'p' }
    ],
    'post_date': [
        { key: 'title', val: '{date}' },
        { key: 'header_tag', val: 'p' }
    ],
    'post_blog_related': [
        { key: 'related', val: '1' }
    ],
    'post_portfolio_related': [
        { key: 'related', val: '1' }
    ],
    'post_blog_categories': [
        { key: 'reference', val: 'post' }
    ],
    'post_portfolio_categories': [
        { key: 'reference', val: 'post' },
        { key: 'category', val: 'portfolio-types' }
    ],
    'post_blog_tags': [
        { key: 'reference', val: 'post' },
        { key: 'category', val: 'post_tag' },
    ]
}

var dynamic_data = {
    'labels' : {
        'category': 'Post category',
        'post_tag': 'Post tag',
        'portfolio_types': 'Portfolio category',
        'offer_types': 'Offer category',
        'testimonial_types': 'Testimonial category',
        'product_cat': 'Product category',
    },
    'dynamic' : {
        'posts': {
            'title': [{ key: 'title', label: 'Title' }],
            'permalink': [{key: 'permalink', label: 'Link'}],
            'featured_image': [{key: 'featured_image', label: 'Image'}],
            'content': [{key: 'title', label: 'Title'}, /*{key: 'author', label: 'Author'},*/ {key: 'date', label: 'Date'}, {key: 'date:modified', label: 'Modified Date'}, {key: 'permalink', label: 'Link'}, {key: 'featured_image', label: 'Image'}, {key: 'featured_image:tag', label: 'Image tag'}],
            'heading': {
                'title': [{key: 'content', label: 'Content'}, {key: 'excerpt', label: 'Excerpt'}, /*{key: 'author', label: 'Author'},*/ {key: 'date', label: 'Date'}, {key: 'date:modified', label: 'Modified Date'}]
            },
            'fancy_heading': {
                'title': [{key: 'content', label: 'Content'}, {key: 'excerpt', label: 'Excerpt'}, /*{key: 'author', label: 'Author'},*/ {key: 'date', label: 'Date'}, {key: 'date:modified', label: 'Modified Date'}]
            },
            'icon_box_2': {
                'title': [{key: 'content', label: 'Content'}, {key: 'excerpt', label: 'Excerpt'}, /*{key: 'author', label: 'Author'},*/ {key: 'date', label: 'Date'}, {key: 'date:modified', label: 'Modified Date'}]
            },
            'product': {
                'title': [{key: 'category', label: 'Main category'}, {key: 'categories', label: 'Categories'}, { key: 'price', label: 'Price' }, { key: 'title:add_to_cart', label: 'Add to cart' }],
                'permalink': [{ key: 'permalink:add_to_cart', label: 'Add to cart' }],
                'content': [{key: 'content', label: 'Content'}, {key: 'excerpt', label: 'Excerpt'}, {key: 'categories', label: 'Categories'}, {key: 'category', label: 'Main category'}, { key: 'price', label: 'Price' }]
            },
            'page': {
                'content': [{key: 'content', label: 'Content'}, {key: 'excerpt', label: 'Excerpt'}]
            },
            'post': {
                'content': [{key: 'content', label: 'Content'}, {key: 'excerpt', label: 'Excerpt'}, {key: 'categories', label: 'Categories'}, {key: 'category', label: 'Main category'}],
                'title': [{key: 'categories', label: 'Categories'}, {key: 'category', label: 'Main category'}]
            },
            'testimonial': {
                'title': [{ key: 'postmeta:mfn-post-link', label: 'Meta Link' }, { key: 'postmeta:mfn-post-author', label: 'Meta Author' }, { key: 'postmeta:mfn-post-company', label: 'Meta Company' }, {key: 'categories', label: 'Categories'}, {key: 'category', label: 'Main category'}],
                'permalink': [{ key: 'postmeta:mfn-post-link', label: 'Meta Link' }],
                'content': [{key: 'content', label: 'Content'}, { key: 'postmeta:mfn-post-link', label: 'Meta Link' }, { key: 'postmeta:mfn-post-author', label: 'Meta Author' }, { key: 'postmeta:mfn-post-company', label: 'Meta Company' }, {key: 'categories', label: 'Categories'}, {key: 'category', label: 'Main category'}]
            },
            'slide': {
                'content': [{ key: 'postmeta:mfn-post-desc', label: 'Meta Description' }, {key: 'categories', label: 'Categories'}, {key: 'category', label: 'Main category'}],
                'permalink': [{ key: 'postmeta:mfn-post-link', label: 'Meta Link' }],
                'title': [{key: 'categories', label: 'Categories'}, { key: 'postmeta:mfn-post-desc', label: 'Meta Desc' }, {key: 'category', label: 'Main category'}]
            },
            'offer': {
                'title': [{ key: 'postmeta:mfn-post-link_title', label: 'Meta button text' }, {key: 'categories', label: 'Categories'}, {key: 'category', label: 'Main category'}],
                'permalink': [{ key: 'postmeta:mfn-post-link', label: 'Meta button link' }],
                'featured_image': [{ key: 'postmeta:mfn-post-thumbnail', label: 'Meta thumbnail' }],
                'content': [{key: 'content', label: 'Content'}, {key: 'excerpt', label: 'Excerpt'}, {key: 'categories', label: 'Categories'}, {key: 'category', label: 'Main category'}]
            },
            'portfolio': {
                'title': [{ key: 'postmeta:mfn-post-client', label: 'Meta client' }, { key: 'postmeta:mfn-post-task', label: 'Meta task' }, {key: 'categories', label: 'Categories'}, {key: 'category', label: 'Main category'}],
                'content': [{key: 'content', label: 'Content'}, {key: 'excerpt', label: 'Excerpt'}, { key: 'postmeta:mfn-post-client', label: 'Meta client' }, { key: 'postmeta:mfn-post-task', label: 'Meta task' }, {key: 'categories', label: 'Categories'}, {key: 'category', label: 'Main category'}],
                'permalink': [{ key: 'postmeta:mfn-post-link', label: 'Meta website' }]
            }
        },
        'terms': {
            'title': [{ key: 'title', label: 'Title' }],
            'permalink': [{key: 'permalink', label: 'Link'}],
            'featured_image': [{key: 'featured_image', label: 'Image'}],
            'content': [{key: 'content', label: 'Content'}],
            'category': {
                'content': [{ key: 'termmeta:mfn_product_cat_top_content', label: 'Top content' }, { key: 'termmeta:mfn_product_cat_bottom_content', label: 'Bottom content' }],
            }
        }
    },
    'global' : {
        'title': [{ key: 'title:site', label: 'Site title' }],
        'permalink': [{ key: 'permalink:site', label: 'Site link' }],
        'featured_image': [{ key: 'featured_image:site', label: 'Site Logo' }],
        'content': [{ key: 'title:site', label: 'Site title' }],
    },
    'user' : {
        'title': [{ key: 'user', label: 'Name' }, { key: 'user:first_name', label: 'User first name' }, { key: 'user:last_name', label: 'Last name' }],
        'permalink': [{ key: 'permalink:user', label: 'User archive' }],
        'featured_image': [{ key: 'featured_image:user', label: 'User Avatar' }],
        'content': [{ key: 'user', label: 'Name' }, { key: 'user:first_name', label: 'User first name' }, { key: 'user:last_name', label: 'Last name' }],
    },
    'author' : {
        'title': [{ key: 'author', label: 'Display name' }, { key: 'author:first_name', label: 'Author first name' }, { key: 'author:last_name', label: 'Last name' }],
        'permalink': [{ key: 'permalink:author', label: 'Author archive' }],
        'featured_image': [{ key: 'featured_image:author', label: 'Author Avatar' }],
        'content': [{ key: 'author', label: 'Name' }, { key: 'author:first_name', label: 'Author first name' }, { key: 'author:last_name', label: 'Last name' }, { key: 'author:description', label: 'Bio' }],
    }
};

var presets_keys = {
    'icon_box_2': ['title_tag', 'icon_position', 'icon_position_tablet', 'icon_position_laptop', 'icon_position_mobile', 'icon_align', 'icon_align_tablet', 'icon_align_laptop', 'icon_align_mobile', 'hover'],
    'section': ['width_switcher', 'height_switcher'],
    'wrap': ['width_switcher', 'height_switcher'],
};

var units = ['px', '%', 'em', 'rem', 'vw', 'vh'];

var items_size = {
    'wrap': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],

    'accordion': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'article_box': ['1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'before_after': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'blockquote': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'blog': ['1/1'],
    'blog_news': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'blog_slider': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'blog_teaser': ['1/1'],
    'button': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'call_to_action': ['1/1'],
    'chart': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'clients': ['1/1'],
    'clients_slider': ['1/1'],
    'code': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'column': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'contact_box': ['1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'content': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'countdown': ['1/1'],
    'counter': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'divider': ['1/1'],
    'fancy_divider': ['1/1'],
    'fancy_heading': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'feature_box': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'feature_list': ['1/1'],
    'faq': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'flat_box': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'helper': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'hover_box': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'hover_color': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'how_it_works': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'icon_box': ['1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'image': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'image_gallery': ['1/1'],
    'info_box': ['1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'list': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'map_basic': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'map': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'offer': ['1/1'],
    'offer_thumb': ['1/1'],
    'opening_hours': ['1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'our_team': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'our_team_list': ['1/1'],
    'photo_box': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'placeholder': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'portfolio': ['1/1'],
    'portfolio_grid': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'portfolio_photo': ['1/1'],
    'portfolio_slider': ['1/1'],
    'pricing_item': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'progress_bars': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'promo_box': ['1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'quick_fact': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'shop': ['1/1'],
    'shop_slider': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'sidebar_widget': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'slider': ['1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'slider_plugin': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'sliding_box': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'story_box': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'tabs': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'testimonials': ['1/1'],
    'testimonials_list': ['1/1'],
    'trailer_box': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'timeline': ['1/1'],
    'video': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'visual': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'zoom_box': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'shop_categories': ['1/1'],
    'shop_products': ['1/1'],
    'shop_title': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'product_title': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'product_images': ['1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'product_price': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'product_cart_button': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'product_reviews': ['1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'product_rating': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'product_stock': ['1/6', '1/5', '1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'product_meta': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'product_short_description': ['1/4', '1/3', '2/5', '1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'product_content': ['1/1'],
    'product_additional_information': ['1/2', '3/5', '2/3', '3/4', '4/5', '5/6', '1/1'],
    'product_related': ['1/1'],
    'product_upsells': ['1/1'],
};

const rewrited_fields = {
    item: {
        'product_images': [ // added 20.05.2023
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .flex-viewport:border-style',           new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-product-has-gallery .flex-viewport, .mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-product-hasnt-gallery .woocommerce-product-gallery__image:border-style'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .flex-viewport:border-color',           new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-product-has-gallery .flex-viewport, .mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-product-hasnt-gallery .woocommerce-product-gallery__image:border-color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .flex-viewport:border-width',           new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-product-has-gallery .flex-viewport, .mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-product-hasnt-gallery .woocommerce-product-gallery__image:border-width'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .flex-viewport:border-width_tablet',    new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-product-has-gallery .flex-viewport, .mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-product-hasnt-gallery .woocommerce-product-gallery__image:border-width_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .flex-viewport:border-width_mobile',    new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-product-has-gallery .flex-viewport, .mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-product-hasnt-gallery .woocommerce-product-gallery__image:border-width_mobile'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .flex-viewport:border-radius',          new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-product-has-gallery .flex-viewport, .mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-product-hasnt-gallery .woocommerce-product-gallery__image:border-radius'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .flex-viewport:border-radius_tablet',   new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-product-has-gallery .flex-viewport, .mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-product-hasnt-gallery .woocommerce-product-gallery__image:border-radius_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .flex-viewport:border-radius_mobile',   new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-product-has-gallery .flex-viewport, .mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-product-hasnt-gallery .woocommerce-product-gallery__image:border-radius_mobile'},
        ],
        'accordion': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .accordion h4.title:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .accordion .heading:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .accordion h4.title:margin', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .accordion .heading:margin'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .accordion h4.title:margin_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .accordion .heading:margin_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .accordion h4.title:margin_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .accordion .heading:margin_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .accordion h4.title:margin_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .accordion .heading:margin_mobile'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .accordion h4.title:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .accordion .heading:typography'},
        ],
        'article_box': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper h4:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper h4:margin', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper .title:margin'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper h4:margin_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper .title:margin_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper h4:margin_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper .title:margin_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper h4:margin_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper .title:margin_mobile'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper h4:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper .title:typography'},
        ],
        'blog_slider': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .blog_slider_header h4.title:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .blog_slider_header .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .blog_slider_header h4.title:margin', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .blog_slider_header .title:margin'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .blog_slider_header h4.title:margin_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .blog_slider_header .title:margin_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .blog_slider_header h4.title:margin_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .blog_slider_header .title:margin_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .blog_slider_header h4.title:margin_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .blog_slider_header .title:margin_mobile'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .blog_slider_header h4.title:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .blog_slider_header .title:typography'},
        ],
        'call_to_action': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .call_to_action .call_left h3:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .call_to_action .call_left .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .call_to_action .call_left h3:text-align', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .call_to_action .call_left .title:text-align'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .call_to_action .call_left h3:text-align_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .call_to_action .call_left .title:text-align_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .call_to_action .call_left h3:text-align_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .call_to_action .call_left .title:text-align_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .call_to_action .call_left h3:text-align_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .call_to_action .call_left .title:text-align_mobile'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .call_to_action .call_left h3:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .call_to_action .call_left .title:typography'},
        ],
        'contact_box': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .get_in_touch h3:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .get_in_touch .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .get_in_touch h3:margin', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .get_in_touch .title:margin'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .get_in_touch h3:margin_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .get_in_touch .title:margin_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .get_in_touch h3:margin_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .get_in_touch .title:margin_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .get_in_touch h3:margin_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .get_in_touch .title:margin_mobile'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .get_in_touch h3:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .get_in_touch .title:typography'},
        ],
        'faq': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .faq h4.title:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .faq .heading:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .faq h4.title:margin', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .faq .heading:margin'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .faq h4.title:margin_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .faq .heading:margin_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .faq h4.title:margin_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .faq .heading:margin_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .faq h4.title:margin_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .faq .heading:margin_mobile'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .faq h4.title:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .faq .heading:typography'},
        ],
        'feature_box': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper h4:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper h4:margin', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper .title:margin'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper h4:margin_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper .title:margin_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper h4:margin_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper .title:margin_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper h4:margin_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper .title:margin_mobile'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper h4:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper .title:typography'},
        ],
        'flat_box': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper h4:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper h4:margin', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper .title:margin'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper h4:margin_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper .title:margin_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper h4:margin_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper .title:margin_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper h4:margin_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper .title:margin_mobile'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper h4:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .desc_wrapper .title:typography'},
        ],
        'info_box': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .infobox h3:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .infobox .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .infobox h3:margin', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .infobox .title:margin'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .infobox h3:margin_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .infobox .title:margin_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .infobox h3:margin_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .infobox .title:margin_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .infobox h3:margin_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .infobox .title:margin_mobile'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .infobox h3:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .infobox .title:typography'},
        ],
        'list': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .list_right h4.title:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .list_right .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .list_right h4.title:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .list_right .title:typography'},
        ],
        'opening_hours': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .opening_hours h3:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .opening_hours .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .opening_hours h3:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .opening_hours .title:typography'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .opening_hours h3:margin', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .opening_hours .title:margin'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .opening_hours h3:margin_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .opening_hours .title:margin_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .opening_hours h3:margin_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .opening_hours .title:margin_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .opening_hours h3:margin_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .opening_hours .title:margin_mobile'},
        ],
        'trailer_box': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .trailer_box .desc h2:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .trailer_box .desc .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .trailer_box .desc h2:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .trailer_box .desc .title:typography'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .trailer_box .desc h2:margin', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .trailer_box .desc .title:margin'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .trailer_box .desc h2:margin_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .trailer_box .desc .title:margin_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .trailer_box .desc h2:margin_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .trailer_box .desc .title:margin_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .trailer_box .desc h2:margin_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .trailer_box .desc .title:margin_mobile'},
        ],
        'testimonials_list': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .testimonials_list .item .desc h4,.mcb-section .mcb-wrap .mcb-item-mfnuidelement .testimonials_list .item .desc h4 a:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .testimonials_list .item .desc .title,.mcb-section .mcb-wrap .mcb-item-mfnuidelement .testimonials_list .item .desc .title a:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .testimonials_list .item .desc h4:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .testimonials_list .item .desc .title:typography'},
        ],
        'testimonials': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .testimonials_slider .testimonials_slider_ul li .author h5 a,.mcb-section .mcb-wrap .mcb-item-mfnuidelement .testimonials_slider .testimonials_slider_ul li .author h5:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .testimonials_slider .testimonials_slider_ul li .author .title a,.mcb-section .mcb-wrap .mcb-item-mfnuidelement .testimonials_slider .testimonials_slider_ul li .author .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .testimonials_slider .testimonials_slider_ul li .author h5:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .testimonials_slider .testimonials_slider_ul li .author .title:typography'},
        ],
        'tabs': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement h4.title:text-align', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .title:text-align'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement h4.title:text-align_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .title:text-align_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement h4.title:text-align_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .title:text-align_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement h4.title:text-align_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .title:text-align_mobile'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement h4.title:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement h4.title:margin', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .title:margin'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement h4.title:margin_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .title:margin_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement h4.title:margin_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .title:margin_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement h4.title:margin_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .title:margin_mobile'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement h4.title:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .title:typography'},
        ],
        'story_box': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .story_box .desc_wrapper h3:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .story_box .desc_wrapper .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .story_box .desc_wrapper h3:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .story_box .desc_wrapper .title:typography'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .story_box .desc_wrapper h3:margin', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .story_box .desc_wrapper .title:margin'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .story_box .desc_wrapper h3:margin_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .story_box .desc_wrapper .title:margin_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .story_box .desc_wrapper h3:margin_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .story_box .desc_wrapper .title:margin_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .story_box .desc_wrapper h3:margin_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .story_box .desc_wrapper .title:margin_mobile'},
        ],
        'sliding_box': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .sliding_box .desc_wrapper h4:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .sliding_box .desc_wrapper .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .sliding_box .desc_wrapper h4:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .sliding_box .desc_wrapper .title:typography'}
        ],
        'promo_box': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .promo_box_wrapper .desc_wrapper h2:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .promo_box_wrapper .desc_wrapper .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .promo_box_wrapper .desc_wrapper h2:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .promo_box_wrapper .desc_wrapper .title:typography'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .promo_box_wrapper .desc_wrapper h2:margin', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .promo_box_wrapper .desc_wrapper .title:margin'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .promo_box_wrapper .desc_wrapper h2:margin_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .promo_box_wrapper .desc_wrapper .title:margin_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .promo_box_wrapper .desc_wrapper h2:margin_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .promo_box_wrapper .desc_wrapper .title:margin_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .promo_box_wrapper .desc_wrapper h2:margin_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .promo_box_wrapper .desc_wrapper .title:margin_mobile'},
        ],
        'progress_bars': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .progress_bars h4.title:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .progress_bars .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .progress_bars h4.title:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .progress_bars .title:typography'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .progress_bars h4.title:margin', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .progress_bars .title:margin'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .progress_bars h4.title:margin_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .progress_bars .title:margin_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .progress_bars h4.title:margin_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .progress_bars .title:margin_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .progress_bars h4.title:margin_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .progress_bars .title:margin_mobile'},
        ],
        'pricing_item': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .pricing-box .plan-header h2:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .pricing-box .plan-header .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .pricing-box .plan-header h2:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .pricing-box .plan-header .title:typography'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .pricing-box .plan-header h2:margin', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .pricing-box .plan-header .title:margin'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .pricing-box .plan-header h2:margin_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .pricing-box .plan-header .title:margin_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .pricing-box .plan-header h2:margin_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .pricing-box .plan-header .title:margin_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .pricing-box .plan-header h2:margin_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .pricing-box .plan-header .title:margin_mobile'},
        ],
        'photo_box': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .photo_box h4:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .photo_box .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .photo_box h4:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .photo_box .title:typography'},
        ],
        'our_team_list': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .team .desc_wrapper h4:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .team .desc_wrapper .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .team .desc_wrapper h4:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .team .desc_wrapper .title:typography'},
        ],
        'our_team': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .team h4.title:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .team .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .team h4.title:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .team .title:typography'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .team .desc_wrapper h4:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .team .desc_wrapper .desc_wrappper_title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .team .desc_wrapper h4:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .team .desc_wrapper .desc_wrappper_title:typography'},
        ],
        'product_additional_information': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement h3:text-align', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .title:text-align'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement h3:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .title:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement h3:margin', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .title:margin'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement h3:margin_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .title:margin_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement h3:margin_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .title:margin_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement h3:margin_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .title:margin_mobile'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement h3:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .title:typography'},
        ],
        'header_burger': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-menu-li > .mfn-menu-link .label-wrapper|before:--mfn-header-menu-animation-color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-menu-li > .mfn-menu-link:--mfn-header-menu-animation-color'}
        ],
        'shop': [
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .woocommerce ul.products li.product h4 a:color', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .woocommerce ul.products li.product .mfn-woo-product-title a:color'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .woocommerce ul.products li.product h4:typography', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .woocommerce ul.products li.product .mfn-woo-product-title:typography'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .woocommerce ul.products li.product h4:margin', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .woocommerce ul.products li.product .mfn-woo-product-title:margin'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .woocommerce ul.products li.product h4:margin_laptop', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .woocommerce ul.products li.product .mfn-woo-product-title:margin_laptop'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .woocommerce ul.products li.product h4:margin_tablet', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .woocommerce ul.products li.product .mfn-woo-product-title:margin_tablet'},
            {old: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .woocommerce ul.products li.product h4:margin_mobile', new: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .woocommerce ul.products li.product .mfn-woo-product-title:margin_mobile'},
        ]
    },
    wrap: [],
    section: []
};

const additional_css = {
    'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-header-tmpl-menu-sidebar .mfn-header-menu li .mfn-submenu li a:justify-content': { // header_burger justify content & text align
        new_id: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-header-tmpl-menu-sidebar .mfn-header-menu li .mfn-submenu li a:text-align',
        path: '.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-header-tmpl-menu-sidebar .mfn-header-menu li .mfn-submenu li a',
        style: 'text-align',
        rewrites: {
            'flex-start': 'left',
            'flex-end': 'right',
            'center': 'center',
        }
    },

    'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-header-tmpl-menu-sidebar .mfn-header-menu li .mfn-submenu li a:justify-content_laptop': { // header_burger justify content & text align
        new_id: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-header-tmpl-menu-sidebar .mfn-header-menu li .mfn-submenu li a:text-align_laptop',
        path: '.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-header-tmpl-menu-sidebar .mfn-header-menu li .mfn-submenu li a',
        style: 'text-align',
        rewrites: {
            'flex-start': 'left',
            'flex-end': 'right',
            'center': 'center',
        }
    },

    'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-header-tmpl-menu-sidebar .mfn-header-menu li .mfn-submenu li a:justify-content_tablet': { // header_burger justify content & text align
        new_id: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-header-tmpl-menu-sidebar .mfn-header-menu li .mfn-submenu li a:text-align_tablet',
        path: '.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-header-tmpl-menu-sidebar .mfn-header-menu li .mfn-submenu li a',
        style: 'text-align',
        rewrites: {
            'flex-start': 'left',
            'flex-end': 'right',
            'center': 'center',
        }
    },

    'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-header-tmpl-menu-sidebar .mfn-header-menu li .mfn-submenu li a:justify-content_mobile': { // header_burger justify content & text align
        new_id: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-header-tmpl-menu-sidebar .mfn-header-menu li .mfn-submenu li a:text-align_mobile',
        path: '.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-header-tmpl-menu-sidebar .mfn-header-menu li .mfn-submenu li a',
        style: 'text-align',
        rewrites: {
            'flex-start': 'left',
            'flex-end': 'right',
            'center': 'center',
        }
    },
    
    'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-banner-box .banner-wrapper:text-align': { // banner box text align & align items
        new_id: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-banner-box .banner-wrapper:align-items',
        path: '.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-banner-box .banner-wrapper',
        style: 'align-items',
        rewrites: {
            'left': 'flex-start',
            'right': 'flex-end',
            'center': 'center',
        }
    },

    'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-banner-box .banner-wrapper:text-align_laptop': { // banner box text align & align items
        new_id: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-banner-box .banner-wrapper:align-items_laptop',
        path: '.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-banner-box .banner-wrapper',
        style: 'align-items',
        rewrites: {
            'left': 'flex-start',
            'right': 'flex-end',
            'center': 'center',
        }
    },

    'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-banner-box .banner-wrapper:text-align_tablet': { // banner box text align & align items
        new_id: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-banner-box .banner-wrapper:align-items_tablet',
        path: '.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-banner-box .banner-wrapper',
        style: 'align-items',
        rewrites: {
            'left': 'flex-start',
            'right': 'flex-end',
            'center': 'center',
        }
    },

    'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-banner-box .banner-wrapper:text-align_mobile': { // banner box text align & align items
        new_id: 'style:.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-banner-box .banner-wrapper:align-items_mobile',
        path: '.mcb-section .mcb-wrap .mcb-item-mfnuidelement .mfn-banner-box .banner-wrapper',
        style: 'align-items',
        rewrites: {
            'left': 'flex-start',
            'right': 'flex-end',
            'center': 'center',
        }
    },


}

const color_palette = [
    _.has(mfnDbLists.themeoptions, 'color-palette-1') && mfnDbLists.themeoptions['color-palette-1'].length ? mfnDbLists.themeoptions['color-palette-1'] : '#f44336',
    _.has(mfnDbLists.themeoptions, 'color-palette-2') && mfnDbLists.themeoptions['color-palette-2'].length ? mfnDbLists.themeoptions['color-palette-2'] : '#e91e63',
    _.has(mfnDbLists.themeoptions, 'color-palette-3') && mfnDbLists.themeoptions['color-palette-3'].length ? mfnDbLists.themeoptions['color-palette-3'] : '#9c27b0',
    _.has(mfnDbLists.themeoptions, 'color-palette-4') && mfnDbLists.themeoptions['color-palette-4'].length ? mfnDbLists.themeoptions['color-palette-4'] : '#673ab7',
    _.has(mfnDbLists.themeoptions, 'color-palette-5') && mfnDbLists.themeoptions['color-palette-5'].length ? mfnDbLists.themeoptions['color-palette-5'] : '#3f51b5',
    _.has(mfnDbLists.themeoptions, 'color-palette-6') && mfnDbLists.themeoptions['color-palette-6'].length ? mfnDbLists.themeoptions['color-palette-6'] : '#2196f3',
    _.has(mfnDbLists.themeoptions, 'color-palette-7') && mfnDbLists.themeoptions['color-palette-7'].length ? mfnDbLists.themeoptions['color-palette-7'] : '#03a9f4',
    _.has(mfnDbLists.themeoptions, 'color-palette-8') && mfnDbLists.themeoptions['color-palette-8'].length ? mfnDbLists.themeoptions['color-palette-8'] : '#00bcd4',
    _.has(mfnDbLists.themeoptions, 'color-palette-9') && mfnDbLists.themeoptions['color-palette-9'].length ? mfnDbLists.themeoptions['color-palette-9'] : '#009688',
    _.has(mfnDbLists.themeoptions, 'color-palette-10') && mfnDbLists.themeoptions['color-palette-10'].length ? mfnDbLists.themeoptions['color-palette-10'] : '#4caf50',
    _.has(mfnDbLists.themeoptions, 'color-palette-11') && mfnDbLists.themeoptions['color-palette-11'].length ? mfnDbLists.themeoptions['color-palette-11'] : '#8bc34a',
    _.has(mfnDbLists.themeoptions, 'color-palette-12') && mfnDbLists.themeoptions['color-palette-12'].length ? mfnDbLists.themeoptions['color-palette-12'] : '#cddc39',
    _.has(mfnDbLists.themeoptions, 'color-palette-13') && mfnDbLists.themeoptions['color-palette-13'].length ? mfnDbLists.themeoptions['color-palette-13'] : '#ffeb3b',
    _.has(mfnDbLists.themeoptions, 'color-palette-14') && mfnDbLists.themeoptions['color-palette-14'].length ? mfnDbLists.themeoptions['color-palette-14'] : '#ffc107'
];


