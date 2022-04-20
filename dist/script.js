"use strict";var lettersPattern=/[A-Za-z]/,currentGuessCount=1,currentGuess=document.querySelector("#guess"+currentGuessCount),words=["apple","mango","money","honey","young","total","clone","robot","rough","tough","fight","eight","seven","polar","solar"],solutionWord="",chooseWord=function(){var e=Math.floor(Math.random()*words.length);solutionWord=words[e]};chooseWord(),document.addEventListener("keydown",(function(e){var t=e.key;currentGuessCount<7&&(1===t.length&&lettersPattern.test(t)&&currentGuess.dataset.letters.length<5?updateLetters(t):"Backspace"==e.key&&0!==currentGuess.dataset.letters.length?deleteFromLetters():"Enter"==e.key&&5===currentGuess.dataset.letters.length&&submitGuess())}));var submitGuess=function(){for(var e=function(e){setTimeout((function(){revealTile(e,checkLetters(e))}),200*e)},t=0;t<5;t++)e(t)},checkIfGuessComplete=function(e){4==e&&checkWin()},checkWin=function(){solutionWord==currentGuess.dataset.letters?(console.log("Game is Won!"),setTimeout((function(){jumpTiles()}),500)):(currentGuessCount+=1,currentGuess=document.querySelector("#guess"+currentGuessCount),7==currentGuessCount&&setTimeout((function(){showSolution()}),500))},showSolution=function(){alert("Better luck next Time, The Solution was "+solutionWord)},jumpTiles=function(){for(var e=function(e){setTimeout((function(){document.querySelector("#guess"+currentGuessCount+"Tile"+e).classList.add("jump")}),200*e)},t=1;t<=5;t++)e(t)},updateLetters=function(e){var t=currentGuess.dataset.letters+e,s=t.length;currentGuess.dataset.letters=t,updateTiles(s,e)},updateTiles=function(e,t){var s=document.querySelector("#guess"+currentGuessCount+"Tile"+e);s.innerText=t,s.classList.add("has-letter")},deleteFromLetters=function(){var e=currentGuess.dataset.letters,t=e.slice(0,-1);currentGuess.dataset.letters=t,deleteFromTiles(e.length)},deleteFromTiles=function(e){var t=document.querySelector("#guess"+currentGuessCount+"Tile"+e);t.innerText="",t.classList.remove("has-letter")},checkLetters=function(e){var t=currentGuess.dataset.letters.charAt(e);return t==solutionWord.charAt(e)?"correct":checkLetterExists(t)?"present":"absent"},checkLetterExists=function(e){return solutionWord.includes(e)},revealTile=function(e,t){flipTile(e+1,t),checkIfGuessComplete(e)},flipTile=function(e,t){var s=document.querySelector("#guess"+currentGuessCount+"Tile"+e);s.classList.add("flip-in"),setTimeout((function(){s.classList.add(t)}),250),setTimeout((function(){s.classList.remove("flip-in"),s.classList.add("flip-out")}),250),setTimeout((function(){s.classList.remove("flip-out")}),1500)};
//# sourceMappingURL=script.js.map