const LengthError = require('./validateAsciiErrors/Length')
const NotStringError = require('./validateAsciiErrors/NotString')
const NotInDictionaryError = require('./validateAsciiErrors/NotInDictionary')

module.exports = function validateAscii(ascii, length, dictionary) {
  if (typeof ascii !== 'string') {
    throw new NotStringError
  }

  if (!Number.isNaN(length)) {
    if (ascii.length !== length) {
      throw new LengthError
    }
  }

  for (let i = 0; i < ascii.length; i++) {
    const letter = ascii[i]
    if (dictionary.indexOf(letter) === -1) {
      throw new NotInDictionaryError
    }
  }
}
