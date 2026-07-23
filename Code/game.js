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
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  if (option.action) {
    option.action()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
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
        nextText: 11
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
    // End of Chapter 1
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
  }
]

startGame()

/*
    id: 2,
    text: 'You venture forth in search of answers to where you are when you come across a merchant.',
    options: [
      {
        text: 'Trade the goo for a sword',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Trade the goo for a shield',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Ignore the merchant',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 4
      },
      {
        text: 'Find a room to sleep at in the town',
        nextText: 5
      },
      {
        text: 'Find some hay in a stable to sleep in',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the castle you come across a horrible monster in your path.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack it with your sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Throw the blue goo at it',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and the monster easily catches.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought this monster could be slain with a single sword.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your shield and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
  */