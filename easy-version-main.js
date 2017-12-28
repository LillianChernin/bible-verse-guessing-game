let precedingVerse = {};
let currentRandomVerse = {};
let succeedingVerse = {};
let guessChoices = [];
let currentRandomVerseButtonId = "";
let currentScore = 0;

const randomBookSelector = () => {
  let randomBookIndex = Math.floor(Math.random() * bibleVerses.length);
  return bibleVerses[randomBookIndex];
}

const randomChapterSelector = (array) => {
  let randomChapterIndex = Math.floor(Math.random() * array.length);
  return array[randomChapterIndex];
}

const randomVerseSelector = (array) => {
  let randomVerseIndex = Math.floor(Math.random() * array.length);
  if (randomVerseIndex === 0 && randomVerseIndex === (array.length - 1)) {
    precedingVerse.verseText = "";
    succeedingVerse.verseText = "";
  } else if (randomVerseIndex === 0) {
    precedingVerse.verseText = "";
    succeedingVerse = array[randomVerseIndex + 1];
  } else if (randomVerseIndex === (array.length - 1)) {
    precedingVerse = array[randomVerseIndex - 1];
    succeedingVerse.verseText = "";
  } else {
    precedingVerse = array[randomVerseIndex - 1];
    succeedingVerse = array[randomVerseIndex + 1];
  }
  currentRandomVerse = array[randomVerseIndex];
  guessChoices.push(currentRandomVerse);
  return currentRandomVerse;
}

const shuffleGuesses = () => {
  for (let i = guessChoices.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let elementAtIndex = guessChoices[randomIndex];
    guessChoices[randomIndex] = guessChoices[i];
    guessChoices[i] = elementAtIndex;
  }
  return guessChoices;
}

const randomVerseGenerator = () => {
  randomVerseSelector(randomChapterSelector(randomBookSelector()))
}

const randomGuessSelector = (array) => {
  let randomVerseIndex = Math.floor(Math.random() * array.length);
  for (let i = 0; i < guessChoices.length; i++) {
    if (array[randomVerseIndex].verseText === guessChoices[i].verseText) {
      let newArray = randomChapterSelector(randomBookSelector());
      let newRandomVerse = Math.floor(Math.random() * newArray.length);
      for (let j = 0; j < guessChoices.length; j++) {
        if (newArray[newRandomVerse].verseText === guessChoices[j].verseText) {
          let lastArray = randomChapterSelector(randomBookSelector());
          let lastRandomVerse = Math.floor(Math.random() * lastArray.length);
          guessChoices.push(lastArray[lastRandomVerse])
          return lastArray[lastRandomVerse];
        } else {
          guessChoices.push(newArray[newRandomVerse]);
          return newArray[newRandomVerse];
        }
      }
    }
  }
  guessChoices.push(array[randomVerseIndex]);
  return array[randomVerseIndex];
}

const randomGuessesGenerator = () => {
  for (let i = 0; i < 5; i++) {
    randomGuessSelector(randomChapterSelector(randomBookSelector()));
  }
  shuffleGuesses();
  for (let i = 0; i < guessChoices.length; i++) {
    let domID = "guessChoice" + (i + 1);
    let guessValue = guessChoices[i].bookName + " " + guessChoices[i].chapterNumber + ":" + guessChoices[i].verseNumber;
    $("#" + domID).attr("value", guessValue);
    if (guessChoices[i].bookName === currentRandomVerse.bookName && guessChoices[i].chapterNumber === currentRandomVerse.chapterNumber && guessChoices[i].verseNumber === currentRandomVerse.verseNumber) {
      currentRandomVerseButtonId = domID;
    }
  }
}

const getHint = () => {
  $('#hint').click(() => {
    if (precedingVerse.verseText !== "") {
      $('#precedingVerse').removeClass("hidden");
    }
    if (succeedingVerse.verseText !== "") {
      $('#succeedingVerse').removeClass("hidden");
    }
  });
}

const updateRandomVerse = () => {
  guessChoices = [];
  randomVerseGenerator();
  randomGuessesGenerator();
  $('#randomVerse').text(currentRandomVerse.verseText);
  $('#precedingVerse').text(precedingVerse.verseText);
  $('#succeedingVerse').text(succeedingVerse.verseText);
  console.log(currentRandomVerse.section + " " + currentRandomVerse.bookName)
}

$('#changeVerse').click(() => {
  updateRandomVerse();
  if (precedingVerse !== undefined) {
    $('#precedingVerse').addClass("hidden");
  }
  if (succeedingVerse !== undefined) {
    $('#succeedingVerse').addClass("hidden");
  }
})

const checkGuess = () => {
  $('.guess').click((event) => {
    let correctAnswer = $('#' + currentRandomVerseButtonId).val();
    if (event.target.id === currentRandomVerseButtonId) {
      $('.guess').addClass("hidden");
      $('#result').text("You selected the correct verse, " + correctAnswer + ".  Good job!");
      $('#resultScreen').removeClass('hidden');
      currentScore+= 10;
      $('#score').text("Current Score: " + currentScore);
    } else {
      $('.guess').addClass("hidden");
      $('#resultScreen').css("background-color", "#ff5959");
      $('#result').text("The correct answer was " + correctAnswer);
      $('#resultScreen').removeClass('hidden');
    }
  })
}

$('#playAgain').click(() => {
  $('.guess').removeClass("hidden");
  $('#resultScreen').addClass('hidden');
  $('#resultScreen').css("background-color", "#6add6a");
  updateRandomVerse();
  if (precedingVerse !== undefined) {
    $('#precedingVerse').addClass("hidden");
  }
  if (succeedingVerse !== undefined) {
    $('#succeedingVerse').addClass("hidden");
  }
})

updateRandomVerse();
getHint();
checkGuess();
