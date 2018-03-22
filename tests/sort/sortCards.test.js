const { expect } = require('chai')

const { sortCards } = require('../../src/lib/sort')

describe('sortCards', () => {
  it('sorts cards by face in descending order', () => {

    const cards = [
      { face: 7, suit: 'S'},
      { face: 5, suit: 'H'},
      { face: 4, suit: 'C'},
      { face: 6, suit: 'D'},
      { face: 8, suit: 'S'}
    ]

    const expected = [
      { face: 8, suit: 'S'},
      { face: 7, suit: 'S'},
      { face: 6, suit: 'D'},
      { face: 5, suit: 'H'},
      { face: 4, suit: 'C'}
    ]

    expect(sortCards(cards)).to.be.deep.equal(expected)
  })
})
