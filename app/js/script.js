const lettersPattern = /[A-Za-z]/;
let currentGuessCount = 1;
let currentGuess = document.querySelector('#guess' + currentGuessCount);
const words = ['apple','mango','money','honey','young','total','clone','robot','rough','tough','fight','eight','seven','polar','solar'];
let solutionWord = '';

const chooseWord = () => {
	// select a random item from word Array
	let randomItem = Math.floor(Math.random() * words.length);
	solutionWord = words[randomItem];
}

chooseWord();
// console.log('solutionWord ' + solutionWord);

// detect keypress (letter , backspace , enter , other)
document.addEventListener('keydown' , (e) => {
	// console.log('keypress: ' + e.key);

	// if letter
	let keypress = e.key;
	if(currentGuessCount < 7) {
		if(keypress.length === 1 && lettersPattern.test(keypress) && currentGuess.dataset.letters.length < 5){
			updateLetters(keypress);
		}
		else if(e.key == 'Backspace' && currentGuess.dataset.letters.length !== 0){
			deleteFromLetters();
		}
		else if(e.key == 'Enter' && currentGuess.dataset.letters.length === 5){
			submitGuess();
		}
	}
});

const submitGuess = () => {
	// console.log("Guess Submitted!");
	for(let i = 0; i < 5; i++){
		setTimeout(() => {
			revealTile(i , checkLetters(i));
		} , i*200);
	}
};

const checkIfGuessComplete = (i) => {
	if(i == 4) {
		checkWin();
	}
};

const checkWin = () => {
	if(solutionWord == currentGuess.dataset.letters){
		// win
		console.log("Game is Won!");
		setTimeout(() => {
			jumpTiles();
		} , 500);
	}
	else{
		// not win
		currentGuessCount += 1;
		currentGuess = document.querySelector('#guess' + currentGuessCount);
		if(currentGuessCount == 7) {
			setTimeout(() => {
				showSolution();
			} , 500);
		}
	}
};

const showSolution = () => {
	alert('Better luck next Time, The Solution was ' + solutionWord);
};

const jumpTiles = () => {
	for(let i = 1; i <= 5; i++) {
		setTimeout(() => {
			let currentTile = document.querySelector('#guess' + currentGuessCount + 'Tile' + i);
			currentTile.classList.add('jump');
		} , i*200);
	}
};

// Update "letters"
const updateLetters = (letter) => {
	let oldLetters = currentGuess.dataset.letters;
	let newLetters = oldLetters + letter;
	let currentTile = newLetters.length;
	currentGuess.dataset.letters = newLetters;
	updateTiles(currentTile , letter);
};

// Update tile markup
const updateTiles = (tileNum , letter) => {
	let currentTile = document.querySelector('#guess' + currentGuessCount + 'Tile' + tileNum);
	currentTile.innerText = letter;
	currentTile.classList.add('has-letter');
};

// Backspace -- Delete last letter
const deleteFromLetters = () => {
	// remove last letter from data-letters
	let oldLetters = currentGuess.dataset.letters;
	let newLetters = oldLetters.slice(0, -1);
	currentGuess.dataset.letters = newLetters;
	deleteFromTiles(oldLetters.length);
};

// Backspace -- Delete last tile markup
const deleteFromTiles = (tileNum) => {
	// remove markup from last tile
	let currentTile = document.querySelector('#guess' + currentGuessCount + 'Tile' + tileNum);
	currentTile.innerText = '';
	currentTile.classList.remove('has-letter');
};

const checkLetters = (position) => {
	let guessedLetter = currentGuess.dataset.letters.charAt(position);
	let solutionLetter = solutionWord.charAt(position);
	
	if(guessedLetter == solutionLetter){
		return 'correct';
	}
	else{
		return checkLetterExists(guessedLetter) ? 'present' : 'absent';
	}
};

const checkLetterExists = (letter) => {
	return solutionWord.includes(letter);
};


const revealTile = (i , state) => {
	let tileNum = i+1;
	flipTile(tileNum , state);
	checkIfGuessComplete(i);
};

const flipTile = (tileNum , state) => {
	let tile = document.querySelector('#guess' + currentGuessCount + 'Tile' + tileNum);
	tile.classList.add('flip-in');
	setTimeout(() => {
		tile.classList.add(state);
	} , 250);
	setTimeout(() => {
		tile.classList.remove('flip-in');
		tile.classList.add('flip-out');
	} , 250);
	setTimeout(() => {
		tile.classList.remove('flip-out');
	} , 1500);
}
