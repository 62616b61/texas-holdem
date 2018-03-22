const { expect } = require('chai')

const { combinations } = require('../../src/lib/process')

describe('combinations', () => {
  it('should create an array of combinations for given table and player', () => {
    const table = [1, 2, 3, 4, 5]
    const player = [6, 7]

    const expected = [
      [6, 7, 3, 4, 5],
      [6, 2, 7, 4, 5],
      [6, 2, 3, 7, 5],
      [6, 2, 3, 4, 7],
      [1, 6, 7, 4, 5],
      [1, 6, 3, 7, 5],
      [1, 6, 3, 4, 7],
      [1, 2, 6, 7, 5],
      [1, 2, 6, 4, 7],
      [1, 2, 3, 6, 7],
    ]

    expect(combinations(table, player)).to.be.deep.equal(expected)
  })
})
