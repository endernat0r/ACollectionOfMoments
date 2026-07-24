const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    if (textNodeIndex === 4 || textNodeIndex === 5 || textNodeIndex === 7) {
    startSnow();
  } else {
    stopSnow();
  }
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })

  const sliderScreen = document.getElementById('slider-screen');

  if (textNodeIndex === 14) {
    storyContainer.style.display = 'none';
    sliderScreen.style.display = 'flex';
  } else {
    storyContainer.style.display = 'block';
    if (sliderScreen) sliderScreen.style.display = 'none';
  }
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  if (option.action) {
    option.action();
    if (!option.nextText) return; 
  }
  
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  
  state = Object.assign(state, option.setState || {});
  showTextNode(nextTextNodeId);
}

function triggerMagicEffect() {
  const overlay = document.getElementById('magic-overlay')
  const body = document.body

  overlay.classList.add('magic-active')
  body.classList.add('shake-active')

  setTimeout(() => {
    overlay.classList.remove('magic-active')
    body.classList.remove('shake-active')
  }, 2000)
}

function startSnow() {
  const container = document.getElementById('snow-container');
  
  if (container.children.length > 0) return; 

  const random = (num) => Math.floor(Math.random() * num);

  for (let i = 0; i < 50; i++) {
    const flake = document.createElement('div');
    flake.classList.add('snowflake');
    
    flake.style.cssText = `
      --left: ${random(100)}vw; 
      --left-ini: ${random(20) - 10}vw; 
      --left-end: ${random(20) - 10}vw; 
      --speed: ${5 + random(15)}s;
      --size: ${random(5) * 0.2}vw; 
      --delay: -${random(15)}s;
    `;
    
    container.appendChild(flake);
  }
}

function stopSnow() {
  document.getElementById('snow-container').innerHTML = '';
}

const track = document.getElementById('myTrack');
const button = document.getElementById('musicButton');

button.addEventListener('click', () => {
  if (track.paused) {
    track.play();
    button.classList.add('paused');
  }
  else {
    track.pause();
    button.classList.remove('paused');
  }
});

const storyContainer = document.querySelector('.container'); 
const whackAMoleContainer = document.getElementById('whack-a-mole-game');
const holes = document.querySelectorAll(".hole");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

let whackScore = 0;
let whackTimer = 15;
let countdownInterval;
let moleInterval;
let isMinigameActive = false;

holes.forEach(hole => {
    hole.addEventListener('click', function() {
        if (isMinigameActive && this.classList.contains('mole')) {
            whackScore++;
            scoreDisplay.textContent = `Score: ${whackScore}`;
            this.classList.remove('mole');
        }
    });
});

function randomMoleComeOut() {
    holes.forEach(hole => hole.classList.remove('mole'));
    let randomHole = holes[Math.floor(Math.random() * 9)];
    randomHole.classList.add('mole');
}

function startWhackAMoleMinigame() {
    storyContainer.style.display = 'none';
    whackAMoleContainer.style.display = 'block';

    isMinigameActive = true;
    whackScore = 0;
    whackTimer = 15;
    scoreDisplay.textContent = `Score: ${whackScore}`;
    timerDisplay.textContent = `Time: ${whackTimer}s`;

    countdownInterval = setInterval(() => {
        whackTimer--;
        timerDisplay.textContent = `Time: ${whackTimer}s`;

        if (whackTimer <= 0) {
            endWhackAMoleMinigame();
        }
    }, 1000);

    moleInterval = setInterval(() => {
        if (isMinigameActive) randomMoleComeOut();
    }, 500);
}

function endWhackAMoleMinigame() {
    isMinigameActive = false;
    clearInterval(countdownInterval);
    clearInterval(moleInterval);
    holes.forEach(hole => hole.classList.remove('mole'));

    whackAMoleContainer.style.display = 'none';
    storyContainer.style.display = 'block';

    if (whackScore >= 15) {
        showTextNode(11); 
    } else {
        showTextNode(12); 
    }
}

const slider = document.getElementById("myRange");
const sliderText = document.getElementById("slider-text");

slider.oninput = function() {
  let val = parseInt(this.value);
  
  if (val < 25) {
    sliderText.innerText = "Starting the intro";
  } else if (val < 50) {
    sliderText.innerText = "Presenting";
  } else if (val < 75) {
    sliderText.innerText = "The delegate convincing the AI";
  } else if (val < 100) {
    sliderText.innerText = "Getting a million claps";
  } else if (val === 100) {
    sliderText.innerText = "Publishing papers and getting featured in school instagram";
  }
}

function endSlider() {
  document.getElementById('slider-screen').style.display = 'none';
  showTextNode(15);
}

var cpsScore; 
var cpsDuration = 5; 
var cpsStartTime; 
var cpsEnded = true; 

var timerTxt = document.getElementById("cps-timer");
var scoreTxt = document.getElementById("cps-score");
var clicksTxt = document.getElementById("cps-cps");
var startBtn = document.getElementById("cps-start");
var clickArea = document.getElementById("cps-clickarea");

var show = function(elem) { elem.style.display = 'inline'; };
var hide = function(elem) { elem.style.display = 'none'; };

function startClickSpeedGame() {
  hide(startBtn);
  cpsScore = -1; 
  cpsEnded = false;
  
  cpsStartTime = new Date().getTime();
  
  var timerId = setInterval(function() {
    var total = (new Date().getTime() - cpsStartTime) / 1000;
    
    if (total < cpsDuration) {
      timerTxt.textContent = total.toFixed(3);
      clicksTxt.textContent = (cpsScore / total).toFixed(2);
    } else {
      cpsEnded = true;
      clearInterval(timerId);
      endClickSpeedGame();
    }
  }, 1);
}

startBtn.addEventListener("click", function(e) {
  startClickSpeedGame();
});

clickArea.addEventListener("click", function(e) {
  if (!cpsEnded) {
    cpsScore++;
    scoreTxt.textContent = cpsScore;
  }
});

function launchClickSpeedMinigame() {
  document.querySelector('.container').style.display = 'none';
  document.getElementById('cps-minigame-wrapper').style.display = 'block';
  document.getElementById('cps-start').style.display = 'inline';
  document.getElementById('cps-score').textContent = '0';
  document.getElementById('cps-timer').textContent = '0.000';
  document.getElementById('cps-cps').textContent = '0.00';
}

function endClickSpeedGame() {
  var clicsBySeconds = (cpsScore / cpsDuration).toFixed(2);
  timerTxt.textContent = cpsDuration.toFixed(3);
  clicksTxt.textContent = clicsBySeconds;
  
  show(startBtn);
  
  setTimeout(function() {
    alert('You made ' + cpsScore + ' clicks in ' + cpsDuration + ' seconds. It is ' + clicsBySeconds + ' clicks by seconds.');
    
    document.getElementById('cps-minigame-wrapper').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    
    if (cpsScore >= 25) {
        showTextNode(17);
    } else {
        showTextNode(18);
    }
  }, 10);
}

var wordleBoard = document.getElementById('wordle-gameBoard');
var wordleInput = document.getElementById('wordle-guessInput');
var wordleBtn = document.getElementById('wordle-guessButton');
var wordleStageText = document.getElementById('wordle-stage-text');

var wordleWordsList = ['happy', 'birth'];
var currentWordIndex = 0;
var wordleInputs = [];
var wordleResults = [];

function initWordleBoard() {
  wordleBoard.innerHTML = ''; 
  for (let i = 0; i < 30; i++) { 
      let cell = document.createElement('div');
      cell.classList.add('wordle-cell');
      wordleBoard.appendChild(cell);
  }
}

function launchWordleMinigame() {
  document.querySelector('.container').style.display = 'none';
  document.getElementById('wordle-minigame-wrapper').style.display = 'block';
  currentWordIndex = 0;
  wordleInputs = [];
  wordleResults = [];
  wordleInput.value = '';
  wordleStageText.innerText = "Word 1 of 2";
  initWordleBoard();
}

function checkWordleGuessLocal(guess, target) {
  let result = ["-", "-", "-", "-", "-"];
  let targetArr = target.split('');
  let guessArr = guess.split('');
  
  for(let i=0; i<5; i++) {
      if(guessArr[i] === targetArr[i]) {
          result[i] = "+";
          targetArr[i] = null; 
      }
  }
  for(let i=0; i<5; i++) {
      if(result[i] === "-") {
          let index = targetArr.indexOf(guessArr[i]);
          if(index > -1) {
              result[i] = "x";
              targetArr[i] = null;
          }
      }
  }
  return result;
}

function refreshWordleGame() {
  const cells = wordleBoard.getElementsByClassName('wordle-cell');
  for (let i = 0; i < 30; i++) {
      let cell = cells[i];
      let y = Math.floor(i / 5);
      let x = i - y * 5;
      
      cell.className = 'wordle-cell';
      cell.textContent = '';
      
      if(wordleInputs.length > y && wordleInputs[y][x]) {
          const result = wordleResults[y][x] === "+" ? "correct" : wordleResults[y][x] === "x" ? "semi-correct" : "incorrect";
          cell.textContent = wordleInputs[y][x].toUpperCase();
          cell.classList.add(result);
      }
  }
}

wordleBtn.addEventListener('click', function() {
  let guess = wordleInput.value.toLowerCase();
  if (guess.length === 5) {
      let targetWord = wordleWordsList[currentWordIndex];
      let res = checkWordleGuessLocal(guess, targetWord);
      
      wordleInputs.push(guess);
      wordleResults.push(res);
      wordleInput.value = "";
      refreshWordleGame();
      
      if (guess === targetWord) {
          setTimeout(function() {
              if (currentWordIndex === 0) {
                  alert("Good job! Now for the second word.");
                  currentWordIndex++;
                  wordleInputs = [];
                  wordleResults = [];
                  wordleStageText.innerText = "Word 2 of 2";
                  initWordleBoard();
              } else {
                  alert("You did it bro! 'HAPPY BIRTHDAY'!");
                  document.getElementById('wordle-minigame-wrapper').style.display = 'none';
                  document.querySelector('.container').style.display = 'block';
                  showTextNode(26);
              }
          }, 500);
      } else if (wordleInputs.length >= 6) {
          setTimeout(function() {
              alert("Game Over! The word was " + targetWord.toUpperCase());
              document.getElementById('wordle-minigame-wrapper').style.display = 'none';
              document.querySelector('.container').style.display = 'block';
              showTextNode(27);
          }, 500);
      }
      
  } else {
      alert('Please enter a 5-letter word.');
  }
});


const textNodes = [
  {
    id: 1,
    text: 'You wake up in your dorm bed and suddenly a strange noise startles you.',
    options: [
      {
        text: 'Investigate the noise',
        setState: { blueGoo: true },
        nextText: 3
      },
      {
        text: 'Sleep',
        nextText: 2
      },
      {
        text: 'Developer button (for testing)',
        nextText: 20
      }
    ]
  },
  {
    id: 2,
    text: 'You fall back asleep and have a great dream in which you are a famous actor playing jackyll and hyde on broadway.',
    options: [
        {text: 'Restart', nextText: -1}
    ]
  },
  {
    id: 3,
    text: 'A magical door appears. You hesitantly touch it and get pulled into a an adventure trough time!',
    options: [
        {text: 'WHAT IS HAPPENING?', action: triggerMagicEffect, nextText: 4}
    ]
  },
  {
    id: 4,
    text: 'You are pulled into somewhere and you found out that you are like a ghost. When you look down you see a 2 years younger yourself and Celal going somewhere. You decide to follow them and see what they are up to.',
    options: [
        {text: 'Follow them', nextText: 5}
    ]
  },
  {
    id: 5,
    text: 'You follow them and see that they are going to the Polar Festival. You decide to follow them and see what they are up to.',
    options: [
        {text: 'Try to exit the place', nextText: 6},
        {
            text: 'Watch them from a distance',
            requiredState: (currentState) => !currentState.clickStep, 
            setState: { clickStep: 1 },
            nextText: 5
        },
        {
            text: 'Listen to them',
            requiredState: (currentState) => currentState.clickStep === 1,
            setState: { clickStep: 2 },
            nextText: 5
        },
        {
            text: 'Understand the situation',
            requiredState: (currentState) => currentState.clickStep === 2,
            setState: { clickStep: 3 },
            nextText: 5
        },
        {
            text: 'Your are now wise.',
            customClass: 'btn-green',
            requiredState: (currentState) => currentState.clickStep === 3,
            setState: { wise: true },
            nextText: 7
        }
    ]
  },
  {
    id: 6,
    text: 'You couldnt exit and lost sight of them. You hurry back to them.',
    options: [
        {text: 'Damn', nextText: 7}
    ]
  },
  {id: 7,
    text: 'Üstat comes and asks you what they did to move on.',
    options: [
        {
            text: 'Oh no I forgot to watch them',
            requiredState: (currentState) => !currentState.wise,
            nextText: 8
        },
        {
            text: 'Oh yeah I remember everything',
            requiredState: (currentState) => currentState.wise === true,
            nextText: 9
        }
    ]
  },
  {
    id: 8,
    text: 'Üstat is disappointed and sends you back to watch them again.',
    options: [
        {text: 'No Üstat pleaseeeee', nextText: 5}
    ]
  },
  {
    id: 9,
    text: 'Üstat is pleased and treats you to a döner and künefe.',
    options: [
        {text: '🎉Thank you Üstat🎉', nextText: 10}
    ]
  },
  {
    id: 10,
    text: 'You find yourself at the audition for the english performance arts club. You have to select students very fast!',
    options: [
      {
        text: 'Start Audition (Minigame)',
        action: startWhackAMoleMinigame
      }
    ]
  },
  {
    id: 11,
    text: 'Ömer: "Magnificent! I found a ton of amazing people!"',
    options: [
      { text: 'Be happy and go into another memory', nextText: 13 }
    ]
  },
  {
    id: 12,
    text: 'Ömer: "Too slow! These people are trash. You are rejected!"',
    options: [
      { text: 'Try Audition Again', action: startWhackAMoleMinigame },
      { text: 'Restart The Whole Adventure (Dont do that)', nextText: -1 }
    ]
  },
  {
    id: 13,
    text: 'You find yourself presenting a workshop in Düsseldorf, Germany.',
    options: [
      { text: 'Continue', nextText: 14 }
    ]
  },
  {
    id: 14,
    text: 'This is a bug. You should not be here.',
    options: [
      { text: 'The End', nextText: -1 }
    ]
  },
  {
    id: 15,
    text: 'You succesfully presented the workshop! You get sucked into the Tokyo Town streets.',
    options: [
      { text: 'Please gimme some takoyaki or red bean paste buns.', nextText: 16 }
    ]
  },
  {
    id: 16,
    text: 'You are now in the streets! But the shops are closing and you dont have much time!',
    options: [
      { text: 'SMASH THOSE BUTTONS', action: launchClickSpeedMinigame}
    ]
  },
  {
    id: 17,
    text: 'You used AI to create a program and followed it to do everything the streets had to offer (Even the vanilla takoyaki)!',
    options: [
      {text: 'You go onto Macaristan and see youself with Ecrin presenting your paper', nextText: 19}
    ]
  },
  {
    id: 18,
    text: 'You were NOT able to experience everything the streets had to offer. ',
    options: [
      { text: 'Try again', nextText: 16}
    ]
  },
  {
    id: 19,
    text: 'In the paper there are a ton of words, which do you choose to highlight?',
    options: [
      { text: 'Highlight the introduction', nextText: 20 },
      { text: 'Highlight the body', nextText: 15 },
      { text: 'Highlight the conclusion', nextText: 15 }
    ]
  },
  {
    id: 20,
    text: 'Yea the other answers are just shitpost. If you answered wrongly you would be a dummy but thank god you know literature thanks to a vegan. Also I sent you back in time a bit if you clicked the wrong answer but I dont think there is a problem with it, you DEFINITELY didnt choose those so no problem',
    options: [
      { text: 'So know what?', nextText: 21 }
    ]
  },
  {
    id: 21,
    text: 'Dunno',
    options: [
      { text: 'The heck, I aint the one writing this adventure, you are. Gimme something to play!', nextText: 22}
    ]
  },
  {
    id: 22,
    text: 'No',
    options: [
      { text: 'If you dont I am gonna add 5 minutes...', nextText: 23}
    ]
  },
  {
    id: 23,
    text: 'OK DAMMIT WAIT A SEC PLEASE PLEASE I AM SURE THERE IS SOMETHING FOR YOU HERE!!!!',
    options: [
      { text: 'Thats more like it... >:)', nextText: 24}
    ]
  },
  {
    id: 24,
    text: 'Ok so I found a wordle, maybe you can play that.... just dont add minutes pleassseeeeeeee',
    options: [
      { text: 'Ok I will forgive you just this once...', nextText: 25}
    ]
  },
  {
    id: 25,
    text: 'Ok here are some wordles. You have to solve both words to proceed.',
    options: [
      { text: 'Play Wordle', action: launchWordleMinigame }
    ]
  },
  {
    id: 26,
    text: 'HAPPY BIRTHDAYYYYYY!',
    options: [
      { text: 'Finish the adventure', nextText: -1 }
    ]
  },
  {
    id: 27,
    text: 'You failed to guess the words. The screen locks up!',
    options: [
      { text: 'Try Wordle again', action: launchWordleMinigame },
      { text: 'Give up', nextText: -1 }
    ]
  }
]

startGame()