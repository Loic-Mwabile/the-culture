let dilemmas = [];
let currentIndex = 0;
let currentPhase = "A";
let timer;
let timeLeft = 30;
let isTimerRunning = false;
let dilemmaHistory = [];

const startSound = document.getElementById("start-sound");
const timeoutSound = document.getElementById("timeout-sound");

const promptBox = document.getElementById("prompt-box");
const phaseIndicator = document.getElementById("phase-indicator");
const timerDisplay = document.getElementById("timer");

const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const skipPhaseBtn = document.getElementById("skip-phase-btn");
const skipPromptBtn = document.getElementById("skip-prompt-btn");
const prevBtn = document.getElementById("prevBtn");

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Fetch and shuffle dilemmas
fetch("dilemmas.json")
  .then(res => res.json())
  .then(data => {
    dilemmas = shuffleArray(data);
    showPrompt();
  });

// Show current dilemma + update phase and timer UI
function showPrompt() {
  const prompt = dilemmas[currentIndex];
  promptBox.textContent = prompt;
  phaseIndicator.textContent = currentPhase === "A" ? "🕊️ Argue FOR" : "🦂 Argue AGAINST";
  timerDisplay.textContent = "30";
  timeLeft = 30;
  clearInterval(timer);
  isTimerRunning = false;
}

// Start timer with sound
function startTimer() {
  if (isTimerRunning) return;
  startSound.play();
  isTimerRunning = true;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      isTimerRunning = false;
      timeoutSound.play();
    }
  }, 1000);
}

// Reset timer without affecting prompt
function resetTimer() {
  clearInterval(timer);
  isTimerRunning = false;
  timeLeft = 30;
  timerDisplay.textContent = timeLeft;
}

// Switch phase between FOR and AGAINST
function skipPhase() {
  currentPhase = currentPhase === "A" ? "B" : "A";
  showPrompt();
}

// Go to next dilemma, store current in history
function skipPrompt() {
  if (dilemmas.length === 0) return;

  dilemmaHistory.push(currentIndex);
  currentIndex = (currentIndex + 1) % dilemmas.length;
  currentPhase = "A";
  showPrompt();
}

// Go to previous dilemma from history
function previousPrompt() {
  if (dilemmaHistory.length === 0) return;

  currentIndex = dilemmaHistory.pop();
  currentPhase = "A";
  showPrompt();
}

// Button listeners
startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
skipPhaseBtn.addEventListener("click", skipPhase);
skipPromptBtn.addEventListener("click", skipPrompt);
prevBtn.addEventListener("click", previousPrompt);
