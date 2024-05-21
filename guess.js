const generateRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

const doesNotCount = "Fortunately, this does not count as a guess.";
const dialog = {
  welcome: `Welcome to the game of your demise. You must guess a random number between 1 and 100 using 10 guesses.
  The simple fact that you are here means that there is no turning back untill you have completed the game.
  I shall interact with you through prompts and the console.
  I hope to be your undoing and to delight in you failure`,
  enter: "Enter a number between 1 and 100, if you dare...",
  noInput: `I see... so you wanna play games wiht me. ${doesNotCount}`,
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
};

//prompt() method returns a string regardles of the input
//if the string is a number we can transform
//the input to be a number type using the unary operator "+"
//if the string is not a number, but characters and we use the "+" operator
//the result is NaN.
//And the data type of NaN is number.
//So if we use the unary operator we should
//check if the input is NaN rather then checking if
//the input is of a number type.
//Also, the unary operator used on an empty string
//return the number 0.

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

    if (isNan) {
      alert(dialog.notANum);
    }
    if (userInput === 0) {
      alert(dialog.noInput);
    }
    if (isFloat) {
      alert(dialog.floatingPoint);
    }
    if (isInvalidInt) {
      alert(dialog.badInt);
    }
    if (isValidInt) {
      alert(dialog.goodInt);
      console.log(userInput);
      isValidGuess = true;
      return userInput;
    }
  }
};

const checkGuess = (userNum, correctNum) => {
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

  for (counter = 9; counter >= 0; counter--) {
    const userGuess = getPlayerGuess();
    console.log(checkGuess(userGuess, numberToBeGuessed));
    if (userGuess === numberToBeGuessed) {
      break;
    } else if (counter !== 0) {
      console.log(
        counter === 1
          ? "You have 1 more guess."
          : `You have ${counter} guesses remaining.`
      );
    } else {
      console.log("You lost! And now your soul is mine!");
      return;
    }
  }

  return `You did it using ${10 - counter} attempts`;
};

alert(dialog.welcome);
game();

