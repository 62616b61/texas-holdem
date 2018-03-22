const { expect } = require('chai')

const { parse } = require('../../src/lib/process')

describe('parse', () => {
  it('should transform an array of string into array of objects', () => {
    const cards = [
      '2S', '3H', '4C', '5D',
      '6S', '7H', '8C', '9D',
      'TS', 'JH', 'QC', 'KD', 'AS'
    ]

    const expected = [
      { face: 2, suit: 'S'},
      { face: 3, suit: 'H'},
      { face: 4, suit: 'C'},
      { face: 5, suit: 'D'},

      { face: 6, suit: 'S'},
      { face: 7, suit: 'H'},
      { face: 8, suit: 'C'},
      { face: 9, suit: 'D'},

      { face: 10, suit: 'S'},
      { face: 11, suit: 'H'},
      { face: 12, suit: 'C'},
      { face: 13, suit: 'D'},

      { face: 14, suit: 'S'}
    ]

    expect(parse(cards)).to.be.deep.equal(expected)
  })
})
