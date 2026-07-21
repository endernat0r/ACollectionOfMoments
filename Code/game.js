const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    if (textNodeIndex === 4) {
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
  }, 1200)
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
    text: 'You are pulled into somewhere and you found out that you are like a ghost. When you look down you see a 2 years younger yourself and Celal going through the Polar Festival'
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