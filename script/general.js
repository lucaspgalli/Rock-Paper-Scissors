let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId; 

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
  
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
})

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
})

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
})

document.body.addEventListener('keydown', () => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'Você perdeu.';
    } else if (computerMove === 'paper') {
      result = 'Você venceu.';
    } else if (computerMove === 'scissors') {
      result = 'Empate.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'Você venceu.';
    } else if (computerMove === 'paper') {
      result = 'Empate.';
    } else if (computerMove === 'scissors') {
      result = 'Você perdeu.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Empate.';
    } else if (computerMove === 'paper') {
      result = 'Você perdeu.';
    } else if (computerMove === 'scissors') {
      result = 'Você venceu.';
    }
  }

  if (result === 'Você venceu.') {
    score.wins += 1;
  } else if (result === 'Você perdeu.') {
    score.losses += 1;
  } else if (result === 'Empate.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = 
  `Você <img src="./assets/images/${playerMove}-emoji.png" class="move-icon">
  <img src="./assets/images/${computerMove}-emoji.png" class="move-icon"> Computador`;
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = 
  `Vitórias: ${score.wins}, Derrotas: ${score.losses}, Empates: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if(randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

