var body = document.querySelector('body');
var audio = document.querySelector('#audio');

var activeCursor = 0;
var cursors = ['hand', 'cat', 'dog', 'duck'];
var cursorDowns = ['mousedown.mp3', 'cat.wav', 'dog.wav', 'quack.wav'];
var cursorUpSounds = ['mouseup.mp3'];

body.addEventListener('mousedown', (e) => {
	body.style.cursor = `url("./cursors/${cursors[activeCursor]}_cursor_click.png"), auto`;
	audio.src = `./cursors/${cursorDowns[activeCursor]}`;
	audio.play();
})

body.addEventListener('mouseup', (e) => {
	body.style.cursor = `url("./cursors/${cursors[activeCursor]}_cursor.png"), auto`;
	if (activeCursor == 0)
	{
		audio.src = `./cursors/${cursorUpSounds[0]}`;
		audio.load();
		audio.play();
	}
})

function setCursor(cursorType)
{
	activeCursor = cursorType;
	body.style.cursor = `url("./cursors/${cursors[cursorType]}_cursor.png"), auto`;
	audio.src = `./cursors/${cursorDowns[cursorType]}`;
	audio.load();
	audio.play();
}

var lastKeysPressed = ["x", "x", "x", "x"];

body.addEventListener('keydown', (e) => {
	lastKeysPressed.push(e.key);
	lastKeysPressed.shift();

	if (lastKeysPressed[0] == "h"
		&& lastKeysPressed[1] == "a"
		&& lastKeysPressed[2] == "n"
		&& lastKeysPressed[3] == "d") {
			setCursor(0);
	};

	if (lastKeysPressed[1] == "c"
	&& lastKeysPressed[2] == "a"
	&& lastKeysPressed[3] == "t") {
		setCursor(1);
}

	if (lastKeysPressed[1] == "d"
		&& lastKeysPressed[2] == "o"
		&& lastKeysPressed[3] == "g") {
			setCursor(2);
	}

	if (lastKeysPressed[0] == "d"
		&& lastKeysPressed[1] == "u"
		&& lastKeysPressed[2] == "c"
		&& lastKeysPressed[3] == "k") {
			setCursor(3);
	}
})