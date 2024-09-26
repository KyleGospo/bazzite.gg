var lottie_contmfn_lottie_727_783 = document.getElementById("mfn_lottie_727_783");
var triggermfn_lottie_727_783 = "default";
var directionmfn_lottie_727_783 = 1;
var totalmfn_lottie_727_783frames;
var startmfn_lottie_727_783frame;
var scroll_startedmfn_lottie_727_783 = false;
var framesmfn_lottie_727_783;
var framesmfn_lottie_727_783_reverse;
var mfn_lottie_727_783 = bodymovin.loadAnimation({
  container: lottie_contmfn_lottie_727_783,
  renderer: 'svg',
  autoplay: false,
  loop: true,
  path: "https://bazzite.gg/content/uploads/2024/02/ostree.json"
});
mfn_lottie_727_783.setSpeed(0.35);
mfn_lottie_727_783.setDirection(1);
mfn_lottie_727_783.addEventListener("DOMLoaded", function() {
  totalmfn_lottie_727_783frames = Math.floor((100 * mfn_lottie_727_783.animationData.op) / 100);
  startmfn_lottie_727_783frame = Math.floor((0 * mfn_lottie_727_783.animationData.op) / 100);
  framesmfn_lottie_727_783 = [startmfn_lottie_727_783frame, totalmfn_lottie_727_783frames];
  framesmfn_lottie_727_783_reverse = [totalmfn_lottie_727_783frames, startmfn_lottie_727_783frame];
  if (triggermfn_lottie_727_783 == "default") {
    if (directionmfn_lottie_727_783 == -1) {
      mfn_lottie_727_783.playSegments(framesmfn_lottie_727_783_reverse, true);
    } else {
      mfn_lottie_727_783.playSegments(framesmfn_lottie_727_783, true);
    }
  } else if (triggermfn_lottie_727_783 == "hover") {
    if (directionmfn_lottie_727_783 == -1) {
      choosed_framesmfn_lottie_727_783 = framesmfn_lottie_727_783_reverse;
    } else {
      choosed_framesmfn_lottie_727_783 = framesmfn_lottie_727_783;
    }
    lottie_contmfn_lottie_727_783.addEventListener("mouseenter", function() {
      if (directionmfn_lottie_727_783 == -1) {
        mfn_lottie_727_783.playSegments(framesmfn_lottie_727_783_reverse, true);
      } else {
        mfn_lottie_727_783.playSegments(framesmfn_lottie_727_783, true);
      }
    });
  } else if (triggermfn_lottie_727_783 == "click") {
    lottie_contmfn_lottie_727_783.addEventListener("click", function() {
      if (directionmfn_lottie_727_783 == -1) {
        mfn_lottie_727_783.playSegments(framesmfn_lottie_727_783_reverse, true);
      } else {
        mfn_lottie_727_783.playSegments(framesmfn_lottie_727_783, true);
      }
    });
  }
});
