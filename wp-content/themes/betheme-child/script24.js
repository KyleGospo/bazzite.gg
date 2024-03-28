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

function onResize() {
    jQuery('rs-slide').css('top', jQuery('#mfn-header-template').outerHeight()/2 + 'px');
}

jQuery(window).on('resize', function() {
    onResize();
});

jQuery(document).ready(function() {
  onResize();
  
  jQuery(document).on('click', '.button-to-download', function (event) {
      event.preventDefault();

      jQuery('html, body').animate({
          scrollTop: jQuery(jQuery.attr(this, 'href')).offset().top - jQuery('#mfn-header-template').outerHeight()
      }, 500);
  });

  var hasScrolled = false;
  var currentDate = new Date();
  jQuery('#current-year').text(currentDate.getFullYear());

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

    if (hardware === 'desktop' && steamGameMode === 'yes') {
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
      if(!hasScrolled) {
        jQuery('html,body').animate({
          scrollTop:jQuery('#image-builder-result').offset().top - jQuery('#mfn-header-template').outerHeight() - 30
        }, 500);
        hasScrolled = true;
      }
    } else {
      jQuery('#image-builder-result').addClass('hidden-fade').removeClass('shown-fade');
    }
  });
});
