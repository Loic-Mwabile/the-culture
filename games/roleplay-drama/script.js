let allScenes = [];
let shuffledDeck = [];
let currentIndex = 0;
let history = [];
let saved = [];
const startSound = document.getElementById("start-sound");
const timeoutSound = document.getElementById("timeout-sound");

async function loadCards() {
  const res = await fetch("data/scenes.json");
  allScenes = await res.json();
  resetDeck();
  showCard();
}

function resetDeck() {
  shuffledDeck = [...allScenes].sort(() => Math.random() - 0.5);
  currentIndex = 0;
  history = [];
}

function showCard() {
  const card = shuffledDeck[currentIndex];
  document.getElementById("scene-text").textContent = card.scene;
  document.getElementById("role1").textContent = `🎭 Role 1: ${card.roles[0]}`;
  document.getElementById("role2").textContent = `🎭 Role 2: ${card.roles[1]}`;

  if (!history.includes(currentIndex)) history.push(currentIndex);
}

function nextCard() {
  currentIndex++;
  if (currentIndex >= shuffledDeck.length) {
    alert("All scenes done! Restarting...");
    resetDeck();
  }
  showCard();
}

function prevCard() {
  if (history.length > 1) {
    history.pop(); // remove current
    currentIndex = history[history.length - 1]; // go back
    showCard();
  }
}

function saveCard() {
  const card = shuffledDeck[currentIndex];
  if (!saved.includes(card)) {
    saved.push(card);
    const li = document.createElement("li");
    li.textContent = `${card.scene} — (${card.roles[0]} & ${card.roles[1]})`;
    document.getElementById("savedList").appendChild(li);
    document.getElementById("saved").classList.remove("hidden");
  }
}

window.onload = loadCards;

let countdownInterval;

function startCountdown() {
  startSound.play();
  let timeLeft = 60;
  const countdownEl = document.getElementById("countdown");
  countdownEl.textContent = `⏱️ ${timeLeft}s`;

  clearInterval(countdownInterval); // reset if already running

  countdownInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      countdownEl.textContent = "🎭 Scene Over!";
      timeoutSound.play();
    } else {
      countdownEl.textContent = `⏱️ ${timeLeft}s`;
    }
  }, 1000);
}

function resetCountdown() {
  clearInterval(countdownInterval);
  document.getElementById("countdown").textContent = "⏱️ 60s";
}

