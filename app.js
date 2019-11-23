/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores = [0, 0];
let roundScore = 0;
let activePlayer = 0;

document.querySelector("#score-0").textContent = 0;
document.querySelector("#score-1").textContent = 0;
document.querySelector("#current-0").textContent = 0;
document.querySelector("#current-1").textContent = 0;
document.querySelector(".dice").style.display = "none";
document.querySelector(".btn-roll").addEventListener("click", function() {
  let dice = Math.floor(Math.random() * 6) + 1;
  let diceDOM = document.querySelector(".dice");

  diceDOM.src = `dice-${dice}.png`;

  if (dice !== 1) {
    diceDOM.style.display = "block";
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    roundScore = 0;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    activePlayer = (activePlayer + 1) % 2;
    document.querySelector(`.player-0-panel`).classList.toggle("active");
    document.querySelector(`.player-1-panel`).classList.toggle("active");
    diceDOM.style.display = "none";
  }
});
