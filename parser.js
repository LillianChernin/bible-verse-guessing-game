
const dataArray = [];

const retrieveVerseNumber = function(currentText) {
  let curTexArr = currentText.split('');
  for (let i = 0; i < curTexArr.length; i++) {
    if ((curTexArr[i].charCodeAt(0) >= 65 && curTexArr[i].charCodeAt(0) <= 90) || (curTexArr[i].charCodeAt(0) >= 97 && curTexArr[i].charCodeAt(0) <= 122)) {
      return curTexArr.slice(0, i).join('');
    }
  }
}

const retrieveVerseText = function(currentText) {
  let curTexArr = currentText.split('');
  for (let i = 0; i < curTexArr.length; i++) {
    if ((curTexArr[i].charCodeAt(0) >= 65 && curTexArr[i].charCodeAt(0) <= 90) || (curTexArr[i].charCodeAt(0) >= 97 && curTexArr[i].charCodeAt(0) <= 122)) {
      return curTexArr.slice(i).join('');
    }
  }
}


$('.verse').each(function(i, obj) {
  let currentObj = {};
  let currentText = $(this).text();
  currentObj.verseText = retrieveVerseText(currentText);
  currentObj.verseNumber = retrieveVerseNumber(currentText);
  currentObj.bookName = "John";
  currentObj.chapterNumber = 1;
  currentObj.section = "Old Testament";
  dataArray.push(currentObj);
});

JSON.stringify(dataArray);

//
// for (let j = 0; j < books.length; j++) {
//   for (let i = 0; i < books[j].length; i++) {
//     let updatedVerseNum = Number(books[j][i].verseNumber);
//     if (updatedVerseNum === 0) {
//       books[j][i - 1].verseText = books[j][i - 1].verseText + " " + books[j][i].verseText;
//       books[j].splice(i, 1);
//       i--;
//     } else if (updatedVerseNum === NaN) {
//       if (books[j][i].verseNumber.split('').length === 1) {
//         books[j][i - 1].verseText = books[j][i - 1].verseText + " " + books[j][i].verseText;
//         books[j].splice(i, 1);
//         i--;
//       }
//     }
//   }
// }

let finalCheck = [];
for (let j = 0; j < books.length; j++) {
  for (let i = 0; i < books[j].length; i++) {
    let updatedVerseNum = Number(books[j][i].verseNumber);
    if (updatedVerseNum === 0) {
      books[j][i - 1].verseText = books[j][i - 1].verseText + " " + books[j][i].verseText;
      books[j].splice(i, 1);
      i--;
    } else if (updatedVerseNum === NaN) {
      if (books[j][i].verseNumber.split('').length === 1) {
        books[j][i - 1].verseText = books[j][i - 1].verseText + " " + books[j][i].verseText;
        books[j].splice(i, 1);
        i--;
      }
    }
  }
  let badIndexArray = [];
  for (let k = 0; k < books[j].length; k++) {
    books[j][k].verseNumber = Number(books[j][k].verseNumber)
    if (books[j][k].verseNumber > 0) {
    } else {
      badIndexArray.push(k);
    }
  }
  for (let m = 0; m < badIndexArray.length; m++) {
    if (books[j][badIndexArray[m] - 1].chapterNumber === books[j][badIndexArray[m]].chapterNumber && books[j][badIndexArray[m] - 1].verseNumber > 0) {
      books[j][badIndexArray[m]].verseNumber = books[j][badIndexArray[m] - 1].verseNumber + 1;
    } else if (books[j][badIndexArray[m]].chapterNumber === books[j][badIndexArray[m] + 1].chapterNumber && books[j][badIndexArray[m] + 1].verseNumber > 0) {
      books[j][badIndexArray[m]].verseNumber = books[j][badIndexArray[m] + 1].verseNumber - 1;
    } else if (books[j][badIndexArray[m] - 2].chapterNumber === books[j][badIndexArray[m]].chapterNumber && books[j][badIndexArray[m] - 2].verseNumber > 0) {
      books[j][badIndexArray[m]].verseNumber = books[j][badIndexArray[m] - 2].verseNumber + 2;
    } else if (books[j][badIndexArray[m] + 2].chapterNumber === books[j][badIndexArray[m]].chapterNumber && books[j][badIndexArray[m] + 2].verseNumber > 0) {
      books[j][badIndexArray[m]].verseNumber = books[j][badIndexArray[m] + 2].verseNumber - 2;
    }
  }
  for (let n = 0; n < books[j].length; n++) {
    if (books[j][n].verseNumber > 0) {
    } else {
      finalCheck.push("index: " + n + " book: " + books[j][n].bookName);
    }
  }
}

deuteronomyVerses[610].verseNumber = 1;
isaiahVerses[609].verseText = isaiahVerses[608].verseText + " " + isaiahVerses[609].verseText;
isaiahVerses.splice(608, 1);
revelationVerses[50].verseText = revelationVerses[49].verseText + " " + revelationVerses[50].verseText;
revelationVerses.splice(49, 1);

for (let j = 0; j < books.length; j++) {
  // console.log(books[j][1].bookName + " starting length: " + books[j].length);
  let startingLength = books[j].length;
  let dupVerseNums = []
  let secondDupCheck = [];
  for (let i = 0; i < books[j].length - 1; i++) {
    if (books[j][i].verseNumber === books[j][i + 1].verseNumber) {
      dupVerseNums.push(i);
      books[j][i - 1].verseText = books[j][i - 1].verseText + " " + books[j][i].verseText;
      books[j].splice(i, 1);
      i--;
    }
  }
  // console.log(books[j][1].bookName + " first run: " + dupVerseNums.length);
  for (let i = 0; i < books[j].length - 1; i++) {
    if (books[j][i].verseNumber === books[j][i + 1].verseNumber) {
      secondDupCheck.push(i);
    }
  }
  console.log(books[j][1].bookName + " second run: " + secondDupCheck.length);
  if (startingLength - dupVerseNums.length !== books[j].length) {
    console.log(books[j][1].bookName + " has an ERROR!!");
  }
}
const updatedBooksArray = [];

for (let j = 0; j < books.length; j++) {
  let currentBook = [];
  let lastChapterNumber = Number(books[j][books[j].length - 1].chapterNumber);
  for (let k = 0; k < lastChapterNumber; k++) {
    currentBook.push([]);
  }
  for (let i = 0; i < books[j].length; i++) {
    let currentChapter = Number(books[j][i].chapterNumber);
    currentBook[currentChapter - 1].push(books[j][i]);
  }
  updatedBooksArray.push(currentBook);
}





// let dupVerseNums = []
// for (let i = 0; i < isaiahVerses.length - 1; i++) {
//   if (isaiahVerses[i].verseNumber === isaiahVerses[i + 1].verseNumber) {
//     dupVerseNums.push(i);
//     isaiahVerses[i - 1].verseText = isaiahVerses[i - 1].verseText + " " + isaiahVerses[i].verseText;
//     isaiahVerses.splice(i, 1);
//     i--;
//   }
// }



//
//
// let badIndexArray = [];
// for (let i = 0; i < psalmsVerses.length; i++) {
//   psalmsVerses[i].verseNumber = Number(psalmsVerses[i].verseNumber)
//   if (psalmsVerses[i].verseNumber > 0) {
//   } else  {
//     badIndexArray.push(i);
//   }
// }
//
// for (let i = 0; i < badIndexArray.length; i++) {
//   if (psalmsVerses[badIndexArray[i] - 1].chapterNumber === psalmsVerses[badIndexArray[i]].chapterNumber && psalmsVerses[badIndexArray[i] - 1].verseNumber > 0) {
//     psalmsVerses[badIndexArray[i]].verseNumber = psalmsVerses[badIndexArray[i] - 1].verseNumber + 1;
//   } else if (psalmsVerses[badIndexArray[i]].chapterNumber === psalmsVerses[badIndexArray[i] + 1].chapterNumber && psalmsVerses[badIndexArray[i] + 1].verseNumber > 0) {
//     psalmsVerses[badIndexArray[i]].verseNumber = psalmsVerses[badIndexArray[i] + 1].verseNumber - 1;
//   } else if (psalmsVerses[badIndexArray[i] - 2].chapterNumber === psalmsVerses[badIndexArray[i]].chapterNumber && psalmsVerses[badIndexArray[i] - 2].verseNumber > 0) {
//     psalmsVerses[badIndexArray[i]].verseNumber = psalmsVerses[badIndexArray[i] - 2].verseNumber + 2;
//   } else if (psalmsVerses[badIndexArray[i] + 2].chapterNumber === psalmsVerses[badIndexArray[i]].chapterNumber && psalmsVerses[badIndexArray[i] + 2].verseNumber > 0) {
//     psalmsVerses[badIndexArray[i]].verseNumber = psalmsVerses[badIndexArray[i] + 2].verseNumber - 2;
//   }
// }

// let verseNumberTracker = 0;
// for (let i = 0; i < psalmsVerses.length; i++) {
//   verseNumberTracker++;
//   if (i < psalmsVerses.length - 1 && verseNumberTracker > 1 && (psalmsVerses[i].verseNumber === 1 || psalmsVerses[i + 1].verseNumber === 2)) {
//     verseNumberTracker = 1;
//     psalmsVerses[i].verseNumber = 1;
//     psalmsVerses[i + 1].verseNumber === 2
//   } else if (verseNumberTracker !== psalmsVerses[i].verseNumber) {
//     psalmsVerses[i].verseNumber = verseNumberTracker;
//   }
// }
