const getRedemptionCodeEncoding = require('../lib/getRedemptionCodeEncoding')
const getRedemptionCodePojo = require('../lib/getRedemptionCodePojo')
const crypto = require('crypto')

describe('encodeRedemptionCode', () => {

  const redemptionCodePojo = {
    nonce: new Uint8Array(crypto.randomBytes(32)),
    birthYearAscii: '1991',
    birthMonthAscii: '05',
    birthDayAscii: '03',
    lastNameAscii: 'Doe',
    firstNameAscii: 'John'
  }

  let redemptionCodeEncoding
  let redemptionCodePojo1

  it('should get redemptionCodeEncoding', () => {
    redemptionCodeEncoding = getRedemptionCodeEncoding(redemptionCodePojo)
  })

  it('should have correct redemption encopding', () => {
    const expectedEncoding = [0]
    expectedEncoding.push(...Array.from(redemptionCodePojo.nonce))
    expectedEncoding.push(...[
      0,
      49, 57, 57, 49,
      0,
      48, 53,
      0,
      48, 51,
      0,
      68, 111, 101,
      0,
      74, 111, 104, 110
    ])
    const differences = []
    expectedEncoding.forEach((byte, index) => {
      differences.push(byte - redemptionCodeEncoding[index])
    } )
    redemptionCodeEncoding.should.deep.equal(new Uint8Array(expectedEncoding))
  })

  it('should get redemptionCodePojo1', () => {
    redemptionCodePojo1 = getRedemptionCodePojo(redemptionCodeEncoding)
  })

  describe('redemptionCodePojo should match redemptionCodePojo1', () => {
    Object.keys(redemptionCodePojo).forEach((key) => {
      it(`redemptionCodePojo.${key} should equal redemptionCodePojo1.${key}`, () => {
        redemptionCodePojo[key].should.deep.equal(redemptionCodePojo1[key])
      })
    })
  })
})
