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
  var currentDate = new Date();
  jQuery('#current-year').text(currentDate.getFullYear());

  jQuery('#image-builder #desktopEnvironment').on('change', function() {
    var selectedDesktopEnvironment = jQuery(this).val();
    if (selectedDesktopEnvironment !== '') {
      jQuery('#image-builder .selectedHardware').removeClass('hidden-fade').addClass('shown-fade');
    } else {
      jQuery('#image-builder .selectedHardware, #image-builder .gpu, #image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
    }
  });

  jQuery('#image-builder #selectedHardware').on('change', function() {
    var selectedHardware = jQuery(this).val();
    if (selectedHardware !== '') {
      jQuery('#image-builder .gpu').removeClass('hidden-fade').addClass('shown-fade');
      jQuery('#image-builder .gamemode').removeClass('hidden-fade').addClass('shown-fade');
      var gpuVendor = jQuery('#gpuVendor').val();
      if (selectedHardware == 'steamdeck' || selectedHardware == 'ally' || selectedHardware == 'handheld') {
        jQuery('#image-builder .gpu, #image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
      } else if (gpuVendor === 'nvidia' || selectedHardware == 'surface') {
        jQuery('#image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
      } else if (!gpuVendor) {
        jQuery('#image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
      }
    } else {
      jQuery('#image-builder .gpu, #image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
    }
  });

  jQuery('#image-builder #gpuVendor').on('change', function() {
    var selectedHardware = jQuery('#image-builder #selectedHardware').val();
    var selectedGPU = jQuery(this).val();
    if (selectedGPU == 'nvidia' || selectedHardware == 'surface') {
      jQuery('#image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
    } else if (selectedGPU !== '') {
      jQuery('#image-builder .gamemode').removeClass('hidden-fade').addClass('shown-fade');
    } else {
      jQuery('#image-builder .gamemode').addClass('hidden-fade').removeClass('shown-fade');
    }
  });

  jQuery('#image-builder #desktopEnvironment, #image-builder #selectedHardware, #image-builder #gpuVendor, #image-builder #steamGameMode').on('change', function() {
    var desktopEnvironment = jQuery('#desktopEnvironment').parent('div').hasClass('hidden-fade') ? '' : jQuery('#desktopEnvironment').val();
    var hardware = jQuery('#selectedHardware').parent('div').hasClass('hidden-fade') ? '' : jQuery('#selectedHardware').val();
    var gpuVendor = jQuery('#gpuVendor').parent('div').hasClass('hidden-fade') ? '' : jQuery('#gpuVendor').val();
    var steamGameMode = jQuery('#steamGameMode').parent('div').hasClass('hidden-fade') ? '' : jQuery('#steamGameMode').val();

    var imagename = 'bazzite';

    switch(hardware) {
      case 'steamdeck':
      case 'handheld':
        imagename += '-deck';
        break;

      case 'asus':
        imagename += '-asus';
        break;

      case 'ally':
        imagename += '-ally';
        break;

      case 'framework':
        imagename += '-framework';
        break;

      case 'surface':
        imagename += '-surface';
        break;

      default:
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

    if (gpuVendor === 'nvidia') {
      imagename += '-nvidia';
    }

    if (hardware === 'framework' && steamGameMode === 'yes') {
      imagename = imagename.replace('-framework', '-framegame');
    } else if (hardware === 'asus' && steamGameMode === 'yes') {
      imagename = imagename.replace('-asus', '-ally');
    } else if (hardware === 'desktop' && steamGameMode === 'yes') {
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
      jQuery('#image-builder-result').removeClass('hidden-fade').addClass('shown-fade');
      jQuery('#image-builder-result .image-name').text(imagename);
    } else {
      jQuery('#image-builder-result').addClass('hidden-fade').removeClass('shown-fade');
    }
  });
});
