
let precedingVerse = {};
let currentRandomVerse = {};
let succeedingVerse = {};
let currentBook = "";
let lastChapter = "";
let lastVerse = "";

let userSectionChoice = "";
let userBookChoice = "";
let userChapterChoice = "";
let userVerseChoice = "";

const books = ["genesis", "matthew", "mark", "luke", "john"];

const randomBookSelector = () => {
  let randomNum = Math.floor(Math.random() * books.length);
  currentBook = books[randomNum];
  return books[randomNum];
}

const randomVerseSelector = (array) => {
  let randomVerse = Math.floor(Math.random() * array.length);
  precedingVerse = array[randomVerse - 1];
  succeedingVerse = array[randomVerse + 1];
  currentRandomVerse = array[randomVerse];
  return currentRandomVerse;
}


const randomVerseGenerator = () => {
  let randomBook = randomBookSelector();
  if (randomBook === "genesis") {
    lastChapter = genesisVerses[genesisVerses.length - 1].chapterNumber;
    return randomVerseSelector(genesisVerses);
  } else if (randomBook === "matthew") {
    lastChapter = matthewVerses[matthewVerses.length - 1].chapterNumber;
    return randomVerseSelector(matthewVerses);
  } else if (randomBook === "mark") {
    lastChapter = markVerses[markVerses.length - 1].chapterNumber;
    return randomVerseSelector(markVerses);
  } else if (randomBook === "luke") {
    lastChapter = lukeVerses[lukeVerses.length - 1].chapterNumber;
    return randomVerseSelector(lukeVerses);
  } else if (randomBook === "john") {
    lastChapter = johnVerses[johnVerses.length - 1].chapterNumber;
    return randomVerseSelector(johnVerses);
  }
}

const getHint = () => {
  $('#hint').click(() => {
    if (precedingVerse !== undefined) {
      $('#precedingVerse').removeClass("hidden");
    }
    if (succeedingVerse !== undefined) {
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

// const hideSectionButtons = () => {
//
//
// }

const updateRandomVerse = () => {
  randomVerseGenerator();
  $('#randomVerse').text(currentRandomVerse.verseText);
  $('#precedingVerse').text(precedingVerse.verseText);
  $('#succeedingVerse').text(succeedingVerse.verseText);
  console.log(currentRandomVerse.section + " " + currentRandomVerse.bookName)
}

const selectSectionListener = () => {
  $('#sectionChoice1').click(() => {
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
  })
  $('#sectionChoice2').click(() => {
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
  })
}

const selectBookListener = () => {
  $('.book').click((event) => {
    userBookChoice = event.target.value;
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
getHint();
checkGuess();


// "verseText": "So they took the money and did as they were directed. And this story has been spread among the Jews to this day. ",
// "verseNumber": "15",
// "bookName": "Matthew",
// "chapterNumber": 28,
// "section": "New Testament"






// const dataArray = [];
//
// const retrieveVerseNumber = function(currentText) {
//   let curTexArr = currentText.split('');
//   for (let i = 0; i < curTexArr.length; i++) {
//     if ((curTexArr[i].charCodeAt(0) >= 65 && curTexArr[i].charCodeAt(0) <= 90) || (curTexArr[i].charCodeAt(0) >= 97 && curTexArr[i].charCodeAt(0) <= 122)) {
//       return curTexArr.slice(0, i).join('');
//     }
//   }
// }
//
// const retrieveVerseText = function(currentText) {
//   let curTexArr = currentText.split('');
//   for (let i = 0; i < curTexArr.length; i++) {
//     if ((curTexArr[i].charCodeAt(0) >= 65 && curTexArr[i].charCodeAt(0) <= 90) || (curTexArr[i].charCodeAt(0) >= 97 && curTexArr[i].charCodeAt(0) <= 122)) {
//       return curTexArr.slice(i).join('');
//     }
//   }
// }
//
//
// $('.verse').each(function(i, obj) {
//   let currentObj = {};
//   let currentText = $(this).text();
//   currentObj.verseText = retrieveVerseText(currentText);
//   currentObj.verseNumber = retrieveVerseNumber(currentText);
//   currentObj.bookName = "Genesis";
//   currentObj.chapterNumber = 3;
//   currentObj.section = "Old Testament";
//   dataArray.push(currentObj);
// });
//
//
// JSON.stringify(dataArray);



// var classList = $(this).attr('class').split(/\s+/);
// $.each(classList, function(index, item) {
//     console.log(item + index);
//     if (item !== 'verse') {
//       console.log(item);
//       let verseNum = Number(item.split('').shift().join(''));
//       return currentObj.verseNumber = verseNum;
//     }
// });
