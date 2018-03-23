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
  it('sorts ranks by rule in descending order', () => {
    const ranks = [
      { rule: FLUSH },
      { rule: STRAIGHT },
      { rule: THREE_OF_A_KIND },
      { rule: HIGH_CARD },
      { rule: TWO_PAIR },
      { rule: FULL_HOUSE },
      { rule: STRAIGHT_FLUSH },
      { rule: FOUR_OF_A_KIND },
      { rule: PAIR }
    ]

    const expected = [
      { rule: STRAIGHT_FLUSH },
      { rule: FOUR_OF_A_KIND },
      { rule: FULL_HOUSE },
      { rule: FLUSH },
      { rule: STRAIGHT },
      { rule: THREE_OF_A_KIND },
      { rule: TWO_PAIR },
      { rule: PAIR },
      { rule: HIGH_CARD }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })

  it('sorts High Card ranks by combo in descending order', () => {
    const ranks = [
      { rule: HIGH_CARD, combo: [8], kickers: [5, 2, 2, 2] },
      { rule: HIGH_CARD, combo: [13], kickers: [12, 11, 8, 2] },
      { rule: HIGH_CARD, combo: [14], kickers: [13, 12, 11, 10] },
      { rule: HIGH_CARD, combo: [8], kickers: [5, 3, 2, 2] },
      { rule: HIGH_CARD, combo: [14], kickers: [13, 12, 11, 8] },
      { rule: HIGH_CARD, combo: [13], kickers: [12, 11, 9, 2] },
      { rule: HIGH_CARD, combo: [14], kickers: [13, 12, 11, 9] }
    ]

    const expected = [
      { rule: HIGH_CARD, combo: [14], kickers: [13, 12, 11, 10] },
      { rule: HIGH_CARD, combo: [14], kickers: [13, 12, 11, 9] },
      { rule: HIGH_CARD, combo: [14], kickers: [13, 12, 11, 8] },
      { rule: HIGH_CARD, combo: [13], kickers: [12, 11, 9, 2] },
      { rule: HIGH_CARD, combo: [13], kickers: [12, 11, 8, 2] },
      { rule: HIGH_CARD, combo: [8], kickers: [5, 3, 2, 2] },
      { rule: HIGH_CARD, combo: [8], kickers: [5, 2, 2, 2] }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })

  it('sorts Pair ranks by combo in descending order', () => {
    const ranks = [
      { rule: PAIR, combo: [14], kickers: [11, 10, 7] },
      { rule: PAIR, combo: [8], kickers: [5, 4, 2] },
      { rule: PAIR, combo: [14], kickers: [11, 10, 8] },
      { rule: PAIR, combo: [14], kickers: [12, 11, 10] },
      { rule: PAIR, combo: [8], kickers: [5, 3, 2] },
      { rule: PAIR, combo: [14], kickers: [12, 11, 9] }
    ]

    const expected = [
      { rule: PAIR, combo: [14], kickers: [12, 11, 10] },
      { rule: PAIR, combo: [14], kickers: [12, 11, 9] },
      { rule: PAIR, combo: [14], kickers: [11, 10, 8] },
      { rule: PAIR, combo: [14], kickers: [11, 10, 7] },
      { rule: PAIR, combo: [8], kickers: [5, 4, 2] },
      { rule: PAIR, combo: [8], kickers: [5, 3, 2] }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })

  it('sorts Two Pair ranks by combo in descending order', () => {
    const ranks = [
      { rule: TWO_PAIR, combo: [13, 10], kickers: [7] },
      { rule: TWO_PAIR, combo: [14, 13], kickers: [9] },
      { rule: TWO_PAIR, combo: [8, 4], kickers: [1] },
      { rule: TWO_PAIR, combo: [13, 10], kickers: [9] },
      { rule: TWO_PAIR, combo: [8, 5], kickers: [3] },
      { rule: TWO_PAIR, combo: [14, 13], kickers: [10] }
    ]

    const expected = [
      { rule: TWO_PAIR, combo: [14, 13], kickers: [10] },
      { rule: TWO_PAIR, combo: [14, 13], kickers: [9] },
      { rule: TWO_PAIR, combo: [13, 10], kickers: [9] },
      { rule: TWO_PAIR, combo: [13, 10], kickers: [7] },
      { rule: TWO_PAIR, combo: [8, 5], kickers: [3] },
      { rule: TWO_PAIR, combo: [8, 4], kickers: [1] }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })

  it('sorts Three of a Kind ranks by combo in descending order', () => {
    const ranks = [
      { rule: THREE_OF_A_KIND, combo: [8], kickers: [7, 3] },
      { rule: THREE_OF_A_KIND, combo: [7], kickers: [10, 9] },
      { rule: THREE_OF_A_KIND, combo: [14], kickers: [13, 12] },
      { rule: THREE_OF_A_KIND, combo: [7], kickers: [9, 8] },
      { rule: THREE_OF_A_KIND, combo: [14], kickers: [13, 11] },
      { rule: THREE_OF_A_KIND, combo: [10], kickers: [8, 5] },
      { rule: THREE_OF_A_KIND, combo: [10], kickers: [8, 5] }
    ]

    const expected = [
      { rule: THREE_OF_A_KIND, combo: [14], kickers: [13, 12] },
      { rule: THREE_OF_A_KIND, combo: [14], kickers: [13, 11] },
      { rule: THREE_OF_A_KIND, combo: [10], kickers: [8, 5] },
      { rule: THREE_OF_A_KIND, combo: [10], kickers: [8, 5] },
      { rule: THREE_OF_A_KIND, combo: [8], kickers: [7, 3] },
      { rule: THREE_OF_A_KIND, combo: [7], kickers: [10, 9] },
      { rule: THREE_OF_A_KIND, combo: [7], kickers: [9, 8] }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })

  it('sorts Straight ranks by combo in descending order', () => {
    const ranks = [
      { rule: STRAIGHT, combo: [11], kickers: [] },
      { rule: STRAIGHT, combo: [9], kickers: [] },
      { rule: STRAIGHT, combo: [10], kickers: [] },
      { rule: STRAIGHT, combo: [12], kickers: [] },
      { rule: STRAIGHT, combo: [14], kickers: [] },
      { rule: STRAIGHT, combo: [13], kickers: [] },
      { rule: STRAIGHT, combo: [7], kickers: [] },
      { rule: STRAIGHT, combo: [8], kickers: [] }
    ]

    const expected = [
      { rule: STRAIGHT, combo: [14], kickers: [] },
      { rule: STRAIGHT, combo: [13], kickers: [] },
      { rule: STRAIGHT, combo: [12], kickers: [] },
      { rule: STRAIGHT, combo: [11], kickers: [] },
      { rule: STRAIGHT, combo: [10], kickers: [] },
      { rule: STRAIGHT, combo: [9], kickers: [] },
      { rule: STRAIGHT, combo: [8], kickers: [] },
      { rule: STRAIGHT, combo: [7], kickers: [] }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })

  it('sorts Flush ranks by combo in descending order', () => {
    const ranks = [
      { rule: FLUSH, combo: [8], kickers: [5, 2, 2, 2] },
      { rule: FLUSH, combo: [13], kickers: [12, 11, 8, 2] },
      { rule: FLUSH, combo: [14], kickers: [13, 12, 11, 10] },
      { rule: FLUSH, combo: [8], kickers: [5, 3, 2, 2] },
      { rule: FLUSH, combo: [14], kickers: [13, 12, 11, 8] },
      { rule: FLUSH, combo: [13], kickers: [12, 11, 9, 2] },
      { rule: FLUSH, combo: [14], kickers: [13, 12, 11, 9] }
    ]

    const expected = [
      { rule: FLUSH, combo: [14], kickers: [13, 12, 11, 10] },
      { rule: FLUSH, combo: [14], kickers: [13, 12, 11, 9] },
      { rule: FLUSH, combo: [14], kickers: [13, 12, 11, 8] },
      { rule: FLUSH, combo: [13], kickers: [12, 11, 9, 2] },
      { rule: FLUSH, combo: [13], kickers: [12, 11, 8, 2] },
      { rule: FLUSH, combo: [8], kickers: [5, 3, 2, 2] },
      { rule: FLUSH, combo: [8], kickers: [5, 2, 2, 2] }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })

  it('sorts Full House ranks by combo in descending order', () => {
    const ranks = [
      { rule: FULL_HOUSE, combo: [7, 6], kickers: [] },
      { rule: FULL_HOUSE, combo: [3, 2], kickers: [] },
      { rule: FULL_HOUSE, combo: [9, 9], kickers: [] },
      { rule: FULL_HOUSE, combo: [14, 13], kickers: [] },
      { rule: FULL_HOUSE, combo: [7, 3], kickers: [] },
      { rule: FULL_HOUSE, combo: [14, 9], kickers: [] }
    ]

    const expected = [
      { rule: FULL_HOUSE, combo: [14, 13], kickers: [] },
      { rule: FULL_HOUSE, combo: [14, 9], kickers: [] },
      { rule: FULL_HOUSE, combo: [9, 9], kickers: [] },
      { rule: FULL_HOUSE, combo: [7, 6], kickers: [] },
      { rule: FULL_HOUSE, combo: [7, 3], kickers: [] },
      { rule: FULL_HOUSE, combo: [3, 2], kickers: [] }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })

  it('sorts Four of a Kind ranks by combo in descending order', () => {
    const ranks = [
      { rule: FOUR_OF_A_KIND, combo: [10], kickers: [14] },
      { rule: FOUR_OF_A_KIND, combo: [9], kickers: [11] },
      { rule: FOUR_OF_A_KIND, combo: [14], kickers: [12] },
      { rule: FOUR_OF_A_KIND, combo: [14], kickers: [13] },
      { rule: FOUR_OF_A_KIND, combo: [7], kickers: [6] },
      { rule: FOUR_OF_A_KIND, combo: [10], kickers: [11] },
      { rule: FOUR_OF_A_KIND, combo: [7], kickers: [2] },
      { rule: FOUR_OF_A_KIND, combo: [10], kickers: [10] }
    ]

    const expected = [
      { rule: FOUR_OF_A_KIND, combo: [14], kickers: [13] },
      { rule: FOUR_OF_A_KIND, combo: [14], kickers: [12] },
      { rule: FOUR_OF_A_KIND, combo: [10], kickers: [14] },
      { rule: FOUR_OF_A_KIND, combo: [10], kickers: [11] },
      { rule: FOUR_OF_A_KIND, combo: [10], kickers: [10] },
      { rule: FOUR_OF_A_KIND, combo: [9], kickers: [11] },
      { rule: FOUR_OF_A_KIND, combo: [7], kickers: [6] },
      { rule: FOUR_OF_A_KIND, combo: [7], kickers: [2] }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })

  it('sorts Straight Flush ranks by combo in descending order', () => {
    const ranks = [
      { rule: STRAIGHT_FLUSH, combo: [11], kickers: [] },
      { rule: STRAIGHT_FLUSH, combo: [9], kickers: [] },
      { rule: STRAIGHT_FLUSH, combo: [10], kickers: [] },
      { rule: STRAIGHT_FLUSH, combo: [12], kickers: [] },
      { rule: STRAIGHT_FLUSH, combo: [14], kickers: [] },
      { rule: STRAIGHT_FLUSH, combo: [13], kickers: [] },
      { rule: STRAIGHT_FLUSH, combo: [7], kickers: [] },
      { rule: STRAIGHT_FLUSH, combo: [8], kickers: [] }
    ]

    const expected = [
      { rule: STRAIGHT_FLUSH, combo: [14], kickers: [] },
      { rule: STRAIGHT_FLUSH, combo: [13], kickers: [] },
      { rule: STRAIGHT_FLUSH, combo: [12], kickers: [] },
      { rule: STRAIGHT_FLUSH, combo: [11], kickers: [] },
      { rule: STRAIGHT_FLUSH, combo: [10], kickers: [] },
      { rule: STRAIGHT_FLUSH, combo: [9], kickers: [] },
      { rule: STRAIGHT_FLUSH, combo: [8], kickers: [] },
      { rule: STRAIGHT_FLUSH, combo: [7], kickers: [] }
    ]

    expect(sortRanks(ranks)).to.be.deep.equal(expected)
  })
})
