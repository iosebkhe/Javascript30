document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector(".player");
  const canvas = document.querySelector(".photo");
  const ctx = canvas.getContext("2d");
  const strip = document.querySelector(".strip");
  const snap = document.querySelector(".snap");
  const redEffBtn = document.querySelector(".redEffect");
  const rgbEffBtn = document.querySelector(".rgbSplit");
  const takePhotoBtn = document.querySelector(".takePhoto");

  const getVideo = function () {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((localMediaStream) => {
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
      })
      .catch((err) => {
        console.log("WEBCAM ACCESS DENIED", err);
      });
  };

  let redEff = false;
  let rgbSplitEff = false;

  const paintToCanvas = function () {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);

      let pixels = ctx.getImageData(0, 0, width, height);

      if (redEff) {
        pixels = redEffect(pixels);
      }

      if (rgbSplitEff) {
        pixels = rgbSplit(pixels);
      }

      pixels = greenScreen(pixels);
      ctx.putImageData(pixels, 0, 0);
    }, 0.16);
  };

  const takePhoto = function () {
    snap.currentTime = 0;
    snap.play();

    // take the data out of canvas
    const data = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", "handsome");
    link.innerHTML = `<img src=${data} alt="snapshot" />`;
    strip.insertBefore(link, strip.firstChild);
  };

  const redEffect = function (pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i + 0] = pixels.data[i + 0] + 100; //red
      pixels.data[i + 1] = pixels.data[i + 1] - 50; //green
      pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //blue
    }

    return pixels;
  };

  const rgbSplit = function (pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i - 150] = pixels.data[i + 0]; //red
      pixels.data[i + 100] = pixels.data[i + 1]; //green
      pixels.data[i - 150] = pixels.data[i + 2]; //blue
    }

    return pixels;
  };

  const greenScreen = function (pixels) {
    const levels = {};

    document.querySelectorAll(".rgb input").forEach((input) => {
      levels[input.name] = input.value;
    });

    for (let i = 0; i < pixels.data.length; i += 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];

      if (
        red >= levels.rmin &&
        green >= levels.gmin &&
        blue >= levels.bmin &&
        red <= levels.rmax &&
        green <= levels.gmax &&
        blue <= levels.bmax
      ) {
        pixels.data[i + 3] = 0;
      }
    }
    return pixels;
  };

  getVideo();

  video.addEventListener("canplay", paintToCanvas);
  takePhotoBtn.addEventListener("click", takePhoto);
  redEffBtn.addEventListener("click", () => {
    redEff = !redEff;
  });
  rgbEffBtn.addEventListener("click", () => {
    rgbSplitEff = !rgbSplitEff;
  });
});
