/* jshint esversion: 6 */

var Mfn_livesearch = {
  that: this, //helper for `this` overwritting for event

  postsLoaded: [],

  dom : {
    ajaxFetchedPage: '', //only for getter below
    get resultsFromPage() { return this.ajaxFetchedPage; },
    isItem(e) { return e.target.closest('.mfn-live-search-wrapper') },

    //item attrs
    itemAttr(attrName){
      const wrapper = document.querySelector('.mfn-live-search-wrapper');
      return parseInt(wrapper.getAttribute('data-'+attrName));
    },

    //inputs
    get searchForm() {
      return Array.from(document.querySelectorAll('.search_wrapper .form-searchform, .top_bar_right .form-searchform, #Side_slide #side-form, .mfn-live-search-wrapper .mfn-live-searchform'));
    },
    get searchField() {
      return Array.from(document.querySelectorAll('.search_wrapper input[type=text], .top_bar_right .form-searchform input[type=text], #Side_slide #side-form input[type=text], .mfn-live-search-wrapper input[type=text]'));
    },

    //no results
    get liveSearchNoResults() {
      return Array.from(document.querySelectorAll('.mfn-live-search-box .mfn-live-search-noresults'));
    },

    //Main containers
    get liveSearchBox() {
      return Array.from(document.querySelectorAll('.mfn-live-search-box'));
    },
    get liveSearchResultsList() {
      return Array.from(document.querySelectorAll('.mfn-live-search-list'));
    },
    get liveSearchResultsListShop() {
      return Array.from(document.querySelectorAll('.mfn-live-search-list-shop ul'));
    },
    get liveSearchResultsListBlog() {
      return Array.from(document.querySelectorAll('.mfn-live-search-list-blog ul'));
    },
    get liveSearchResultsListPortfolio() {
      return Array.from(document.querySelectorAll('.mfn-live-search-list-portfolio ul'));
    },
    get liveSearchResultsListPages() {
      return Array.from(document.querySelectorAll('.mfn-live-search-list-pages ul'));
    },
    get liveSearchResultsListCategories() {
      return Array.from(document.querySelectorAll('.mfn-live-search-list-categories ul'));
    },
  },

  create: {
    that: this,

    //constructors
    linkToLivesearch: (inputValue) => `${mfn.home_url_lang}?s=${inputValue}&mfn_livesearch`,
    linkToLivesearch2: (inputValue,postType) => `${mfn.home_url_lang}?s=${inputValue}&mfn_livesearch&searchpage${postType}`,

    Li: () => document.createElement("li"),
    Heading: (post) => post.querySelector( '.post-title'),
    Link:  (post) => post.querySelector( '.post-title a'),
    Excerpt: (post) => post.querySelector( '.post-excerpt p' ),
    WooPrice: (post) => post.querySelector('.post-product-price'),
    Image(post) {
      const imgDom = post.querySelector('.post-featured-image img');

      if( imgDom  ) {


        let imgDomCreate = document.createElement('img');
        imgDomCreate.src = imgDom.src;

        return imgDomCreate;
      }

    },
    Category(post) {
      switch(true){
        case post.classList.contains('product'):
          return 'product';
        case post.classList.contains('page'):
          return 'page';
        case post.classList.contains('portfolio'):
          return 'portfolio';
        case post.classList.contains('post'):
          return 'post';
      }
    },
    Textbox(heading, link, excerpt, wooPrice) {
      // textbox
      // is a heading with href and excerpt
      let headingCreate = document.createElement('a');
      let excerptCreate = document.createElement("p");
      let wooPriceCreate = document.createElement("span");
      let container = document.createElement("div");
        container.classList.add("mfn-live-search-texts");

      //text (heading) is wrapped in link
      if (heading.textContent && link.href ) {
        headingCreate.innerHTML = heading.textContent;
        headingCreate.href = link.href;

        container.appendChild(headingCreate);
      }

      if(wooPrice) {
        wooPriceCreate.classList.add("mfn-ls-price");
        wooPriceCreate.innerHTML = wooPrice.innerHTML;

        container.appendChild(wooPriceCreate);
      }

      if ( excerpt != null && excerpt.textContent.match(/\w/) )  {
        let finalExcerpt = '';

        /* Cut letter in limit*/
        const letterLimit = 90;
        const sentence = excerpt.innerHTML;

        if (letterLimit >= sentence.length) {
          finalExcerpt = sentence;
        }else{
          finalExcerpt = `${sentence.substr(0, sentence.lastIndexOf(' ', letterLimit))}...`;
        }

        excerptCreate.innerHTML = finalExcerpt;
        container.appendChild(excerptCreate);
      }

      return container;
    },
    readyList(e) {
      var that = this.that;
      let loadPostsAmount = mfn.livesearch.loadPosts;

      //Ajax fetched page
      let remotePageSource = that.Mfn_livesearch.dom.resultsFromPage;
        remotePageSource = jQuery(remotePageSource).find('.posts_group');
      //if posts exists
      if (remotePageSource.length) {
        const [{ children: posts }] = remotePageSource;

        //HTML -> ARRAY
        Array.from(posts).forEach(post => {

          //prevent creating posts on limit
          if(loadPostsAmount > 0) {
            let Li = this.Li();

            //utils, id of post could be useful!
            this.postId = post.id.match(/\d+/g).toString();

            //if featured image exists, push it
            if ( _.isObject(this.Image( post )) ) Li.appendChild( this.Image( post )  );


            //prepare the textbox & push to li
            const textbox = this.Textbox( this.Heading(post), this.Link(post), this.Excerpt(post), this.WooPrice(post)  );
            Li.setAttribute('data-category', this.Category(post));

            //finish
            Li.appendChild( textbox );

            //push to main container
            that.Mfn_livesearch.postsLoaded.push( Li );
          }

          loadPostsAmount--;
        });
      } else if (e.target.value.length && !that.Mfn_livesearch.postsLoaded.length) {
        //if form is filled, but there is no posts
        jQuery(that.Mfn_livesearch.dom.liveSearchNoResults).fadeIn();
      }
    },
    categoryPills(actualInput){
      var that = this.that;
      // method of variable

      if( mfn_livesearch_categories ){
        const regex = new RegExp(`[a-zA-Z]*${actualInput}[a-zA-Z]*`, 'gi');

        const similarResults = Object.values(mfn_livesearch_categories).filter(function(category){
          return category.match(regex);
        });

        similarResults.forEach(category => {

          let Li = this.Li();
          Li.setAttribute('data-category', 'category');

          let text = document.createElement('a');
          text.innerHTML = category;
          text.href = Object.keys(mfn_livesearch_categories).find(key => mfn_livesearch_categories[key] === category);

          Li.appendChild(text);

          that.Mfn_livesearch.postsLoaded.push( Li );

        });
      }
    }
  },

  ajaxSearch(that, e) {
    //check if item, then topbar
    let howManyChars = that.Mfn_livesearch.dom.isItem(e) !== null ? that.Mfn_livesearch.dom.itemAttr('char') : mfn.livesearch.minChar;

    if (e.target.value.length >= howManyChars) {

      jQuery(that.Mfn_livesearch.dom.searchForm).addClass('mfn-livesearch-loading');
      let trimmedSearchingSentence = e.target.value.trim();

      jQuery.ajax({
        url: this.Mfn_livesearch.create.linkToLivesearch( trimmedSearchingSentence ),
        type: "GET",
        success: function (response) {
          that.Mfn_livesearch.dom.ajaxFetchedPage = response;

          setTimeout(function(){
            jQuery(that.Mfn_livesearch.dom.searchForm).removeClass('mfn-livesearch-loading');

            that.Mfn_livesearch.postsLoaded = []; //remove previous results,
            jQuery(that.Mfn_livesearch.dom.liveSearchNoResults).fadeOut();

            that.Mfn_livesearch.create.categoryPills(e.target.value); //CATEGORY PILLS ARE JUST NAMES OF ALL CATEGORIES!
            that.Mfn_livesearch.create.readyList(e); //wrapped in this.postsLoaded(), load posts

            that.Mfn_livesearch.refreshCategoryContainers();
            that.Mfn_livesearch.assignToProperContainer(that.Mfn_livesearch.postsLoaded);
            that.Mfn_livesearch.hideNotUsedCategories();

            //Front-end effects
            that.Mfn_livesearch.toggleDropdown(e); //BE AWARE, NO FEATURED IMAGE ITEM ISSUE SOLVED HERE
            that.Mfn_livesearch.toggleMoreResultsButton(e);
          }, 0);
        }
      });
    } else {
      //close, when not enough characters
      that.Mfn_livesearch.toggleDropdown(e);
    }
  },

  refreshCategoryContainers(){
    const containers = this.that.Mfn_livesearch.dom;
    const { pages, categories, portfolio, post, products } = mfn.livesearch.translation;

    jQuery(containers.liveSearchResultsListShop).html(`<li class="mfn-live-search-heading" data-category="info"> ${products} </li>`);
    jQuery(containers.liveSearchResultsListPages).html(`<li class="mfn-live-search-heading" data-category="info"> ${pages} </li>`);
    jQuery(containers.liveSearchResultsListPortfolio).html(`<li class="mfn-live-search-heading" data-category="info"> ${portfolio} </li>`);
    jQuery(containers.liveSearchResultsListBlog).html(`<li class="mfn-live-search-heading" data-category="info"> ${post} </li>`);
    jQuery(containers.liveSearchResultsListCategories).html(`<li class="mfn-live-search-heading" data-category="info"> ${categories} </li>`);
  },

  assignToProperContainer(posts){
    var that = this.that;

    posts.forEach(post =>{
      switch(post.getAttribute('data-category')){
        case 'product':
          jQuery(that.Mfn_livesearch.dom.liveSearchResultsListShop).append(post);
          break;
        case 'page':
          jQuery(that.Mfn_livesearch.dom.liveSearchResultsListPages).append(post);
          break;
        case 'portfolio':
          jQuery(that.Mfn_livesearch.dom.liveSearchResultsListPortfolio).append(post);
          break;
        case 'post':
          jQuery(that.Mfn_livesearch.dom.liveSearchResultsListBlog).append(post);
          break;
        case 'category':
          jQuery(that.Mfn_livesearch.dom.liveSearchResultsListCategories).append(post);
          break;
      }

    });
  },

  hideNotUsedCategories(){
    var that = this.that;

    that.Mfn_livesearch.dom.liveSearchResultsList.forEach(resultsList =>{

      Array.from(resultsList.children).forEach(category => {
        let content = category.querySelectorAll('ul li[data-category]');

        if(content.length === 1){ //1 means there is no items
          category.style.display = "none";
        }else{
          category.style.display = "block";
        }
      });

    });
  },

  toggleDropdown(e) {
      let focusedSearchBox; //DOM
      let howManyChars = this.that.Mfn_livesearch.dom.isItem(e) !== null ? this.that.Mfn_livesearch.dom.itemAttr('char') : mfn.livesearch.minChar;

      if( this.dom.isItem(e) ){ //item!!!!
        focusedSearchBox = document.querySelector('.mfn-live-search-wrapper .mfn-live-search-box');

        //independent setting for hiding featured image
        if ( !this.dom.itemAttr('featured') ) {
          const featuredImages = document.querySelectorAll('.mfn-live-search-wrapper img');

          Array.from(featuredImages).forEach( image => {
            image.style.display = 'none';
          });
        }

      }else if(document.querySelector('#Side_slide') && document.querySelector('#Side_slide').style.right === '0px'){
        focusedSearchBox = document.querySelector('#Side_slide .mfn-live-search-box');
      }else if(document.querySelector('.search_wrapper') && document.querySelector('.search_wrapper').style.display === 'block'){
        focusedSearchBox = document.querySelector('.search_wrapper .mfn-live-search-box');
      }else if(document.querySelector('.mfn-header-tmpl') ){
        focusedSearchBox = jQuery('.search_wrapper input:focus').closest('.search_wrapper').find('.mfn-live-search-box');
        jQuery('.search_wrapper input:focus').closest('.mcb-wrap').css('z-index', 3);
      }else{
        focusedSearchBox = document.querySelector('.top_bar_right .mfn-live-search-box');
      }

      //jquery has nice animations, so why not to use them
      if ( e.target.value.length < howManyChars) {
        return jQuery(focusedSearchBox).slideUp(300);
      }

      jQuery(focusedSearchBox).slideDown(300);
  },

  toggleMoreResultsButton(e) {
    this.dom.liveSearchBox.forEach(searchBox => {
      const getMoreResultsButton = searchBox.querySelector('a.button'); //button in live search box
      const howManyItems = mfn.livesearch.loadPosts;
      var postType = '';

      if ( this.postsLoaded.length >= howManyItems && this.postsLoaded.length ) {
        getMoreResultsButton.classList.remove('hidden');

        if( e.target.querySelector('input[name="post_type"]') ){
         postType = '&post_type=' + e.target.querySelector('input[name="post_type"]').value;
        }

        getMoreResultsButton.href = this.create.linkToLivesearch2(e.target.value, postType);
      } else {
        getMoreResultsButton.classList.add('hidden');
      }
    });
  },

  closeBoxOnClick() {
    //set attribute for element, recog which one is active
    this.dom.searchForm.forEach( (x) => {
      if ( jQuery(x).siblings('.mfn-live-search-box').css('display') !== 'none' || jQuery(x).closest('.mfn-loaded').length ) {
        x.setAttribute('mfn-livesearch-dropdown', true);
      } else {
        x.setAttribute('mfn-livesearch-dropdown', false);
      }
    })

    let item = jQuery('[mfn-livesearch-dropdown=true]');


    if(item.closest('.mfn-loaded').length){
      // Icon type of search --- its different than any other search
      jQuery(item).find('.icon_close').click();
      item.attr('mfn-livesearch-dropdown', false);
    }else{
      jQuery(item).find('.mfn-live-search-box').fadeOut(300);
      jQuery(item).siblings('.mfn-live-search-box').fadeOut(300);
    }

    //clean them up
    this.refreshCategoryContainers();
    this.hideNotUsedCategories();
    item.siblings('.mfn-live-search-box').find('.button').addClass('hidden');
    item.closest('.mcb-wrap').css('z-index', 2);
  },

  events() {

    //AJAX
    var inputDebounce = _.debounce(this.ajaxSearch, 300);

    //form loop
    this.dom.searchForm.forEach(searchForm => {
      //prevent submitting form
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        var postType = '';
        const { value } = e.target.querySelector('.field');

        if( e.target.querySelector('input[name="post_type"]') ){
         postType = '&post_type=' + e.target.querySelector('input[name="post_type"]').value;
        }

        window.location.href = this.create.linkToLivesearch2(value, postType);
      });
    });

    //ESC Handler
    document.addEventListener("keyup", (e) => {
      if(e.key === 'Escape') {
        this.closeBoxOnClick();
        e.stopPropagation();
      }
    });

    //field loop
    this.dom.searchField.forEach(searchField => {
      //On click, load the search interaction
      searchField.addEventListener("click", (e) => { inputDebounce(this.that, e); });

      //On input
      searchField.addEventListener("input", (e) => inputDebounce(this.that, e) /* hocus pocus, grab the focus :D */ );

      //Slide the dropdown, when click at anything but live searchbox and input
      searchField.addEventListener("click", (e) => {

        //item must be independent, close dropdowns if are not related to the same "category"
        if( this.that.Mfn_livesearch.dom.isItem(e) ){
          jQuery(".search_wrapper .mfn-live-search-box, .top_bar_right .mfn-live-search-box, #Side_slide .mfn-live-search-box").slideUp(300);
        } else {
          jQuery(".mfn-live-search-wrapper .mfn-live-search-box").slideUp(300);
          e.stopPropagation();
        }

      });
    });

    // li click

    jQuery('.mfn-live-search-box').on('click', 'li[data-category]', function(){
      let a = jQuery(this).find('a');
      if( a.length ){
        window.location.href = a.attr('href');
      }
    });

    //Slide the dropdown, when click at anything but live searchbox and input
    this.dom.liveSearchBox.forEach(searchBox => {
      searchBox.addEventListener("click", (e) => e.stopPropagation());
    });

    //Hide whole form by clicking outside the search
    document.addEventListener("click", (e) => {
      this.closeBoxOnClick();
    });

  },

  init(){
    this.events();
  }
};

Mfn_livesearch.init();
