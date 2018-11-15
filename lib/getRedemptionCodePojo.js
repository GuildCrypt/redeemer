const currentYear = (new Date()).getFullYear()

function unencode(asciiEncoding) {
  return (new Buffer(asciiEncoding)).toString('ascii')
}

function splitUint8Array(_uint8Array) {
  const parts = []
  let uint8Array = _uint8Array

  while(uint8Array.length > 0) {
    const indexOfZero = uint8Array.indexOf(0)
    if (indexOfZero >= 0) {
      parts.push(uint8Array.slice(0, indexOfZero))
      uint8Array = uint8Array.slice(indexOfZero + 1)
    } else {
      parts.push(uint8Array)
      uint8Array = new Uint8Array(0)
    }
  }

  return parts
}

module.exports = function getRedemptionCodePojo(redemptionCodeEncoding) {

  const uint8ArrayParts = splitUint8Array(redemptionCodeEncoding.slice(34))

  return {
    nonce: redemptionCodeEncoding.slice(1, 33),
    birthYearAscii: unencode(uint8ArrayParts[0]),
    birthMonthAscii: unencode(uint8ArrayParts[1]),
    birthDayAscii: unencode(uint8ArrayParts[2]),
    lastNameAscii: unencode(uint8ArrayParts[3]),
    firstNameAscii: unencode(uint8ArrayParts[4])
  }
}
