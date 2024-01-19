document.addEventListener("DOMContentLoaded", function () {
	var activeSuCard = document.querySelector(".active-card");
	var cardKinov = document.querySelector(".card-kinov");
	var activeZone = document.querySelector(".kinov-container");
	var dropZone = document.querySelector(".drop-zone");

	function moveCard(event) {
		var cardRect = activeSuCard.getBoundingClientRect();
		var activeZoneRect = activeZone.getBoundingClientRect();

		var mouseX = event.clientX;
		var mouseY = event.clientY;

		var newPositionX = mouseX - cardRect.width / 2;
		var newPositionY = mouseY - cardRect.height / 2;

		newPositionX = Math.max(
			activeZoneRect.left,
			Math.min(newPositionX, activeZoneRect.right - cardRect.width)
		);
		newPositionY = Math.max(
			activeZoneRect.top,
			Math.min(newPositionY, activeZoneRect.bottom - cardRect.height)
		);

		activeSuCard.style.left = newPositionX - activeZoneRect.left + "px";
		activeSuCard.style.top = newPositionY - activeZoneRect.top + "px";
	}

	cardKinov.addEventListener("mousemove", function (event) {
		dropZone.style.display = "block";
		activeSuCard.style.position = "absolute";
		moveCard(event);
	});

	cardKinov.addEventListener("mouseleave", function (event) {
		activeSuCard.style.position = "static";
		dropZone.style.display = "none";
	});
});