/*
GAME RULES:

1. The game has 2 players, playing in rounds
2.In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
3.BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
4.The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
5.The first player to reach 100 points on GLOBAL score wins the game
6. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. 
*/
let scores, roundScores, activePlayer, gamePlaying, previousDice;

init();

document.querySelector("#score-0").textContent = 0;
document.querySelector("#score-1").textContent = 0;
document.querySelector("#current-0").textContent = 0;
document.querySelector("#current-1").textContent = 0;
document.querySelector(".dice").style.display = "none";

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    let dice;
    dice = Math.floor(Math.random() * 6) + 1;
    let diceDOM = document.querySelector(".dice");

    console.log("dice:", dice);
    console.log("previous:", previousDice);
    diceDOM.src = `dice-${dice}.png`;

    if (dice === 1) {
      nextPlayer();
    } else if (dice === 6 && previousDice === 6) {
      scores[activePlayer] = 0;
      document.querySelector(`#score-${activePlayer}`).textContent =
        scores[activePlayer];
      nextPlayer();
    } else {
      previousDice = dice;
      diceDOM.style.display = "block";
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    previousDice = 0;
    scores[activePlayer] += roundScore;
    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document.querySelector(`#name-${activePlayer}`).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  previousDice = 0;
  roundScore = 0;
  document.querySelector("#current-" + activePlayer).textContent = roundScore;
  activePlayer = (activePlayer + 1) % 2;
  document.querySelector(`.player-0-panel`).classList.toggle("active");
  document.querySelector(`.player-1-panel`).classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", function() {
  init();
});

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  previousDice = 0;

  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#score-1").textContent = 0;
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector(".dice").style.display = "none";

  document.querySelector(`#name-0`).textContent = "Player 1";
  document.querySelector(`#name-1`).textContent = "Player 2";

  document.querySelector(`.player-0-panel`).classList.remove("active");
  document.querySelector(`.player-1-panel`).classList.remove("active");
  document.querySelector(`.player-0-panel`).classList.add("active");
  document.querySelector(`.player-0-panel`).classList.remove("winner");
  document.querySelector(`.player-1-panel`).classList.remove("winner");
}
