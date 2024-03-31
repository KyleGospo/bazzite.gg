document.addEventListener('DOMContentLoaded', function () {
    var interBubble = document.querySelector('.interactive');
    var curX = 0;
    var curY = 0;
    var tgX = 0;
    var tgY = 0;

    function move() {
        var height = window.scrollY;
        var winheight = window.innerHeight;
        if (document.hasFocus() && height <= winheight) {
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

  const mainContributors = ['KyleGospo', 'EyeCantCU', 'HikariKnight', 'antheas', 'aarron-lee', 'castrojo', 'bsherman', 'noelmiller', 'nicknamenamenick', 'BoukeHaarsma23', 'matte-schwartz', 'gerblesh', 'reisvg', 'SuperRiderTH', 'CharlieBros', 'ublue-os'];
  const ignoredContributors = ['github-actions[bot]', 'dependabot[bot]'];


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
    url : "https://api.github.com/repos/ublue-os/bazzite/contributors",
    dataType: "json",
    success : function (data) {
      var includeCount = 0;
      data.forEach(function(contributor) {
        if(includeCount == 5) {
          return true;
        }

        var contributorLogin = contributor['login'];
        if(!mainContributors.includes(contributorLogin) && !ignoredContributors.includes(contributorLogin)) {
          mainContributors.push(contributorLogin);
          includeCount = includeCount + 1;
        }
      });

      mainContributors.forEach(function(contributor) {
        document.getElementById('contributor-container').innerHTML += '<div class="github-profile-badge" data-user="' + contributor + '"></div';
      });

      const widgets = document.getElementsByClassName('github-profile-badge');
      for (let i = 0; i < widgets.length; i++) {
          fillWidget(widgets[i]);
      }

      jQuery.ajax({
        url : "https://api.github.com/repos/ublue-os/bazzite",
        dataType: "json",
        success : function (data) {
          var stargazersCount = Intl.NumberFormat('en-US', {
            notation: "compact",
            maximumFractionDigits: 1
          }).format(data['stargazers_count']);

          document.getElementById('contributor-container').innerHTML += '<div class="github-profile-badge always-expanded"><a href="https://github.com/ublue-os/bazzite/stargazers" target="_blank" class="github-profile-badge-wrapper"><div class="github-profile-badge-img-wrapper"><i class="fa-solid fa-star"></i></div><div class="github-profile-badge-name-wrapper"><p class="github-profile-badge-name">' + stargazersCount.toLowerCase() + ' Stargazers</p></div></a></div>';
        
          jQuery.ajax({
            url : "https://storage.googleapis.com/ghp-stats/ublue-os/data.json",
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

              document.getElementById('contributor-container').innerHTML += '<div class="github-profile-badge always-expanded"><a href="https://github.com/orgs/ublue-os/packages?repo_name=bazzite" target="_blank" class="github-profile-badge-wrapper"><div class="github-profile-badge-img-wrapper"><i class="fa-solid fa-layer-group"></i></div><div class="github-profile-badge-name-wrapper"><p class="github-profile-badge-name">' + pullCount.toLowerCase() + ' Image Pulls</p></div></a></div>';
            }
          });
        }
      });
    }
  });

  const desktopHardware = ['desktop', 'laptop', 'htpc', 'asus'];
  const handheldHardware = ['steamdeck', 'ally', 'legion', 'gpd', 'ayn', 'handheld'];
  const hhdHardware = ['ally', 'legion', 'gpd', 'ayn', 'handheld'];
  const valveHardware = ['steamdeck'];
  const noGamemodeHardware = ['nvidia', 'old-intel'];

  jQuery('#image-builder #selectedHardware').on('change', function() {
    jQuery('#hardware-description .explaination').removeClass('shown-fade').addClass('hidden-fade');
    var selectedHardware = jQuery(this).val();
    jQuery('#hardware-description > span').addClass('hidden-fade').removeClass('shown-fade');
    jQuery('#image-builder .gpu, #image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
    jQuery('#image-builder .no-gamemode').addClass('hidden-fade').removeClass('shown-fade');
    jQuery(this).parent('.select-wrapper').removeClass('glow-effect');

    if (selectedHardware !== '') {
      jQuery('#image-builder .desktopEnvironment').removeClass('hidden-fade').addClass('shown-fade');
      jQuery('#image-builder .gpu').removeClass('hidden-fade').addClass('shown-fade');
      jQuery('#image-builder .gamemode').removeClass('hidden-fade').addClass('shown-fade');
      jQuery('#image-builder .no-gamemode').addClass('hidden-fade').removeClass('shown-fade');
      jQuery('#image-builder .hhd').removeClass('shown-fade').addClass('hidden-fade');
      jQuery('#image-builder .steam-deck').removeClass('shown-fade').addClass('hidden-fade');
      var gpuVendor = jQuery('#gpuVendor').val();
      if (handheldHardware.includes(selectedHardware)) {
        jQuery('#image-builder .gpu, #image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
        if (hhdHardware.includes(selectedHardware)) {
          jQuery('#image-builder .hhd').addClass('shown-fade').removeClass('hidden-fade');
        } else if (valveHardware.includes(selectedHardware)) {
          jQuery('#image-builder .steam-deck').addClass('shown-fade').removeClass('hidden-fade');
        }
      } else if (noGamemodeHardware.includes(gpuVendor)) {
        jQuery('#image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
        jQuery('#image-builder .no-gamemode').removeClass('hidden-fade').addClass('shown-fade');
      } else if (!gpuVendor) {
        jQuery('#image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
        jQuery('#image-builder .no-gamemode').addClass('hidden-fade').removeClass('shown-fade');
      }

      if(selectedHardware == 'asus') {
        jQuery('#hardware-description .desktop').addClass('shown-fade').removeClass('hidden-fade');
      } else {
        jQuery('#hardware-description .' + selectedHardware).addClass('shown-fade').removeClass('hidden-fade');
      }
    }
  });

  jQuery('#image-builder #gpuVendor').on('change', function() {
    jQuery(this).parent('.select-wrapper').removeClass('glow-effect');
    var selectedHardware = jQuery('#image-builder #selectedHardware').val();
    var selectedGPU = jQuery(this).val();
    if (noGamemodeHardware.includes(selectedGPU)) {
      jQuery('#image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
      jQuery('#image-builder .no-gamemode').removeClass('hidden-fade').addClass('shown-fade');
    } else if (selectedGPU !== '') {
      jQuery('#image-builder .gamemode').removeClass('hidden-fade').addClass('shown-fade');
      jQuery('#image-builder .no-gamemode').addClass('hidden-fade').removeClass('shown-fade');
    } else {
      jQuery('#image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
      jQuery('#image-builder .no-gamemode').addClass('hidden-fade').removeClass('shown-fade');
    }
  });

  jQuery('#image-builder #desktopEnvironment, #image-builder #selectedHardware, #image-builder #gpuVendor, #image-builder #steamGameMode').on('change', function() {
    jQuery(this).parent('.select-wrapper').removeClass('glow-effect');
    var desktopEnvironment = jQuery('#desktopEnvironment').parent('div').parent('div').hasClass('hidden-fade') ? '' : jQuery('#desktopEnvironment').val();
    var hardware = jQuery('#selectedHardware').parent('div').parent('div').hasClass('hidden-fade') ? '' : jQuery('#selectedHardware').val();
    var gpuVendor = jQuery('#gpuVendor').parent('div').parent('div').hasClass('hidden-fade') ? '' : jQuery('#gpuVendor').val();
    var steamGameMode = jQuery('#steamGameMode').parent('div').parent('div').hasClass('hidden-fade') ? '' : jQuery('#steamGameMode').val();

    var imagename = 'bazzite';

    switch(hardware) {
      case 'steamdeck':
      case 'handheld':
      case 'legion':
      case 'ayn':
      case 'gpd':
        imagename += '-deck';
        break;

      case 'ally':
        imagename += '-ally';
        break;

      case 'asus':
        if(steamGameMode === 'yes') {
          imagename += '-ally';
        }
        break;
    }

    switch(desktopEnvironment) {
      case 'gnome':
        imagename += '-gnome';
        break;

      case 'budgie':
        imagename += '-budgie';
        break;
    }

    switch(hardware) {
      case 'asus':
        if(steamGameMode !== 'yes') {
          imagename += '-asus';
        }
        break;
    }

    if (gpuVendor === 'nvidia' && !handheldHardware.includes(hardware)) {
      imagename += '-nvidia';
    }

    if ((hardware === 'desktop' || hardware === 'htpc') && steamGameMode === 'yes') {
      imagename = imagename.replace('bazzite', 'bazzite-deck')
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
      jQuery('.button-download').attr('href', 'https://download.bazzite.gg/' + imagename + '-stable.iso');
      jQuery('.sha256').attr('href', 'https://download.bazzite.gg/' + imagename + '-stable-CHECKSUM');
      jQuery('.ghcr-details').attr('href', 'https://ghcr.io/ublue-os/' + imagename);

      if(jQuery('.changelog.hidden-fade').length > 0) {
        //Show changelog
        jQuery.ajax({
            url : "https://raw.githubusercontent.com/ublue-os/bazzite/main/CHANGELOG-SHORT.md",
            dataType: "text",
            success : function (data) {
                jQuery('.changelog').html(marked.parse(data)).addClass('shown-fade').removeClass('hidden-fade');
            }
        });
      }

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
