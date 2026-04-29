const videoSources = [
    "./videos/waterfall2.mp4",
    "./videos/bubble.mp4",
    "./videos/rain.mp4",
    "./videos/desert.mp4"
];

function getNextRandomVideo() {
    const lastPlayedIndex = Number(sessionStorage.getItem("lastPlayedIndex"));

    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * videoSources.length);
    } while (randomIndex === lastPlayedIndex && videoSources.length > 1);

    sessionStorage.setItem("lastPlayedIndex", randomIndex);

    return videoSources[randomIndex];
}

function changeVideo() {
    const videoElement = document.getElementById("myVideo");

    if (!videoElement) {
        console.error("Video element with id='myVideo' was not found.");
        return;
    }

    const nextVideo = getNextRandomVideo();

    videoElement.src = nextVideo;
    videoElement.load();

    const playPromise = videoElement.play();

    if (playPromise !== undefined) {
        playPromise.catch((error) => {
            console.error("Video failed to autoplay:", error);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const videoElement = document.getElementById("myVideo");

    if (!videoElement) {
        console.error("Video element with id='myVideo' was not found.");
        return;
    }

    changeVideo();

    videoElement.addEventListener("ended", changeVideo);
});