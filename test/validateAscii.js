const validateAscii = require('../lib/validateAscii')
const birthDictionary = require('../lib/dictionaries/birth')
const nameDictionary = require('../lib/dictionaries/name')
const LengthError = require('../lib/validateAsciiErrors/Length')
const NotStringError = require('../lib/validateAsciiErrors/NotString')
const NotInDictionaryError = require('../lib/validateAsciiErrors/NotInDictionary')

describe('validateAscii', () => {
  it('should throw NotStringError', () => {
    (() => {
      validateAscii(8, NaN, birthDictionary)
    }).should.throw(NotStringError);
    (() => {
      validateAscii({}, NaN, birthDictionary)
    }).should.throw(NotStringError);
  })
  it('should throw LengthError', () => {
    (() => {
      validateAscii('8', 2, birthDictionary)
    }).should.throw(LengthError);
    (() => {
      validateAscii('8', 0, birthDictionary)
    }).should.throw(LengthError);
  })
  it('should throw NotInDictionaryError', () => {
    (() => {
      validateAscii('8  ', NaN, birthDictionary)
    }).should.throw(NotInDictionaryError);
    (() => {
      validateAscii('8\r', NaN, birthDictionary)
    }).should.throw(NotInDictionaryError);
    (() => {
      validateAscii('8\n', NaN, birthDictionary)
    }).should.throw(NotInDictionaryError);
  })
})
