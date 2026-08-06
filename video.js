const videoSources = [
    "./videos/waterfall2.mp4",
    "./videos/bubble.mp4",
    "./videos/rain.mp4",
    "./videos/desert.mp4"
];

let failedLoads = 0;

function chooseNextVideo() {
    const previousIndex = Number(sessionStorage.getItem("portfolio-video-index"));
    let nextIndex = Math.floor(Math.random() * videoSources.length);

    if (videoSources.length > 1) {
        while (nextIndex === previousIndex) {
            nextIndex = Math.floor(Math.random() * videoSources.length);
        }
    }

    sessionStorage.setItem("portfolio-video-index", String(nextIndex));
    return videoSources[nextIndex];
}

function playNextVideo(video) {
    video.classList.add("is-changing");
    video.src = chooseNextVideo();
    video.load();

    const playAttempt = video.play();
    if (playAttempt) {
        playAttempt.catch(() => {
            video.classList.remove("is-changing");
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("backgroundVideo");
    if (!video) return;

    video.addEventListener("canplay", () => {
        failedLoads = 0;
        video.classList.remove("is-changing");
    });

    video.addEventListener("ended", () => playNextVideo(video));

    video.addEventListener("error", () => {
        failedLoads += 1;
        if (failedLoads < videoSources.length) {
            playNextVideo(video);
        }
    });

    playNextVideo(video);
});
