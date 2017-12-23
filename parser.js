
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
}


JSON.stringify(dataArray);
