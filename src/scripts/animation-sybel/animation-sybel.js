const cardSybel = document.querySelector(".card-sybel");
const timer = document.querySelector(".timer");
const progressBar = document.querySelector(".progress");
const lottiePlayer = document.getElementById("soundwave-player");
const playIcon = document.querySelector(".play-icon");
const pauseIcon = document.querySelector(".pause-icon");
const backwardIcon = document.querySelector(".backward-15s-icon");
const forwardIcon = document.querySelector(".forward-30s-icon");

const totalTime = 210;
let timeSpent = 42;
let countdownInterval;

let isFirstLaunch = true;
let isCountdownRunning = false;
let isPauseHovered = false;
let isForwardHovered = false;
let isBackwardHovered = false;

timer.textContent = formatTime(timeSpent);

function formatTime(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function countdown() {
	countdownInterval = setInterval(() => {
		if (timeSpent <= totalTime) {
			timer.textContent = formatTime(timeSpent);
			const progress = (timeSpent / totalTime) * 100;
			progressBar.style.width = `${progress}%`;
			timeSpent++;
		} else {
			clearInterval(countdownInterval);
			resetCountdown();
		}
	}, 1000);
}

function startCountdown() {
	if (isFirstLaunch) {
		countdown();
		isFirstLaunch = false;
		isCountdownRunning = true;
	} else if (!isCountdownRunning) {
		timeSpent = 0;
		progressBar.style.width = "0%";
		countdown();
		isCountdownRunning = true;
	} else {
		countdown();
	}
}

function resetCountdown() {
	timeSpent = 0;
	progressBar.style.width = "0%";
	isCountdownRunning = false;
	isCountdownPaused = false;
	startCountdown();
}

function updateProgressBar() {
	progress = (timeSpent / totalTime) * 100;
	progressBar.style.width = `${
		progress > 100 ? 100 : progress < 0 ? 0 : progress
	}%`;
}

function togglePlayPause() {
	if (isPlaying) {
		playIcon.classList.add("hidden");
		pauseIcon.classList.remove("hidden");
	} else {
		playIcon.classList.remove("hidden");
		pauseIcon.classList.add("hidden");
	}
}

cardSybel.addEventListener("mouseenter", () => {
	isPlaying = true;
	togglePlayPause()
	lottiePlayer.play();
	progressBar.style.background = "#FFFFFF";
	startCountdown();
});

cardSybel.addEventListener("mouseleave", () => {
	isPlaying = false;
	togglePlayPause()
	lottiePlayer.pause();
	progressBar.style.background = "#6F6F6F";
	clearInterval(countdownInterval);
});


forwardIcon.addEventListener("mouseover", () => {
	if (!isForwardHovered) {
		isForwardHovered = true;
		timeSpent += 30;
		if (timeSpent > totalTime) {
			timeSpent = totalTime;
		}
		updateProgressBar();
		setTimeout(() => {
			isForwardHovered = false;
		}, 2000);
	}
});

backwardIcon.addEventListener("mouseover", () => {
	if (!isBackwardHovered) {
		isBackwardHovered = true;
		timeSpent -= 15;
		if (timeSpent < 0) {
			timeSpent = 0;
		}
		updateProgressBar();
		setTimeout(() => {
			isBackwardHovered = false;
		}, 2000);
	}
});
