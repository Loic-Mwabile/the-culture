let scenarios = [];
let currentIndex = 0;

async function loadScenarios() {
  const res = await fetch('scenarios.json');
  scenarios = await res.json();
  shuffle(scenarios);
  showScenario();
}

function showScenario() {
  const scenario = scenarios[currentIndex];
  document.getElementById('scenario-text').innerText = scenario.scenario;
  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = "";
  scenario.options.forEach(option => {
    const btn = document.createElement('button');
    btn.innerText = option;
    btn.onclick = () => alert(`You picked: ${option}`);
    optionsContainer.appendChild(btn);
  });
}

document.getElementById('next-btn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % scenarios.length;
  showScenario();
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

loadScenarios();
