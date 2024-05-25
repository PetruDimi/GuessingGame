const generateRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

const doesNotCount = "Fortunately, this does not count as a guess.";
const dialog = {
  changeOfHeart:"I see you had a change of heart... No matter. There are plenty of souls down here",
  question: "Shall we play a game in which your soul hangs in the ballance?",
  welcome: `Welcome to the game of your demise. You must guess a random number between 1 and 100 using 10 guesses.
  The game can be canceled, when prompted to enter an input, by pressing "cancel" or entering the number 0.
  I shall interact with you through prompts and the console.
  I hope to be your undoing and to delight in your failure.`,
  enter: "Enter a number between 1 and 100, if you dare...",
  notANum: `You really should give me a number, it's best not get on my nerves. ${doesNotCount}`,
  floatingPoint: `You think you can defeat me with a floating point number ?! Pathetic! ${doesNotCount}`,
  badInt: `What have I done to you to deserve this lack of cooperation?
   I want do defeat you, but at least give me a challenge! ${doesNotCount}`,
  goodInt:
    "Hmmm...You have managed to input a correct number, surprisingly. But is it the number you are looking for?",
  incorrectGuess:
    "sucker! I shall not stop till I see you crumble at my digital feet",
  correctGuess: `Curses! You've figured it out...
  You got lucky! I shall never concede to the likes of you!`,
  again: "Shall we do this again?",
};

const getPlayerGuess = () => {
  let userInput;
  let isValidGuess = false;

  while (!isValidGuess) {
    userInput = +prompt(dialog.enter);

    let isNan = Number.isNaN(userInput);
    let isInteger = Number.isInteger(userInput);
    let isFloat = !isNan && userInput % 1 !== 0;
    let isInvalidInt = (userInput < 0 || userInput > 100) && isInteger;
    let isValidInt = userInput > 0 && userInput <= 100 && isInteger;

    if (userInput === 0) {
      console.log(dialog.changeOfHeart);
      return
    }
    if (isNan) {
      console.log(dialog.notANum);
    }
    if (isFloat) {
      console.log(dialog.floatingPoint);
    }
    if (isInvalidInt) {
      console.log(dialog.badInt);
    }
    if (isValidInt) {
      console.log("Your last correct input was:");
      console.log(userInput);
      console.log(dialog.goodInt);
      isValidGuess = true;
      return userInput;
    }
  }
};

const checkGuess = (userNum, correctNum) => {
  if (userNum < correctNum && userNum > correctNum - 5) {
    return `Very warm but still too low ${dialog.incorrectGuess}`;
  }
  if (userNum > correctNum && userNum < correctNum + 5) {
    return `Very warm but still too high ${dialog.incorrectGuess}`;
  }
  if (userNum < correctNum) {
    return `Too low ${dialog.incorrectGuess}`;
  }
  if (userNum > correctNum) {
    return `Too high ${dialog.incorrectGuess}`;
  }
  if (userNum === correctNum) {
    return `${dialog.correctGuess}`;
  }
};

const game = () => {
  const numberToBeGuessed = generateRandomNumber();
  let counter;
  const startTime = new Date().getTime() / 1000;

  for (counter = 9; counter >= 0; counter--) {
    const userGuess = getPlayerGuess();
    if(userGuess === undefined){
      return
    }
    console.log(checkGuess(userGuess, numberToBeGuessed));
    if (userGuess === numberToBeGuessed) {
      const endTime = new Date().getTime() / 1000;
      console.log(
        `You did it using ${10 - counter} attempts and in ${Math.round(endTime - startTime)} seconds.`
      );
      return true
    } else if (counter !== 0) {
      console.log(
        counter === 1
          ? "You have 1 more guess."
          : `You have ${counter} guesses remaining.`
      );
    } else {
      console.log("You lost! And now your soul is mine!");
      return true
    }
  }

};

let endGame
if(confirm(dialog.question)){
  alert(dialog.welcome)
  endGame = game()
} 

if(endGame){
  confirm(dialog.again)
  location.reload()
} else {
  alert(dialog.changeOfHeart)
}
