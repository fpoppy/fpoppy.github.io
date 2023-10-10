var states = ['idle', 'pet', 'boop', 'chest', 'answer'];
var currentState = states[0];

var petArea = document.querySelector('#petArea');
var boopArea = document.querySelector('#boopArea');
var chestArea = document.querySelector('#chestArea');
var poppyImage = document.querySelector('#poppyImage');

var mouseOffset = 10;

// as long as we're in idle, run blink 
// loop blink with random interval
// do the image changes with setTimeout

var blinkingTimeout;
function blinking() {
	var rand = Math.floor(Math.random() * 3 + 2);
	blinkingTimeout = setTimeout(() => {
		if (currentState != states[0]) {
			clearTimeout(blinkingTimeout);
			return;
		}

		blinking();
		blink();
	}, rand * 1000);
}

var blinkTimeout;
function blink() {
	blinkTimeout = setTimeout(() => {
		if (currentState != states[0]) {
			clearTimeout(blinkTimeout);
			return;
		}

		poppyImage.src = './poppy/blink.png';
		blinkTimeout = setTimeout(() => {
			if (currentState != states[0]) {
				clearTimeout(blinkTimeout);
				return;
			}

			poppyImage.src = './poppy/idle.png'
		}, 50);
	}, 50);
}

// immediatly start blinking
blinking();

// set state to idle and start blinking
function stateToIdle() {
	clearTimeout(blinkingTimeout);
	currentState = states[0];
	poppyImage.src = './poppy/idle.png'
	blinking();
}

// pet state
petArea.addEventListener('mousedown', () => {
	if (currentState == states[0])
	{
		currentState = states[1]; // set state to pet
	
		poppyImage.src = './poppy/pet_center.png';
	}
});

// chest state
chestArea.addEventListener('mousedown', () => {
	if (currentState == states[0]) {
		poppyImage.src = './poppy/chest.png';
		currentState = states[3];
	}
});

document.addEventListener('mousemove', (e) => {
	if (currentState == states[1]) {
		var rect = petArea.getBoundingClientRect();
		var x = e.clientX - rect.left - rect.width / 2 + mouseOffset;

		if (x > 30) {
			//petArea.style.backgroundColor = 'blue';
			poppyImage.src = './poppy/pet_right.png';
		}
		else if (x <= 30 && x >= -30) {
			//petArea.style.backgroundColor = 'green';
			poppyImage.src = './poppy/pet_center.png';
		}
		else if (x < -30) {
			//petArea.style.backgroundColor = 'yellow';
			poppyImage.src = './poppy/pet_left.png';
		}
	}
	else if (currentState == states[3]) {
		var rect = chestArea.getBoundingClientRect();
		var x = e.clientX - rect.left - rect.width / 2 + mouseOffset;

		if (x > 10) {
			//petArea.style.backgroundColor = 'blue';
			poppyImage.src = './poppy/chest_right.png';
		}
		else if (x <= 10 && x >= -10) {
			//petArea.style.backgroundColor = 'green';
			poppyImage.src = './poppy/chest_center.png';
		}
		else if (x < -10) {
			//petArea.style.backgroundColor = 'yellow';
			poppyImage.src = './poppy/chest_left.png';
		}
	}
});

document.addEventListener('mouseup', () => {
	if (currentState == states[1] || currentState == states[3]) {
		stateToIdle();
	}
});

// boop state
boopArea.addEventListener('mousedown', () => {
	//boopArea.style.backgroundColor = 'blue';
	if (currentState == states[0])
	{
		poppyImage.src = './poppy/boop.png';
		currentState = states[2];
	}
});

boopArea.addEventListener('mouseup', ()=> {
	if (currentState == states[2]) {	
		stateToIdle();
	}
});

boopArea.addEventListener('mouseleave', () => {
	if (currentState == states[2]) {
		stateToIdle();
	}
});

// answer state
var questionDivs = document.querySelectorAll('.question');
questionDivs.forEach(elem => {
	elem.addEventListener('click', () => {
		if (currentState != states[0]) return;
		currentState = states[4];
		poppyImage.src = './poppy/answer.gif';

		setTimeout(() => {
			stateToIdle();
		}, 2750);
	})
});