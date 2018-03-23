const { expect } = require('chai')

const app = require('../src/app')

describe('app', () => {
  it('runs app and receives output', () => {
    const table = ['KS', 'AD', '3H', '7C', 'TD']
    const players = [
      { name: 'John', cards: ['9H', '7S'] },
      { name: 'Becky', cards: ['JD', 'QC'] },
      { name: 'Sam', cards: ['AC', 'KH'] }
    ]

    const expected = "1 Becky Straight Ace\n" +
      "2 Sam Two Pair Ace King\n" +
      "3 John Pair Seven"

    expect(app(table, players)).to.be.deep.equal(expected)
  })
})
