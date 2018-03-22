const { expect } = require('chai')

const { handToNum } = require('../../src/lib/other')
const {
  HIGH_CARD,
  PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  STRAIGHT,
  FLUSH,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  STRAIGHT_FLUSH,
} = handToNum

const { sortRanks } = require('../../src/lib/sort')

describe('sortRanks', () => {
  it('sorts ranks by combo in descending order', () => {
    const ranks = [
      { combo: FLUSH },
      { combo: STRAIGHT },
      { combo: THREE_OF_A_KIND },
      { combo: HIGH_CARD },
      { combo: TWO_PAIR },
      { combo: FULL_HOUSE },
      { combo: STRAIGHT_FLUSH },
      { combo: FOUR_OF_A_KIND },
      { combo: PAIR }
    ]

    const expected = [
      { combo: STRAIGHT_FLUSH },
      { combo: FOUR_OF_A_KIND },
      { combo: FULL_HOUSE },
      { combo: FLUSH },
      { combo: STRAIGHT },
      { combo: THREE_OF_A_KIND },
      { combo: TWO_PAIR },
      { combo: PAIR },
      { combo: HIGH_CARD }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })

  it('sorts High Card ranks by result in descending order', () => {
    const ranks = [
      { combo: HIGH_CARD, result: [13] },
      { combo: HIGH_CARD, result: [3] },
      { combo: HIGH_CARD, result: [5] },
      { combo: HIGH_CARD, result: [8] },
      { combo: HIGH_CARD, result: [14] },
      { combo: HIGH_CARD, result: [2] }
    ]

    const expected = [
      { combo: HIGH_CARD, result: [14] },
      { combo: HIGH_CARD, result: [13] },
      { combo: HIGH_CARD, result: [8] },
      { combo: HIGH_CARD, result: [5] },
      { combo: HIGH_CARD, result: [3] },
      { combo: HIGH_CARD, result: [2] }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })

  it('sorts Pair ranks by result in descending order', () => {
    const ranks = [
      { combo: PAIR, result: [13] },
      { combo: PAIR, result: [3] },
      { combo: PAIR, result: [5] },
      { combo: PAIR, result: [8] },
      { combo: PAIR, result: [14] },
      { combo: PAIR, result: [2] }
    ]

    const expected = [
      { combo: PAIR, result: [14] },
      { combo: PAIR, result: [13] },
      { combo: PAIR, result: [8] },
      { combo: PAIR, result: [5] },
      { combo: PAIR, result: [3] },
      { combo: PAIR, result: [2] }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })

  it('sorts Two Pair ranks by result in descending order', () => {
    const ranks = [
      { combo: TWO_PAIR, result: [13, 9] },
      { combo: TWO_PAIR, result: [14, 8] },
      { combo: TWO_PAIR, result: [14, 13] },
      { combo: TWO_PAIR, result: [7, 5] },
      { combo: TWO_PAIR, result: [13, 10] },
      { combo: TWO_PAIR, result: [8, 2] }
    ]

    const expected = [
      { combo: TWO_PAIR, result: [14, 13] },
      { combo: TWO_PAIR, result: [14, 8] },
      { combo: TWO_PAIR, result: [13, 10] },
      { combo: TWO_PAIR, result: [13, 9] },
      { combo: TWO_PAIR, result: [8, 2] },
      { combo: TWO_PAIR, result: [7, 5] }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })

  it('sorts Three of a Kind ranks by result in descending order', () => {
    const ranks = [
      { combo: THREE_OF_A_KIND, result: [13] },
      { combo: THREE_OF_A_KIND, result: [14] },
      { combo: THREE_OF_A_KIND, result: [12] },
      { combo: THREE_OF_A_KIND, result: [7] },
      { combo: THREE_OF_A_KIND, result: [10] },
      { combo: THREE_OF_A_KIND, result: [8] }
    ]

    const expected = [
      { combo: THREE_OF_A_KIND, result: [14] },
      { combo: THREE_OF_A_KIND, result: [13] },
      { combo: THREE_OF_A_KIND, result: [12] },
      { combo: THREE_OF_A_KIND, result: [10] },
      { combo: THREE_OF_A_KIND, result: [8] },
      { combo: THREE_OF_A_KIND, result: [7] }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })

  it('sorts Straight ranks by result in descending order', () => {
    const ranks = [
      { combo: STRAIGHT, result: [11] },
      { combo: STRAIGHT, result: [9] },
      { combo: STRAIGHT, result: [10] },
      { combo: STRAIGHT, result: [12] },
      { combo: STRAIGHT, result: [14] },
      { combo: STRAIGHT, result: [13] },
      { combo: STRAIGHT, result: [7] },
      { combo: STRAIGHT, result: [8] }
    ]

    const expected = [
      { combo: STRAIGHT, result: [14] },
      { combo: STRAIGHT, result: [13] },
      { combo: STRAIGHT, result: [12] },
      { combo: STRAIGHT, result: [11] },
      { combo: STRAIGHT, result: [10] },
      { combo: STRAIGHT, result: [9] },
      { combo: STRAIGHT, result: [8] },
      { combo: STRAIGHT, result: [7] }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })

  it('sorts Flush ranks by result in descending order', () => {
    const ranks = [
      { combo: FLUSH, result: [8, 5, 2, 2, 2] },
      { combo: FLUSH, result: [13, 12, 11, 8, 2] },
      { combo: FLUSH, result: [14, 13, 12, 11, 10] },
      { combo: FLUSH, result: [8, 5, 3, 2, 2] },
      { combo: FLUSH, result: [14, 13, 12, 11, 8] },
      { combo: FLUSH, result: [13, 12, 11, 9, 2] },
      { combo: FLUSH, result: [14, 13, 12, 11, 9] }
    ]

    const expected = [
      { combo: FLUSH, result: [14, 13, 12, 11, 10] },
      { combo: FLUSH, result: [14, 13, 12, 11, 9] },
      { combo: FLUSH, result: [14, 13, 12, 11, 8] },
      { combo: FLUSH, result: [13, 12, 11, 9, 2] },
      { combo: FLUSH, result: [13, 12, 11, 8, 2] },
      { combo: FLUSH, result: [8, 5, 3, 2, 2] },
      { combo: FLUSH, result: [8, 5, 2, 2, 2] }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })

  it('sorts Full House ranks by result in descending order', () => {
    const ranks = [
      { combo: FULL_HOUSE, result: [7, 6] },
      { combo: FULL_HOUSE, result: [3, 2] },
      { combo: FULL_HOUSE, result: [9, 9] },
      { combo: FULL_HOUSE, result: [14, 13] },
      { combo: FULL_HOUSE, result: [7, 3] },
      { combo: FULL_HOUSE, result: [14, 9] }
    ]

    const expected = [
      { combo: FULL_HOUSE, result: [14, 13] },
      { combo: FULL_HOUSE, result: [14, 9] },
      { combo: FULL_HOUSE, result: [9, 9] },
      { combo: FULL_HOUSE, result: [7, 6] },
      { combo: FULL_HOUSE, result: [7, 3] },
      { combo: FULL_HOUSE, result: [3, 2] }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })

  it('sorts Four of a Kind ranks by result in descending order', () => {
    const ranks = [
      { combo: FOUR_OF_A_KIND, result: [11] },
      { combo: FOUR_OF_A_KIND, result: [9] },
      { combo: FOUR_OF_A_KIND, result: [10] },
      { combo: FOUR_OF_A_KIND, result: [12] },
      { combo: FOUR_OF_A_KIND, result: [14] },
      { combo: FOUR_OF_A_KIND, result: [13] },
      { combo: FOUR_OF_A_KIND, result: [7] },
      { combo: FOUR_OF_A_KIND, result: [8] }
    ]

    const expected = [
      { combo: FOUR_OF_A_KIND, result: [14] },
      { combo: FOUR_OF_A_KIND, result: [13] },
      { combo: FOUR_OF_A_KIND, result: [12] },
      { combo: FOUR_OF_A_KIND, result: [11] },
      { combo: FOUR_OF_A_KIND, result: [10] },
      { combo: FOUR_OF_A_KIND, result: [9] },
      { combo: FOUR_OF_A_KIND, result: [8] },
      { combo: FOUR_OF_A_KIND, result: [7] }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })

  it('sorts Straight Flush ranks by result in descending order', () => {
    const ranks = [
      { combo: STRAIGHT_FLUSH, result: [11] },
      { combo: STRAIGHT_FLUSH, result: [9] },
      { combo: STRAIGHT_FLUSH, result: [10] },
      { combo: STRAIGHT_FLUSH, result: [12] },
      { combo: STRAIGHT_FLUSH, result: [14] },
      { combo: STRAIGHT_FLUSH, result: [13] },
      { combo: STRAIGHT_FLUSH, result: [7] },
      { combo: STRAIGHT_FLUSH, result: [8] }
    ]

    const expected = [
      { combo: STRAIGHT_FLUSH, result: [14] },
      { combo: STRAIGHT_FLUSH, result: [13] },
      { combo: STRAIGHT_FLUSH, result: [12] },
      { combo: STRAIGHT_FLUSH, result: [11] },
      { combo: STRAIGHT_FLUSH, result: [10] },
      { combo: STRAIGHT_FLUSH, result: [9] },
      { combo: STRAIGHT_FLUSH, result: [8] },
      { combo: STRAIGHT_FLUSH, result: [7] }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })






})
