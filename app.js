
let precedingVerse = {};
let currentRandomVerse = {};
let succeedingVerse = {};
let currentSection = "";
let currentBook = "";
let lastChapter = "";
let lastVerse = "";
let pointsForRound = 100;

let userSectionChoice = "";
let userBookChoice = "";
let userChapterChoice = "";
let userVerseChoice = "";


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
  return currentRandomVerse;
}

const randomVerseGenerator = () => {
  randomVerseSelector(randomChapterSelector(randomBookSelector()))
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

const checkGuess = () => {
  $('#submitGuess').click(() => {
    let sectionGuess = $('input[name=section]:checked').val();
    let bookGuess = $('input[name=book]:checked').val();
    let chapterGuess = $('input[name=chapter]:checked').val();
    let verseGuess = $('input[name=verse]:checked').val();
    console.log(sectionGuess + " " + bookGuess + " " + chapterGuess + " " + verseGuess);
  });
}

const updateRandomVerse = () => {
  randomVerseGenerator();
  $('#randomVerse').text(currentRandomVerse.verseText);
  $('#precedingVerse').text(precedingVerse.verseText);
  $('#succeedingVerse').text(succeedingVerse.verseText);
  console.log(currentRandomVerse.section + " " + currentRandomVerse.bookName)
}

const selectSectionListener = () => {
  $('#sectionChoice1').click((event) => {
    userSectionChoice = event.target.value;
    if (userSectionChoice !== currentSection) {
      $('#sectionChoice1').css("border", "3px solid red");
      pointsForRound = pointsForRound - 10;
    } else {
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
    }
  })
  $('#sectionChoice2').click((event) => {
    userSectionChoice = event.target.value;
    if (userSectionChoice !== currentSection) {
      $('#sectionChoice2').css("border", "3px solid red");
      pointsForRound = pointsForRound - 10;
    } else {
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
    }
  })
}

const selectBookListener = () => {
  $('.book').click((event) => {
    userBookChoice = event.target.value;
    console.log(userBookChoice);
    for (let i = 0; i < bibleVerses.length; i++) {
      if (bibleVerses[i][0][0].bookName === userBookChoice) {
        console.log(bibleVerses[i][0][0].bookName);
        lastChapter = bibleVerses[i].length;
        console.log(lastChapter);
        for (let j = 1; j <= lastChapter; j++) {
          $('#chapterChoice' + j).removeClass('hidden');
        }
      }
    }
  })
}

const selectChapterListener = () => {
  $('.chapter').click((event) => {
    userChapterChoice = event.target.value;
    console.log(userChapterChoice);
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


updateRandomVerse();
selectSectionListener();
selectBookListener();
selectChapterListener();
getHint();
checkGuess();
