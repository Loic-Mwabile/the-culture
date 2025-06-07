let allCards = [];
let unseenCards = [];
let history = [];
let currentIndex = -1;

// Load cards from JSON
async function loadCards() {
  const res = await fetch('data/hypotheticals.json');
  allCards = await res.json();
  resetDeck();
  nextCard();
}

// Reset deck when all cards have been shown
function resetDeck() {
  unseenCards = [...allCards];
  shuffleArray(unseenCards);
  history = [];
  currentIndex = -1;
}

// Show a new card
function nextCard() {
  if (unseenCards.length === 0) {
    alert("All cards viewed! Resetting the deck.");
    resetDeck();
  }

  const card = unseenCards.pop();
  history.push(card);
  currentIndex = history.length - 1;
  displayCard(card);
}

// Go back to previous card
function previousCard() {
  if (currentIndex > 0) {
    currentIndex--;
    displayCard(history[currentIndex]);
  } else {
    alert("No previous card!");
  }
}

// Display a card on screen
function displayCard(text) {
  document.getElementById('card').textContent = text;
}

// Like a card (simple feedback for now)
function likeCard() {
  alert("❤️ You liked this one!");
}

// Save card to localStorage
function saveCard() {
  const currentCard = history[currentIndex];
  let saved = JSON.parse(localStorage.getItem("savedCards")) || [];
  if (!saved.includes(currentCard)) {
    saved.push(currentCard);
    localStorage.setItem("savedCards", JSON.stringify(saved));
    alert("💾 Saved!");
  } else {
    alert("Already saved!");
  }
}

// Shuffle helper function
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Event listeners
loadCards();
