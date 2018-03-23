const { expect } = require('chai')

const { count } = require('../../src/lib/process')

describe('count', () => {
  it('count cards', () => {
    const players = [
      [
        { face: 2, suit: 'S'},
        { face: 3, suit: 'H'},
        { face: 4, suit: 'C'},
        { face: 5, suit: 'D'},
        { face: 6, suit: 'S'},
      ],
      [
        { face: 2, suit: 'S'},
        { face: 2, suit: 'H'},
        { face: 2, suit: 'C'},
        { face: 2, suit: 'D'},
        { face: 3, suit: 'S'},
      ],
      [
        { face: 2, suit: 'S'},
        { face: 2, suit: 'H'},
        { face: 3, suit: 'C'},
        { face: 3, suit: 'D'},
        { face: 4, suit: 'S'},
      ],
      [
        { face: 2, suit: 'S'},
        { face: 2, suit: 'H'},
        { face: 3, suit: 'C'},
        { face: 3, suit: 'D'},
        { face: 3, suit: 'S'},
      ],

    ]

    const expected = [
      { 2: 1, 3: 1, 4: 1, 5:1, 6:1},
      { 2: 4, 3: 1 },
      { 2: 2, 3: 2, 4: 1 },
      { 2: 2, 3: 3 },
    ]

    players.forEach((cards, i) => {
      expect(count(cards)).to.be.deep.equal(expected[i])
    })
  })
})
