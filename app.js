
let precedingVerse = {};
let currentRandomVerse = {};
let succeedingVerse = {};
let currentSection = "";
let currentBook = "";
let lastChapter = "";
let lastVerse = "";
let userScore = 0;
let missedSection = 0;
let missedBook = 0;
let missedChapter = 0;
let missedVerse = 0;
let currentRoundScore = 0;
let roundNumber = 1;


let userSectionChoice = "";
let userBookChoice = "";
let userChapterChoice = "";
let userVerseChoice = "";
let userBookChoiceIndex = "";
let userBookChoiceId = "";
let userChapterChoiceId = "";
let userVerseChoiceId = "";
let currentGameDifficulty = "";

let guessChoices = [];
let currentRandomVerseButtonId = "";
let currentScore = 0;



const randomBookSelector = () => {
  let randomBookIndex = Math.floor(Math.random() * bibleVerses.length);
  currentBook = bibleVerses[randomBookIndex][0][0].bookName;
  currentSection = bibleVerses[randomBookIndex][0][0].section;
  return bibleVerses[randomBookIndex];
}

const randomChapterSelector = (array) => {
  let randomChapterIndex = Math.floor(Math.random() * array.length);
  currentChapter = array[randomChapterIndex][0].chapterNumber;
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



const randomVerseGenerator = () => {
  randomVerseSelector(randomChapterSelector(randomBookSelector()))
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


const submitGuess = () => {
  $('#submitGuess').click(() => {
    $('#resultScreen').removeClass('hidden');
    currentRoundScore = 100 - missedSection - missedBook - missedChapter - missedVerse;
    userScore = userScore + currentRoundScore;
    $('#score').text("Current Score: " + userScore);
    $('#resultMessage').text()
  });
}

const updateRandomVerse = () => {
  if (currentGameDifficulty === )
  randomVerseGenerator();
  $('#randomVerse').text(currentRandomVerse.verseText);
  $('#precedingVerse').text(precedingVerse.verseText);
  $('#succeedingVerse').text(succeedingVerse.verseText);
  console.log(currentRandomVerse.bookName);
  console.log(currentRandomVerse.chapterNumber);
  console.log(currentRandomVerse.verseNumber);
}

//
// const updateRandomVerse = () => {
//   guessChoices = [];
//   randomVerseGenerator();
//   randomGuessesGenerator();
//   $('#randomVerse').text(currentRandomVerse.verseText);
//   $('#precedingVerse').text(precedingVerse.verseText);
//   $('#succeedingVerse').text(succeedingVerse.verseText);
//   console.log(currentRandomVerse.section + " " + currentRandomVerse.bookName)
// }
//


const selectSectionListener = () => {
  $('#sectionChoice1').click((event) => {
    userSectionChoice = event.target.value;
    if (userSectionChoice !== currentSection) {
      $('#sectionChoice1').css("border", "3px solid red");
      missedSection = 10;
    } else {
      $('#' + event.target.id).css("border", "3px solid green");
      for (let i = 1; i <= 39; i++) {
        let currentSearch = '#' + 'bookChoice' + i;
        $(currentSearch).removeClass('hidden');
      }
      for (let i = 40; i <= 66; i++) {
        let currentSearch = '#' + 'bookChoice' + i;
        $(currentSearch).addClass('hidden');
      }
      userSectionChoice = "Old Testament";
      $('#sectionChoice2').addClass('hidden');
      $('#selectSection').addClass('hidden');
      $('#selectBook').removeClass('hidden');
    }
  })
  $('#sectionChoice2').click((event) => {
    userSectionChoice = event.target.value;
    if (userSectionChoice !== currentSection) {
      $('#sectionChoice2').css("border", "3px solid red");
      missedSection = 10;
    } else {
      $('#' + event.target.id).css("border", "3px solid green");
      for (let i = 1; i <= 39; i++) {
        let currentSearch = '#' + 'bookChoice' + i;
        $(currentSearch).addClass('hidden');
      }
      for (let i = 40; i <= 66; i++) {
        let currentSearch = '#' + 'bookChoice' + i;
        $(currentSearch).removeClass('hidden');
      }
      userSectionChoice = "New Testament";
      $('#sectionChoice1').addClass('hidden');
      $('#selectSection').addClass('hidden');
      $('#selectBook').removeClass('hidden');
    }
  })
}

const selectBookListener = () => {
  $('.book').click((event) => {
    userBookChoice = event.target.value;
    userBookChoiceId = event.target.id;
    if (userBookChoice !== currentRandomVerse.bookName) {
      $('#' + userBookChoiceId).css("border", "3px solid red");
      missedBook = 20;
    } else {
      $('#' + userBookChoiceId).css("border", "3px solid green");
      for (let i = 0; i < bibleVerses.length; i++) {
        if (bibleVerses[i][0][0].bookName === userBookChoice) {
          userBookChoiceIndex = i;
          lastChapter = bibleVerses[i].length;
          for (let j = 1; j <= lastChapter; j++) {
            $('#chapterChoice' + j).removeClass('hidden');
          }
        }
      }
      for (let i = 1; i <= 66; i++) {
        let currentBookChoice = "bookChoice" + i;
        if (currentBookChoice !== userBookChoiceId) {
          $('#' + currentBookChoice).addClass('hidden');
        }
      }
      $('#selectBook').addClass('hidden');
      $('#selectChapter').removeClass('hidden');
    }
  })
}

const selectChapterListener = () => {
  $('.chapter').click((event) => {
    userChapterChoiceId = event.target.id;
    userChapterChoice = event.target.value;
    let userChapterChoiceAsArr = userChapterChoice.split(' ');
    userChapterChoice = Number(userChapterChoiceAsArr[1]);
    if (userChapterChoice !== currentRandomVerse.chapterNumber) {
      $('#' + userChapterChoiceId).css("border", "3px solid red");
      missedChapter = 30;
    } else {
      $('#' + userChapterChoiceId).css("border", "3px solid green");
      lastVerse = bibleVerses[userBookChoiceIndex][userChapterChoice - 1].length;
      for (let i = 1; i <= lastVerse; i++) {
        $('#verseChoice' + i).removeClass('hidden');
      }
      for (let i = 1; i <= lastChapter; i++) {
        let currentChapterChoice = "chapterChoice" + i;
        if (userChapterChoiceId !== currentChapterChoice) {
          $('#' + currentChapterChoice).addClass('hidden');
        }
      }
      $('#selectChapter').addClass('hidden');
      $('#selectVerse').removeClass('hidden');
    }
  })
}

const selectVerseListener = () => {
  $('.verse').click((event) => {
    userVerseChoiceId = event.target.id;
    userVerseChoice = event.target.value;
    let userVerseChoiceAsArr = userVerseChoice.split(' ');
    userVerseChoice = Number(userVerseChoiceAsArr[1]);
    if (userVerseChoice !== currentRandomVerse.verseNumber) {
      $('#' + userVerseChoiceId).css("border", "3px solid red");
      missedVerse = 40;
    } else {
      $('#' + userVerseChoiceId).css("border", "3px solid green");
      for (let i = 1; i <= lastVerse; i++) {
        let currentVerseChoice = "verseChoice" + i;
        if (userVerseChoiceId !== currentVerseChoice) {
          $('#' + currentVerseChoice).addClass('hidden');
        }
      }
      $('#selectVerse').addClass('hidden');
    }
  })
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
  if (currentGameDifficulty === "easy") {
    for (let i = 0; i < 3; i++) {
      randomGuessSelector(randomChapterSelector(randomBookSelector()));
    }
  } else {
    for (let i = 0; i < 5; i++) {
      randomGuessSelector(randomChapterSelector(randomBookSelector()));
    }
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

$('.difficultyButton').click((event) => {
  let currentDifficultyButtonIdAsArr = (event.target.id).split('-');
  currentGameDifficulty = currentDifficultyButtonIdAsArr[0];
  console.log(currentGameDifficulty);
  updateRandomVerse();
  if (currentGameDifficulty === "expert") {

  } else {

  }
})



$('#resetGuess').click(() => {

})

const bibleVersesIndexesOrganizedByTheme = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 65],
  [39, 40, 41, 42, 43],
  [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64]
]


const checkGuess = () => {
  $('.guess').click((event) => {
    let correctAnswer = $('#' + currentRandomVerseButtonId).val();
    if (roundNumber === 10) {
      $('#nextVerse').addClass('hidden');
      $('#playAgain').removeClass('hidden');
    }
    roundNumber++;
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

$('#nextVerse').click(() => {
  if (currentGameDifficulty !== "expert") {
    $('.guess').removeClass("hidden");
  }
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


selectSectionListener();
selectBookListener();
selectChapterListener();
selectVerseListener();
getHint();
submitGuess();
checkGuess();
