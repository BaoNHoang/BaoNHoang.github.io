const videoSources = [
    "videos/waterfall2.mp4",
    "videos/bubble.mp4",
    "videos/rain.mp4",
    "videos/desert.mp4"
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
        console.error("Could not find video element with id='myVideo'.");
        return;
    }

    const nextVideo = getNextRandomVideo();

    videoElement.src = nextVideo;
    videoElement.load();

    videoElement.play().catch((error) => {
        console.error("Video autoplay failed:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const videoElement = document.getElementById("myVideo");

    if (!videoElement) {
        console.error("Could not find video element with id='myVideo'.");
        return;
    }

    changeVideo();

    videoElement.addEventListener("ended", changeVideo);
});