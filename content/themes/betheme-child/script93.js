document.addEventListener('DOMContentLoaded', function () {
    var interBubble = document.querySelector('.interactive');
    var curX = 0;
    var curY = 0;
    var tgX = 0;
    var tgY = 0;

    function move() {
        var height = window.scrollY;
        var winheight = window.innerHeight;
        if (height <= winheight) {
          curX += (tgX - curX) / 20;
          curY += (tgY - curY) / 20;
          interBubble.style.transform = "translate(" + Math.round(curX) + "px, " + Math.round(curY) + "px)";
        }

        requestAnimationFrame(function () {
            move();
        });
    }

    window.addEventListener('mousemove', function (event) {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
});

jQuery(document).ready(function() {
  function easterEggCheck() {
      let today = new Date();
      let month = today.getMonth() + 1;
      let day = today.getDate();

      if (month === 4 && day === 1) {
        // April 1st
        jQuery('.main-logo-container .main-logo:not(.bg)').hide();
        jQuery('.main-logo-container .main-logo.bg').attr('src', 'content/uploads/2025/02/glorp.png').attr('width', '692').attr('height', '360');
        jQuery('#mfn-header-template .logo-wrapper img').attr('src', 'content/uploads/2025/02/glorp_long.svg').attr('width', '1594').attr('height', '836');
      } else if (month === 6) {
        // Month of June
        jQuery('.main-logo-container .main-logo.bg').attr('src', 'content/uploads/2025/02/bazzite_r_bg.svg');
      }
  }

  easterEggCheck();

  function animateWordChange(elem) {
      let words = document.querySelectorAll(elem);
      let wordArray = [];
      let currentWord = 0;
      
      words[currentWord].style.opacity = 1;
      
      const splitLetters = word => {
          let content = word.innerText;
          word.innerText = '';
          let letters = [];
          for (let i = 0; i < content.length; i++) {
            let letter = document.createElement('span');
            letter.className = 'letter';
            letter.innerText = content.charAt(i);
            word.appendChild(letter);
            letters.push(letter);
          }
          wordArray.push(letters);
      }
      
      for (let i = 0; i < words.length; i++) {
          splitLetters(words[i]);
        }
        
      const animateLetterOut = (cw, i) =>  {
          setTimeout(function() {
              cw[i].className = 'letter out';
          }, i*60);
      }
      
      const animateLetterIn = (nw, i) => {
      setTimeout(function() {
            nw[i].className = 'letter in';
      }, 340+(i*60));
      }
      
      const changeWord = () => {
      let cw = wordArray[currentWord];
      let nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1]; 
      
      for (let i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i); 
      }
      
      for (let i = 0; i < nw.length; i++) {

        nw[i].className = 'letter behind'; 
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i); 
      }
      currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
      }

      changeWord(); 
      const intervalId = setInterval(changeWord, 4000);
      
      return () => {
      clearInterval(intervalId);
      };
  }
  animateWordChange("#stability .anim-word");
  animateWordChange("#apps .anim-word");
  animateWordChange("#desktop .anim-word");

  jQuery(document).on('click', '.button-to-download', function (event) {
      event.preventDefault();

      var scrollLocation = jQuery(jQuery.attr(this, 'href')).offset().top - jQuery('#mfn-header-template').outerHeight();

      if(jQuery('#image-builder-result.shown-fade').length > 0) {
        scrollLocation = jQuery('#hardware-description').offset().top + jQuery('#hardware-description').outerHeight() - jQuery('#mfn-header-template').outerHeight()
      }

      jQuery('html, body').animate({
          scrollTop: scrollLocation
      }, 500);
  });

  var hasScrolled = false;
  var currentDate = new Date();
  jQuery('#current-year').text(currentDate.getFullYear());

  const mainContributors = ['KyleGospo', 'EyeCantCU', 'HikariKnight', 'antheas', 'aarron-lee', 'castrojo', 'bsherman', 'noelmiller', 'nicknamenamenick', 'Zeglius', 'BoukeHaarsma23', 'matte-schwartz', 'gerblesh', 'abanna', 'reisvg', 'SuperRiderTH', 'CharlieBros'];
  const ignoredContributors = [-1813244642, -1398026401, 1719077676, -1610463138, 375703382, -2092560191];


  /**
   * Lightly modified from:
   * https://github.com/Rapsssito/github-profile-badge
   */
  const BASE_SIZE = 50;
  const LOGO_SIZE = 20;
  const LOGO_OFFSET = 5;

  /**
   * @param {string} username
   */
  function getWrapper(username) {
      const wrapper = document.createElement('a');
      wrapper.href = `https://github.com/${username}`;
      wrapper.target = '_blank';
      wrapper.className = 'github-profile-badge-wrapper';
      return wrapper;
  }

  /**
   * @param {string} username
   */
  function getProfile(username) {
      const profileImg = document.createElement('img');
      profileImg.src = `https://avatars.githubusercontent.com/${username}`;
      profileImg.alt = `${username} GitHub Profile`;
      profileImg.className = 'github-profile-badge-img';
      profileImg.width = '400';
      profileImg.height = '400';
      profileImg.decoding = 'async';
      profileImg.loading = 'lazy';
      return profileImg;
  }

  /**
   * @param {string} username
   */
  function getImagesDiv(username) {
      const parentDiv = document.createElement('div');
      parentDiv.className = 'github-profile-badge-img-wrapper';
      parentDiv.appendChild(getProfile(username));
      return parentDiv;
  }

  /**
   * @param {string} username
   */
  function getNameText(username) {
      const nameText = document.createElement('p');
      nameText.className = 'github-profile-badge-name';
      nameText.innerText = username;
      return nameText;
  }

  /**
   * @param {HTMLElement} widget
   */
  function fillWidget(widget) {
      const username = widget.getAttribute('data-user');
      const wrapper = getWrapper(username);

      wrapper.appendChild(getImagesDiv(username));

      const nameDiv = document.createElement('div');
      nameDiv.className = 'github-profile-badge-name-wrapper';
      const nameText = getNameText(username);
      nameDiv.appendChild(nameText);
      wrapper.appendChild(nameDiv);
      widget.appendChild(wrapper);
  }

  jQuery.ajax({
    url : "https://bazzite.gg/bazzite-contributor-data.json",
    dataType: "json",
    success : function (data) {
      var includeCount = 0;
      data.forEach(function(contributor) {
        if(includeCount == 6) {
          return true;
        }

        /**
         * Returns a hash code from a string
         * @param  {String} str The string to hash.
         * @return {Number}    A 32bit integer
         * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
         */
        function hashCode(str) {
            let hash = 0;
            for (let i = 0, len = str.length; i < len; i++) {
                let chr = str.charCodeAt(i);
                hash = (hash << 5) - hash + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        }

        var contributorLogin = contributor['login'];
        if(!mainContributors.includes(contributorLogin) && !ignoredContributors.includes(hashCode(contributorLogin))) {
          mainContributors.push(contributorLogin);
          includeCount = includeCount + 1;
        }
      });

      animDelay = 0;

      mainContributors.forEach(function(contributor) {
        document.getElementById('contributor-container').innerHTML += '<div class="github-profile-badge animate" data-anim-type="fadeInUp" style="animation-delay:' + animDelay + 'ms;" data-user="' + contributor + '"></div';
        animDelay += 40;
      });

      const widgets = document.getElementsByClassName('github-profile-badge');
      for (let i = 0; i < widgets.length; i++) {
          fillWidget(widgets[i]);
      }

      jQuery.ajax({
        url : "https://bazzite.gg/ghp-stats.json",
        dataType: "json",
        success : function (data) {
          var totalPulls = 0;
          var lastData = data[Object.keys(data)[Object.keys(data).length - 1]];
          
          $.each(lastData, function(key, value) {
            if (key.indexOf("bazzite") !== -1) {
              totalPulls += value;
            }
          });

          var pullCount = Intl.NumberFormat('en-US', {
            notation: "compact",
            maximumFractionDigits: 1
          }).format(totalPulls);

          document.getElementById('contributor-container').innerHTML += '<div class="github-profile-badge always-expanded animate" data-anim-type="fadeInUp" style="animation-delay:' + animDelay + 'ms;"><a href="https://github.com/orgs/ublue-os/packages?repo_name=bazzite" target="_blank" class="github-profile-badge-wrapper"><div class="github-profile-badge-img-wrapper"><i class="fa-solid fa-layer-group"></i></div><div class="github-profile-badge-name-wrapper"><p class="github-profile-badge-name">' + pullCount.toLowerCase() + ' Image Pulls</p></div></a></div>';
          animDelay += 40;

          jQuery.ajax({
            url : "https://bazzite.gg/bazzite-repo-data.json",
            dataType: "json",
            success : function (data) {
              var stargazersCount = Intl.NumberFormat('en-US', {
                notation: "compact",
                maximumFractionDigits: 1
              }).format(data['stargazers_count']);

              document.getElementById('contributor-container').innerHTML += '<div class="github-profile-badge always-expanded animate" data-anim-type="fadeInUp" style="animation-delay:' + animDelay + 'ms;"><a href="https://github.com/ublue-os/bazzite/stargazers" target="_blank" class="github-profile-badge-wrapper"><div class="github-profile-badge-img-wrapper"><i class="fa-solid fa-star"></i></div><div class="github-profile-badge-name-wrapper"><p class="github-profile-badge-name">' + stargazersCount.toLowerCase() + ' Stargazers</p></div></a></div>';
            }
          });
        }
      });
    }
  });

  const desktopHardware = ['desktop', 'laptop', 'surface', 'framework', 'framework-desktop', 'asus-flow', 'minisforum', 'asus', 'virtualmachine'];
  const apuHardware = ['framework-desktop', 'asus-flow', 'minisforum'];
  const gamemodeHardware = ['htpc'];
  const handheldHardware = ['steamdeck', 'ally', 'legion', 'gpd', 'ayn', 'handheld', 'onexplayer'];
  const hhdHardware = ['ally', 'legion', 'gpd', 'ayn', 'handheld', 'onexplayer'];
  const valveHardware = ['steamdeck'];
  const noGamemodeHardware = ['nvidia', 'old-intel', 'surface', 'old-amd'];
  const ventoyWorkaroundHardware = ['surface'];
  const gamemodeBetaHardware = ['nvidia-open', 'intel'];
  const noProprietaryNvidiaHardware = ['surface'];
  const asusHardware = ['asus'];

  jQuery('#image-builder #selectedHardware').on('change', function() {
    jQuery('#hardware-description .explaination').removeClass('shown-fade').addClass('hidden-fade');
    var selectedHardware = jQuery(this).val();
    jQuery('#hardware-description > span').addClass('hidden-fade').removeClass('shown-fade');
    jQuery('#image-builder .gpu, #image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
    jQuery('#image-builder .no-gamemode').addClass('hidden-fade').removeClass('shown-fade');
    jQuery('#image-builder .vm-gamemode').addClass('hidden-fade').removeClass('shown-fade');
    jQuery(this).parent('.select-wrapper').removeClass('glow-effect');

    if (selectedHardware !== '') {
      jQuery('#image-builder .desktopEnvironment').removeClass('hidden-fade').addClass('shown-fade');
      jQuery('#image-builder .gpu').removeClass('hidden-fade').addClass('shown-fade');
      jQuery('#image-builder .gamemode').removeClass('hidden-fade').addClass('shown-fade');
      jQuery('#image-builder .no-gamemode').addClass('hidden-fade').removeClass('shown-fade');
      jQuery('#image-builder .hhd').removeClass('shown-fade').addClass('hidden-fade');
      jQuery('#image-builder .steam-deck').removeClass('shown-fade').addClass('hidden-fade');
      jQuery('#image-builder .rog-ally').removeClass('shown-fade').addClass('hidden-fade');
      var gpuVendor = jQuery('#gpuVendor').val();
      if (gamemodeHardware.includes(selectedHardware)) {
        jQuery('#image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
      } else if (handheldHardware.includes(selectedHardware)) {
        jQuery('#image-builder .gpu, #image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
        if (hhdHardware.includes(selectedHardware)) {
          jQuery('#image-builder .hhd').addClass('shown-fade').removeClass('hidden-fade');
          if (selectedHardware == 'ally') {
            jQuery('#image-builder .rog-ally').addClass('shown-fade').removeClass('hidden-fade');
          }
        } else if (valveHardware.includes(selectedHardware)) {
          jQuery('#image-builder .steam-deck').addClass('shown-fade').removeClass('hidden-fade');
        }
      } else if (apuHardware.includes(selectedHardware)) {
        jQuery('#image-builder .gpu').addClass('hidden-fade').removeClass('shown-fade');
      } else if (noGamemodeHardware.includes(gpuVendor) || noGamemodeHardware.includes(selectedHardware)) {
        jQuery('#image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
        jQuery('#image-builder .vm-gamemode').addClass('hidden-fade').removeClass('shown-fade');
        jQuery('#image-builder .no-gamemode').removeClass('hidden-fade').addClass('shown-fade');
      } else if (selectedHardware == 'virtualmachine') {
        jQuery('#image-builder .vm-gamemode').removeClass('hidden-fade').addClass('shown-fade');
      } else if (!gpuVendor) {
        jQuery('#image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
        jQuery('#image-builder .no-gamemode').addClass('hidden-fade').removeClass('shown-fade');
      }

      if (ventoyWorkaroundHardware.includes(selectedHardware)) {
        jQuery('#image-builder .ventoy-workaround').removeClass('hidden-fade').addClass('shown-fade');
      } else {
        jQuery('#image-builder .ventoy-workaround').addClass('hidden-fade').removeClass('shown-fade');
      }

      jQuery('#hardware-description .' + selectedHardware).addClass('shown-fade').removeClass('hidden-fade');

      if (gamemodeHardware.includes(selectedHardware)) {
        jQuery('#gpuVendor option[value="nvidia"]').prop('disabled', true);
        jQuery('#gpuVendor option[value="old-amd"]').prop('disabled', true);
        jQuery('#gpuVendor option[value="old-intel"]').prop('disabled', true);
      } else if (noProprietaryNvidiaHardware.includes(selectedHardware))  {
        jQuery('#gpuVendor option[value="nvidia"]').prop('disabled', true);
      } else {
        jQuery('#gpuVendor option[value="nvidia"]').prop('disabled', false);
        jQuery('#gpuVendor option[value="old-amd"]').prop('disabled', false);
        jQuery('#gpuVendor option[value="old-intel"]').prop('disabled', false);
      }
    }
  });

  jQuery('#image-builder #gpuVendor').on('change', function() {
    jQuery(this).parent('.select-wrapper').removeClass('glow-effect');
    var selectedHardware = jQuery('#image-builder #selectedHardware').val();
    var selectedGPU = jQuery(this).val();
    if (gamemodeHardware.includes(selectedHardware)) {
      jQuery('#image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
    } else if (noGamemodeHardware.includes(selectedGPU) || noGamemodeHardware.includes(selectedHardware)) {
      jQuery('#image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
      jQuery('#image-builder .no-gamemode').removeClass('hidden-fade').addClass('shown-fade');
      jQuery('#image-builder .vm-gamemode').addClass('hidden-fade').removeClass('shown-fade');
    } else if (selectedGPU !== '') {
      jQuery('#image-builder .gamemode').removeClass('hidden-fade').addClass('shown-fade');
      jQuery('#image-builder .no-gamemode').addClass('hidden-fade').removeClass('shown-fade');

      if (selectedHardware == 'virtualmachine') {
        jQuery('#image-builder .vm-gamemode').removeClass('hidden-fade').addClass('shown-fade');
      }
    } else {
      jQuery('#image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
      jQuery('#image-builder .no-gamemode').addClass('hidden-fade').removeClass('shown-fade');
    }

    if (gamemodeBetaHardware.includes(selectedGPU) || gamemodeBetaHardware.includes(selectedHardware)) {
      jQuery('#image-builder .gamemode-beta').removeClass('hidden-fade').addClass('shown-fade');
    } else {
      jQuery('#image-builder .gamemode-beta').addClass('hidden-fade').removeClass('shown-fade');
    }
  });

  if(jQuery('.changelog').length > 0) {
    //Show changelog
    jQuery.ajax({
      url : "https://api.github.com/repos/ublue-os/bazzite/releases",
      dataType: "json",
      success : function (data) {
        var changelogs = '';
        var count = 0
        for ( const e of data ) {
          if ( e.prerelease == true ) {
            continue;
          }

          if ( count > 3 ) {
            break;
          }

          changelogs += '# ' + e.name + '\r\n';
          changelogs += e.body;
          count += 1;
        };
        var changelogHtml = marked.parse(changelogs);
        jQuery('.changelog').html(changelogHtml);
      }
    });
  }

  jQuery('#image-builder #desktopEnvironment, #image-builder #selectedHardware, #image-builder #gpuVendor, #image-builder #steamGameMode').on('change', function() {
    jQuery(this).parent('.select-wrapper').removeClass('glow-effect');
    var desktopEnvironment = jQuery('#desktopEnvironment').parent('div').parent('div').hasClass('hidden-fade') ? '' : jQuery('#desktopEnvironment').val();
    var hardware = jQuery('#selectedHardware').parent('div').parent('div').hasClass('hidden-fade') ? '' : jQuery('#selectedHardware').val();
    var gpuVendor = jQuery('#gpuVendor').parent('div').parent('div').hasClass('hidden-fade') ? '' : jQuery('#gpuVendor').val();
    var steamGameMode = jQuery('#steamGameMode').parent('div').parent('div').hasClass('hidden-fade') ? '' : jQuery('#steamGameMode').val();

    if(gamemodeHardware.includes(hardware)) {
      steamGameMode = 'yes';
    }

    var imagename = 'bazzite';

    switch(hardware) {
      case 'steamdeck':
      case 'handheld':
      case 'legion':
      case 'ayn':
      case 'gpd':
      case 'onexplayer':
        imagename += '-deck';
        break;

      case 'ally':
        imagename += '-deck';
        break;

      case 'asus':
        if(steamGameMode === 'yes' && gpuVendor != 'nvidia-open') {
          imagename += '-ally';
        }
        break;
    }

    if (gpuVendor === 'nvidia-open' && steamGameMode == 'yes' && !handheldHardware.includes(hardware)) {
      imagename += '-nvidia';
    }

    switch(desktopEnvironment) {
      case 'gnome':
        imagename += '-gnome';
        break;

      case 'budgie':
        imagename += '-budgie';
        break;

      case 'cosmic':
        imagename += '-cosmic';
        break;
    }

    switch(hardware) {
      case 'asus':
        if(steamGameMode !== 'yes') {
          imagename += '-asus';
        }
        break;

      case 'surface':
        imagename += '-surface';
        break;
    }

    if (gpuVendor === 'nvidia' && !handheldHardware.includes(hardware) && !noProprietaryNvidiaHardware.includes(hardware)) {
      imagename += '-nvidia';
    }

    if (gpuVendor === 'nvidia-open' && steamGameMode !== 'yes' && !handheldHardware.includes(hardware)) {
      imagename += '-nvidia-open';
    }

    if (gpuVendor === 'nvidia-open' && steamGameMode === 'yes') {
      imagename = imagename.replace('bazzite', 'bazzite-deck')
    } else if ((!noGamemodeHardware.includes(gpuVendor) && !noGamemodeHardware.includes(hardware)) && !asusHardware.includes(hardware) && steamGameMode === 'yes') {
      imagename = imagename.replace('bazzite', 'bazzite-deck')
    }

    if (gpuVendor === "amd" && steamGameMode === 'yes' && !gamemodeHardware.includes(hardware) && !apuHardware.includes(hardware) && hardware != 'virtualmachine') {
      jQuery('#image-builder .gamemode-noigpu').removeClass('hidden-fade').addClass('shown-fade');
    } else {
      jQuery('#image-builder .gamemode-noigpu').addClass('hidden-fade').removeClass('shown-fade');
    }

    // Display the result
    var allSelectionsMade = true;
    jQuery('#image-builder .shown-fade select').each(function() {
        if (!jQuery(this).val()) {
            allSelectionsMade = false;
            return false;
        }
    });

    if( imagename !== '' && allSelectionsMade ) {
      jQuery('.download-logo').addClass('hidden-fade').removeClass('shown-fade');
      jQuery('#image-builder-result').removeClass('hidden-fade').addClass('shown-fade');
      jQuery('#image-builder-result .image-name').text(imagename);
      jQuery('.button-download').attr('href', 'https://download.bazzite.gg/' + imagename + '-stable-amd64.iso');
      //jQuery('.button-torrent').attr('href', 'https://archive.org/download/' + imagename + '/' + imagename + '_archive.torrent');
      jQuery('.sha256').attr('href', 'https://download.bazzite.gg/' + imagename + '-stable-amd64.iso-CHECKSUM');
      jQuery('.ghcr-details').attr('href', 'https://ghcr.io/ublue-os/' + imagename);

      //Show Videos
      jQuery('.video-container > .fade-transition').removeClass('shown-fade').addClass('hidden-fade');
      jQuery('.video-container > .fade-transition.' + hardware).removeClass('hidden-fade').addClass('shown-fade');
      jQuery('.video-container iframe').attr('src', '');
      jQuery('.video-container > .' + hardware + ' > iframe').each(function() {
          jQuery(this).attr('src', jQuery(this).attr('data-src'));
      });

      if(!hasScrolled) {
        jQuery('html,body').animate({
          scrollTop: jQuery('#hardware-description').offset().top + jQuery('#hardware-description').outerHeight() - jQuery('#mfn-header-template').outerHeight()
        }, 500);
        hasScrolled = true;
      }
    } else {
      jQuery('#image-builder-result').addClass('hidden-fade').removeClass('shown-fade');
    }
  });
});
