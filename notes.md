# Functional Requirements

## GamePlay

A 5-letter word has to be guesses in at max 6 tries

### Making a guess

Detect keypress
    - if keypress is a letter
        - update "letters" attribute
            - update tile markup based on "letters" value
    - if keypress is backspace
        - delete last letter in "letters"
            - update tile markup based on "letters" value

Don't run update function if "letters" length = 5

### Pick a solution word
Store solutions words in array
When game is loaded, choose random item from array
Set solution to that word

### Submit the guess
Pressing Enter will submit our guess
    - compare each letter with the corresponding letter in solution word
    - update the state/color of the letter
    - If all are "correct" / green , game is won

Guessed word must be a real word present in "word-list"

Guess colors:
    - gray : "absent", letter not in word
    - yellow : "present", letter is in word but not at correct position
    - green : "correct", letter is in word and at correct position

Hard Mode: present or correct letter must be used in subsequent guesses

Guesses are stored in local storage

## Design

5x6 tiles

virtual keyboard

## Interaction

When typing a letter:
    - border of the tile changes to light gray
    - blinking in animation with letter
    - backspace will remove letter, border will change back to dark gray

When submitting a guess:
    - Tiles will flip up and background color will change based on guess
    - Slight delay between each tile flipping
    - Backgroung color changes when tile is flat, i.e. can't see it