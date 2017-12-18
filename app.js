
let precedingVerse = {};
let currentRandomVerse = {};
let succeedingVerse = {};

const books = ["genesis", "matthew", "mark", "luke", "john"];

const randomBookSelector = () => {
  let randomNum = Math.floor(Math.random() * books.length);
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
    return randomVerseSelector(genesisVerses);
  } else if (randomBook === "matthew") {
    return randomVerseSelector(matthewVerses);
  } else if (randomBook === "mark") {
    return randomVerseSelector(markVerses);
  } else if (randomBook === "luke") {
    return randomVerseSelector(lukeVerses);
  } else if (randomBook === "john") {
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


const updateRandomVerse = () => {
  randomVerseGenerator();
  $('#randomVerse').text(currentRandomVerse.verseText);
  $('#precedingVerse').text(precedingVerse.verseText);
  $('#succeedingVerse').text(succeedingVerse.verseText);
}

updateRandomVerse();
getHint();





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
