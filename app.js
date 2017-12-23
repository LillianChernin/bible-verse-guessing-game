
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


const books = [genesisVerses, exodusVerses, leviticusVerses, numbersVerses,
deuteronomyVerses, joshuaVerses, judgesVerses, ruthVerses, firstSamuelVerses,
secondSamuelVerses, firstKingsVerses, secondKingsVerses, firstChroniclesVerses,
secondChroniclesVerses, ezraVerses, nehemiahVerses, estherVerses, jobVerses,
psalmsVerses, proverbsVerses, ecclesiastesVerses, theSongOfSolomonVerses,
isaiahVerses, jeremiahVerses, lamentationsVerses, ezekielVerses, danielVerses,
hoseaVerses,joelVerses,amosVerses,obadiahVerses,jonahVerses,micahVerses,nahumVerses,
habakkukVerses, zephaniahVerses, haggaiVerses, zechariahVerses, malachiVerses,
matthewVerses, markVerses, lukeVerses, johnVerses, actsVerses, romansVerses,
firstCorinthiansVerses, secondCorinthiansVerses, galatiansVerses, ephesiansVerses,
philippiansVerses, colossiansVerses, firstThessaloniansVerses, secondThessaloniansVerses,
firstTimothyVerses, secondTimothyVerses, titusVerses, philemonVerses, hebrewsVerses,
jamesVerses, firstPeterVerses, secondPeterVerses,firstJohnVerses,secondJohnVerses,
thirdJohnVerses, judeVerses, revelationVerses];

const randomBookSelector = () => {
  let randomNum = Math.floor(Math.random() * books.length);
  currentBook = books[randomNum];
  return books[randomNum];
}

const randomVerseSelector = (array) => {
  let randomVerse = Math.floor(Math.random() * array.length);
  if (randomVerse === 0 && randomVerse === (array.length - 1)) {
    precedingVerse.verseText = "";
    succeedingVerse.verseText = "";
  } else if (randomVerse === 0) {
    precedingVerse.verseText = "";
  } else if (randomVerse === (array.length - 1)) {
    succeedingVerse.verseText = "";
  } else {
    precedingVerse = array[randomVerse - 1];
    succeedingVerse = array[randomVerse + 1];
  }
  currentRandomVerse = array[randomVerse];
  return currentRandomVerse;
}

const randomVerseGenerator = () => {
  randomVerseSelector(randomBookSelector())
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
    console.log(userBookChoice);
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
getHint();
checkGuess();


// const books = ["Genesis","Exodus","Leviticus","Numbers",
// "Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel",
// "1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra",
// "Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes",
// "The Song of Solomon","Isaiah","Jeremiah","Lamentations","Ezekiel",
// "Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum",
// "Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew", "Mark",
// "Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians",
// "Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians",
// "1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter",
// "2 Peter","1 John","2 John","3 John","Jude","Revelation"];

// const randomVerseGenerator = () => {
//   let randomBook = randomBookSelector();
//   if (randomBook === "Genesis") {
//     lastChapter = genesisVerses[genesisVerses.length - 1].chapterNumber;
//     return randomVerseSelector(genesisVerses);
//   } else if (randomBook === "Exodus") {
//     lastChapter = exodusVerses[exodusVerses.length - 1].chapterNumber;
//     return randomVerseSelector(exodusVerses);
//   } else if (randomBook === "Leviticus") {
//     lastChapter = leviticusVerses[leviticusVerses.length - 1].chapterNumber;
//     return randomVerseSelector(leviticusVerses);
//   } else if (randomBook === "Numbers") {
//     lastChapter = numbersVerses[numbersVerses.length - 1].chapterNumber;
//     return randomVerseSelector(numbersVerses);
//   } else if (randomBook === "Deuteronomy") {
//     lastChapter = deuteronomyVerses[deuteronomyVerses.length - 1].chapterNumber;
//     return randomVerseSelector(deuteronomyVerses);
//   } else if (randomBook === "Joshua") {
//     lastChapter = joshuaVerses[joshuaVerses.length - 1].chapterNumber;
//     return randomVerseSelector(joshuaVerses);
//   } else if (randomBook === "Judges") {
//     lastChapter = judgesVerses[judgesVerses.length - 1].chapterNumber;
//     return randomVerseSelector(judgesVerses);
//   } else if (randomBook === "Ruth") {
//     lastChapter = ruthVerses[ruthVerses.length - 1].chapterNumber;
//     return randomVerseSelector(ruthVerses);
//   } else if (randomBook === "1 Samuel") {
//     lastChapter = firstSamuelVerses[firstSamuelVerses.length - 1].chapterNumber;
//     return randomVerseSelector(firstSamuelVerses);
//   } else if (randomBook === "2 Samuel") {
//     lastChapter = secondSamuelVerses[secondSamuelVerses.length - 1].chapterNumber;
//     return randomVerseSelector(secondSamuelVerses);
//   } else if (randomBook === "1 Kings") {
//     lastChapter = firstKingsVerses[firstKingsVerses.length - 1].chapterNumber;
//     return randomVerseSelector(firstKingsVerses);
//   } else if (randomBook === "1 Chronicles") {
//     lastChapter = firstChroniclesVerses[firstChroniclesVerses.length - 1].chapterNumber;
//     return randomVerseSelector(firstChroniclesVerses);
//   } else if (randomBook === "2 Chronicles") {
//     lastChapter = secondChroniclesVerses[secondChroniclesVerses.length - 1].chapterNumber;
//     return randomVerseSelector(secondChroniclesVerses);
//   } else if (randomBook === "Ezra") {
//     lastChapter = ezraVerses[ezraVerses.length - 1].chapterNumber;
//     return randomVerseSelector(ezraVerses);
//   } else if (randomBook === "Nehemiah") {
//     lastChapter = nehemiahVerses[nehemiahVerses.length - 1].chapterNumber;
//     return randomVerseSelector(nehemiahVerses);
//   } else if (randomBook === "Esther") {
//     lastChapter = estherVerses[estherVerses.length - 1].chapterNumber;
//     return randomVerseSelector(estherVerses);
//   } else if (randomBook === "Job") {
//     lastChapter = jobVerses[jobVerses.length - 1].chapterNumber;
//     return randomVerseSelector(jobVerses);
//   } else if (randomBook === "Psalms") {
//     lastChapter = psalmsVerses[psalmsVerses.length - 1].chapterNumber;
//     return randomVerseSelector(psalmsVerses);
//   } else if (randomBook === "Proverbs") {
//     lastChapter = proverbsVerses[proverbsVerses.length - 1].chapterNumber;
//     return randomVerseSelector(proverbsVerses);
//   } else if (randomBook === "Ecclesiastes") {
//     lastChapter = ecclesiastesVerses[ecclesiastesVerses.length - 1].chapterNumber;
//     return randomVerseSelector(ecclesiastesVerses);
//   } else if (randomBook === "The Song of Solomon") {
//     lastChapter = theSongOfSolomonVerses[theSongOfSolomonVerses.length - 1].chapterNumber;
//     return randomVerseSelector(theSongOfSolomonVerses);
//   } else if (randomBook === "Isaiah") {
//     lastChapter = isaiahVerses[isaiahVerses.length - 1].chapterNumber;
//     return randomVerseSelector(isaiahVerses);
//   } else if (randomBook === "Jeremiah") {
//     lastChapter = jeremiahVerses[jeremiahVerses.length - 1].chapterNumber;
//     return randomVerseSelector(jeremiahVerses);
//   } else if (randomBook === "Lamentations") {
//     lastChapter = lamentationsVerses[lamentationsVerses.length - 1].chapterNumber;
//     return randomVerseSelector(lamentationsVerses);
//   } else if (randomBook === "Ezekiel") {
//     lastChapter = ezekielVerses[ezekielVerses.length - 1].chapterNumber;
//     return randomVerseSelector(ezekielVerses);
//   } else if (randomBook === "Hosea") {
//     lastChapter = hoseaVerses[hoseaVerses.length - 1].chapterNumber;
//     return randomVerseSelector(hoseaVerses);
//   } else if (randomBook === "Joel") {
//     lastChapter = joelVerses[joelVerses.length - 1].chapterNumber;
//     return randomVerseSelector(joelVerses);
//   } else if (randomBook === "Amos") {
//     lastChapter = amosVerses[amosVerses.length - 1].chapterNumber;
//     return randomVerseSelector(amosVerses);
//   } else if (randomBook === "Obadiah") {
//     lastChapter = obadiahVerses[obadiahVerses.length - 1].chapterNumber;
//     return randomVerseSelector(obadiahVerses);
//   } else if (randomBook === "Jonah") {
//     lastChapter = jonahVerses[jonahVerses.length - 1].chapterNumber;
//     return randomVerseSelector(jonahVerses);
//   } else if (randomBook === "Micah") {
//     lastChapter = micahVerses[micahVerses.length - 1].chapterNumber;
//     return randomVerseSelector(micahVerses);
//   } else if (randomBook === "Nahum") {
//     lastChapter = nahumVerses[nahumVerses.length - 1].chapterNumber;
//     return randomVerseSelector(nahumVerses);
//   } else if (randomBook === "Habakkuk") {
//     lastChapter = habakkukVerses[habakkukVerses.length - 1].chapterNumber;
//     return randomVerseSelector(habakkukVerses);
//   } else if (randomBook === "Zephaniah") {
//     lastChapter = zephaniahVerses[zephaniahVerses.length - 1].chapterNumber;
//     return randomVerseSelector(zephaniahVerses);
//   } else if (randomBook === "Haggai") {
//     lastChapter = haggaiVerses[haggaiVerses.length - 1].chapterNumber;
//     return randomVerseSelector(haggaiVerses);
//   } else if (randomBook === "Zechariah") {
//     lastChapter = zechariahVerses[zechariahVerses.length - 1].chapterNumber;
//     return randomVerseSelector(zechariahVerses);
//   } else if (randomBook === "Malachi") {
//     lastChapter = malachiVerses[malachiVerses.length - 1].chapterNumber;
//     return randomVerseSelector(malachiVerses);
//   } else if (randomBook === "Matthew") {
//     lastChapter = matthewVerses[matthewVerses.length - 1].chapterNumber;
//     return randomVerseSelector(matthewVerses);
//   } else if (randomBook === "Mark") {
//     lastChapter = markVerses[markVerses.length - 1].chapterNumber;
//     return randomVerseSelector(markVerses);
//   } else if (randomBook === "Luke") {
//     lastChapter = lukeVerses[lukeVerses.length - 1].chapterNumber;
//     return randomVerseSelector(lukeVerses);
//   } else if (randomBook === "John") {
//     lastChapter = johnVerses[johnVerses.length - 1].chapterNumber;
//     return randomVerseSelector(johnVerses);
//   } else if (randomBook === "Acts") {
//     lastChapter = actsVerses[actsVerses.length - 1].chapterNumber;
//     return randomVerseSelector(actsVerses);
//   } else if (randomBook === "Romans") {
//     lastChapter = romansVerses[romansVerses.length - 1].chapterNumber;
//     return randomVerseSelector(romansVerses);
//   } else if (randomBook === "1 Corinthians") {
//     lastChapter = firstCorinthiansVerses[firstCorinthiansVerses.length - 1].chapterNumber;
//     return randomVerseSelector(firstCorinthiansVerses);
//   } else if (randomBook === "2 Corinthians") {
//     lastChapter = secondCorinthiansVerses[firstCorinthiansVerses.length - 1].chapterNumber;
//     return randomVerseSelector(firstCorinthiansVerses);
//   } else if (randomBook === "Galatians") {
//     lastChapter = galatiansVerses[galatiansVerses.length - 1].chapterNumber;
//     return randomVerseSelector(galatiansVerses);
//   } else if (randomBook === "Ephesians") {
//     lastChapter = ephesiansVerses[ephesiansVerses.length - 1].chapterNumber;
//     return randomVerseSelector(ephesiansVerses);
//   } else if (randomBook === "Philippians") {
//     lastChapter = philippiansVerses[philippiansVerses.length - 1].chapterNumber;
//     return randomVerseSelector(philippiansVerses);
//   } else if (randomBook === "Colossians") {
//     lastChapter = colossiansVerses[colossiansVerses.length - 1].chapterNumber;
//     return randomVerseSelector(colossiansVerses);
//   } else if (randomBook === "1 Thessalonians") {
//     lastChapter = firstThessaloniansVerses[firstThessaloniansVerses.length - 1].chapterNumber;
//     return randomVerseSelector(firstThessaloniansVerses);
//   } else if (randomBook === "2 Thessalonians") {
//     lastChapter = secondThessaloniansVerses[secondThessaloniansVerses.length - 1].chapterNumber;
//     return randomVerseSelector(secondThessaloniansVerses);
//   } else if (randomBook === "1 Timothy") {
//     lastChapter = firstTimothyVerses[firstTimothyVerses.length - 1].chapterNumber;
//     return randomVerseSelector(firstTimothyVerses);
//   } else if (randomBook === "2 Timothy") {
//     lastChapter = secondTimothyVerses[secondTimothyVerses.length - 1].chapterNumber;
//     return randomVerseSelector(secondTimothyVerses);
//   } else if (randomBook === "Titus") {
//     lastChapter = titusVerses[titusVerses.length - 1].chapterNumber;
//     return randomVerseSelector(titusVerses);
//   } else if (randomBook === "Philemon") {
//     lastChapter = philemonVerses[philemonVerses.length - 1].chapterNumber;
//     return randomVerseSelector(philemonVerses);
//   } else if (randomBook === "Hebrews") {
//     lastChapter = hebrewsVerses[hebrewsVerses.length - 1].chapterNumber;
//     return randomVerseSelector(hebrewsVerses);
//   } else if (randomBook === "James") {
//     lastChapter = jamesVerses[jamesVerses.length - 1].chapterNumber;
//     return randomVerseSelector(jamesVerses);
//   } else if (randomBook === "1 Peter") {
//     lastChapter = firstPeterVerses[firstPeterVerses.length - 1].chapterNumber;
//     return randomVerseSelector(firstPeterVerses);
//   } else if (randomBook === "2 Peter") {
//     lastChapter = secondPeterVerses[secondPeterVerses.length - 1].chapterNumber;
//     return randomVerseSelector(secondPeterVerses);
//   } else if (randomBook === "1 John") {
//     lastChapter = firstJohnVerses[firstJohnVerses.length - 1].chapterNumber;
//     return randomVerseSelector(firstJohnVerses);
//   } else if (randomBook === "2 John") {
//     lastChapter = secondJohnVerses[secondJohnVerses.length - 1].chapterNumber;
//     return randomVerseSelector(secondJohnVerses);
//   } else if (randomBook === "3 John") {
//     lastChapter = thirdJohnVerses[thirdJohnVerses.length - 1].chapterNumber;
//     return randomVerseSelector(thirdJohnVerses);
//   } else if (randomBook === "Jude") {
//     lastChapter = judeVerses[judeVerses.length - 1].chapterNumber;
//     return randomVerseSelector(judeVerses);
//   } else if (randomBook === "Revelation") {
//     lastChapter = revelationVerses[revelationVerses.length - 1].chapterNumber;
//     return randomVerseSelector(revelationVerses);
//   }
// }





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
