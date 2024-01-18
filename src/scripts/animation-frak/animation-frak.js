const cardFrak = document.querySelector(".card-frak");
const balanceTotal = document.querySelector(".balance-total");
const earningsText = document.querySelector(".earnings");
const totalEarned = document.querySelector(".total-earned");
const appIsActiveIcon = document.querySelector(".frak-isactive-icon path");

let balanceValue = parseFloat(balanceTotal.textContent.replace(/\s/g, ""));
let earningsValue = parseFloat(totalEarned.textContent.replace(/\s/g, ""));
let intervalCountEarnings;

function formatNumber(number) {
  return Number(number).toLocaleString("en-US", { minimumFractionDigits: 2 });
}

function countEarnings() {
  intervalCountEarnings = setInterval(function () {
    balanceValue += 0.01;
    earningsValue += 0.01;

    balanceTotal.textContent = formatNumber(balanceValue);
    totalEarned.textContent = formatNumber(earningsValue);
  }, 150);
}

function handleVisibilityChange() {
  if (document.hidden) {
    clearInterval(intervalCountEarnings);
    appIsActiveIcon.style.fill = "#FF0000";
    earningsText.style.color = "#818c9c";
  } else if (cardFrak.matches(':hover')) {
    countEarnings();
    appIsActiveIcon.style.fill = "#00E617";
    earningsText.style.color = "#00E617";
  }
}

cardFrak.addEventListener("mouseenter", function () {
  countEarnings();
  appIsActiveIcon.style.fill = "#00E617";
  earningsText.style.color = "#00E617";
});

cardFrak.addEventListener("mouseleave", function () {
  clearInterval(intervalCountEarnings);
  appIsActiveIcon.style.fill = "#FF0000";
  earningsText.style.color = "#818c9c";
});

document.addEventListener("visibilitychange", handleVisibilityChange);
