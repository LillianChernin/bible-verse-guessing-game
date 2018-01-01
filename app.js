
let precedingVerse = {};
let currentRandomVerse = {};
let succeedingVerse = {};
let currentSection = "";
let currentBook = "";
let lastChapter = "";
let lastVerse = "";
let missedSection = 0;
let missedBook = 0;
let missedChapter = 0;
let missedVerse = 0;

let userSectionChoice = "";
let userBookChoice = "";
let userChapterChoice = "";
let userVerseChoice = "";
let userBookChoiceIndex = "";
let userBookChoiceId = "";
let userChapterChoiceId = "";
let userVerseChoiceId = "";


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
  console.log(currentRandomVerse.section);
  console.log(currentRandomVerse.bookName);
  console.log(currentRandomVerse.chapterNumber);
  console.log(currentRandomVerse.verseNumber);
}

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
      console.log(userBookChoice);
      for (let i = 0; i < bibleVerses.length; i++) {
        if (bibleVerses[i][0][0].bookName === userBookChoice) {
          userBookChoiceIndex = i;
          console.log(bibleVerses[i][0][0].bookName);
          lastChapter = bibleVerses[i].length;
          console.log(lastChapter);
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
    if (userChapterChoice !== currentRandomVerse.chapterNumber) {
      $('#' + userChapterChoiceId).css("border", "3px solid red");
      missedChapter = 30;
    } else {
      $('#' + userChapterChoiceId).css("border", "3px solid green");
      console.log(userChapterChoice);
      let userChapterChoiceAsArr = userChapterChoice.split(' ');
      userChapterChoice = Number(userChapterChoiceAsArr[1]);
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
    $('#' + userVerseChoiceId).css("border", "3px solid blue");
    userVerseChoice = event.target.value;
    let userVerseChoiceAsArr = userVerseChoice.split(' ');
    userVerseChoice = Number(userVerseChoiceAsArr[1]);
    console.log(userVerseChoice);
    for (let i = 1; i <= lastVerse; i++) {
      let currentVerseChoice = "verseChoice" + i;
      if (userVerseChoiceId !== currentVerseChoice) {
        $('#' + currentVerseChoice).addClass('hidden');
      }
    }
    $('#selectVerse').addClass('hidden');
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

$('#resetGuess').click(() => {

})


updateRandomVerse();
selectSectionListener();
selectBookListener();
selectChapterListener();
selectVerseListener();
getHint();
checkGuess();
