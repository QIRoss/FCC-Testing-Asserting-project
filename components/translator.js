const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

const getObjectWithSwappedKeyValue = (obj) => {
  const newObj = {};

  for (let key in obj) {
    const value = obj[key];
    newObj[value] = key;
  }

  return newObj;
};

const getObjectSortedByKeyLength = (obj) => {
  const arr = Object.keys(obj).sort((str1, str2) => {
    return str2.length - str1.length;
  });

  const newObj = {};

  arr.map(str => {
    newObj[str] = obj[str];
  });

  return newObj;
};

const getHighlightedText = (text) => {
  return `<span class="highlight">${text}</span>`;
};

const translateWord = (text, wordLookup) => {
  const matches = {};

  // Match for entry with multiple words in lookup before checking every words
  Object.keys(wordLookup).map(word => {
    if (!word.includes(' ')) {
      return;
    }

    if (text.toLowerCase().includes(word)) {
      matches[word] = wordLookup[word];
    }
  });

  const words = text.match(/\w+['-]\w+|\w+/g);

  words.map(word => {
    const replacement = wordLookup[word.toLowerCase()];
    if (replacement) {
      matches[word] = replacement;
    }
  });

  let translated = text;
  Object.keys(matches).map(match => {
    const regex = new RegExp(match, 'gi');
    translated = translated.replace(regex, getHighlightedText(matches[match]));
  });

  return translated;
};

const translateTitle = (text, titleLookup) => {
  let translated = text;

  const regex = new RegExp(Object.keys(titleLookup).join('|'), 'gi');
  const matchingTitles = text.match(regex);

  if (matchingTitles) {
    matchingTitles.map(matchingTitle => {
      const lowerCaseMatchingTitle = matchingTitle.toLowerCase();
      const match = titleLookup[lowerCaseMatchingTitle];
      const title = match[0].toUpperCase() + match.slice(1);
      const highlighted = getHighlightedText(title);

      translated = translated.replace(matchingTitle, highlighted);
    });
  }

  return translated;
};

const translateTime = (text, timeRegex, locale) => {
  const timeSeparatorToBeReplaced = (locale === 'to-british') ? ':' : '.';
  const timeSeparatorReplacement = (locale === 'to-british') ? '.' : ':';
  const matchingTimes = text.match(timeRegex);
  let translation = text;

  if (matchingTimes) {
    matchingTimes.map(matchingTime => {
      const replacedMatchingTime = matchingTime.replace(timeSeparatorToBeReplaced,
        timeSeparatorReplacement);
      const highlighted = getHighlightedText(replacedMatchingTime);

      translation = translation.replace(matchingTime, highlighted);
    });
  }

  return translation;
}

const translate = (text, wordLookup, titleLookup, timeRegex, locale) => {
  let translation = text;

  const wordRegex = new RegExp(Object.keys(wordLookup).join('|'), 'gi');
  const matchingWords = text.match(wordRegex);
  const titleRegex = new RegExp(Object.keys(titleLookup).join('|'), 'gi');
  const matchingTitles = text.match(titleRegex);

  translation = translateWord(translation, wordLookup, matchingWords);
  translation = translateTitle(translation, titleLookup, matchingTitles);

  return translateTime(translation, timeRegex, locale);
}

class Translator {
  toBritishEnglish(text) {
    const wordLookup = {
      ...americanOnly,
      ...americanToBritishSpelling
    };

    const sortedCombined = getObjectSortedByKeyLength(wordLookup);
    const titleLookup = getObjectSortedByKeyLength(americanToBritishTitles);
    const timeRegex = /(2[0-3]|1[0-9]|0[0-9]|[0-9]):[0-5][0-9]/g;

    return translate(text, sortedCombined, titleLookup, timeRegex, 'to-british');
  }

  toAmericanEnglish(text) {
    const wordLookup = {
      ...britishOnly,
      ...getObjectWithSwappedKeyValue(americanToBritishSpelling),
    };

    const sortedCombined = getObjectSortedByKeyLength(wordLookup);
    const britishTitleLookup = getObjectWithSwappedKeyValue(americanToBritishTitles);
    const titleLookup = getObjectSortedByKeyLength(britishTitleLookup);
    const timeRegex = /(2[0-3]|1[0-9]|0[0-9]|[0-9]).[0-5][0-9]/g;

    return translate(text, sortedCombined, titleLookup, timeRegex, 'to-american');
  }
}

module.exports = Translator;
