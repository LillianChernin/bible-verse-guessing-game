
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
  currentObj.section = "New Testament";
  dataArray.push(currentObj);
});


JSON.stringify(dataArray);
