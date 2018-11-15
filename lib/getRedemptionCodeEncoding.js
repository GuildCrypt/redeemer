const crypto = require('crypto')
const validateAscii = require('./validateAscii')
const birthDictionary = require('./dictionaries/birth')
const nameDictionary = require('./dictionaries/name')

const currentYear = (new Date()).getFullYear()

function encode(ascii) {
  return new Uint8Array(Buffer.from(ascii, 'ascii'))
}

module.exports = function getRedemptionCodeEncoding(redemptionCodePojo) {
  validateAscii(redemptionCodePojo.birthYearAscii, 4, birthDictionary)
  validateAscii(redemptionCodePojo.birthMonthAscii, 2, birthDictionary)
  validateAscii(redemptionCodePojo.birthDayAscii, 2, birthDictionary)
  validateAscii(redemptionCodePojo.firstNameAscii, NaN, nameDictionary)
  validateAscii(redemptionCodePojo.lastNameAscii, NaN, nameDictionary)

  const keys = ['birthYearAscii', 'birthMonthAscii', 'birthDayAscii', 'lastNameAscii', 'firstNameAscii']

  const length = keys.reduce((length, key) => {
    return length + 1 + redemptionCodePojo[key].length
  }, 0) + 33

  const redemptionCodeEncoding = new Uint8Array(length)

  redemptionCodeEncoding.fill(0)
  redemptionCodeEncoding.set(redemptionCodePojo.nonce, 1)

  let offset = 34
  keys.forEach((key) => {
    const valueEncoding = encode(redemptionCodePojo[key])
    redemptionCodeEncoding.set(valueEncoding, offset)
    offset += (1 + valueEncoding.length)
  })

  return redemptionCodeEncoding
}
