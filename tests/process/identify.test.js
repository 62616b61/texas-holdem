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

const { count, identify } = require('../../src/lib/process')

describe('identify', () => {
  it('should identify Straight Flush', () => {
    const cards = [
      { face: 8, suit: 'H'},
      { face: 7, suit: 'H'},
      { face: 6, suit: 'H'},
      { face: 5, suit: 'H'},
      { face: 4, suit: 'H'},
    ]

    const expected = {
      combo: STRAIGHT_FLUSH,
      result: [8]
    }

    expect(identify(cards, count(cards))).to.be.deep.equal(expected)
  })

  it('should identify Four of a Kind', () => {
    const cards = [
      { face: 8, suit: 'H'},
      { face: 8, suit: 'C'},
      { face: 8, suit: 'S'},
      { face: 8, suit: 'C'},
      { face: 2, suit: 'S'},
    ]

    const expected = {
      combo: FOUR_OF_A_KIND,
      result: [8]
    }

    expect(identify(cards, count(cards))).to.be.deep.equal(expected)
  })

  it('should identify Full House', () => {
    const cards = [
      { face: 9, suit: 'H'},
      { face: 9, suit: 'C'},
      { face: 5, suit: 'S'},
      { face: 5, suit: 'H'},
      { face: 5, suit: 'D'},
    ]

    const expected = {
      combo: FULL_HOUSE,
      result: [5, 9]
    }

    expect(identify(cards, count(cards))).to.be.deep.equal(expected)
  })

  it('should identify Flush', () => {
    const cards = [
      { face: 9, suit: 'H'},
      { face: 8, suit: 'H'},
      { face: 6, suit: 'H'},
      { face: 3, suit: 'H'},
      { face: 2, suit: 'H'},
    ]

    const expected = {
      combo: FLUSH,
      result: [9, 8, 6, 3, 2]
    }

    expect(identify(cards, count(cards))).to.be.deep.equal(expected)
  })

  it('should identify Straight', () => {
    const cards = [
      { face: 8, suit: 'H'},
      { face: 7, suit: 'C'},
      { face: 6, suit: 'S'},
      { face: 5, suit: 'C'},
      { face: 4, suit: 'S'},
    ]

    const expected = {
      combo: STRAIGHT,
      result: [8]
    }

    expect(identify(cards, count(cards))).to.be.deep.equal(expected)
  })

  it('should identify Three of a Kind', () => {
    const cards = [
      { face: 8, suit: 'H'},
      { face: 8, suit: 'C'},
      { face: 8, suit: 'S'},
      { face: 5, suit: 'C'},
      { face: 2, suit: 'S'},
    ]

    const expected = {
      combo: THREE_OF_A_KIND,
      result: [8]
    }

    expect(identify(cards, count(cards))).to.be.deep.equal(expected)
  })

  it('should identify Two Pair', () => {
    const cards = [
      { face: 8, suit: 'S'},
      { face: 8, suit: 'H'},
      { face: 5, suit: 'S'},
      { face: 5, suit: 'C'},
      { face: 2, suit: 'S'},
    ]

    const expected = {
      combo: TWO_PAIR,
      result: [8, 5]
    }

    expect(identify(cards, count(cards))).to.be.deep.equal(expected)
  })

  it('should identify Pair', () => {
    const cards = [
      { face: 9, suit: 'S'},
      { face: 8, suit: 'S'},
      { face: 5, suit: 'S'},
      { face: 5, suit: 'C'},
      { face: 2, suit: 'S'},
    ]

    const expected = {
      combo: PAIR,
      result: [5]
    }

    expect(identify(cards, count(cards))).to.be.deep.equal(expected)
  })

  it('should identify High Card', () => {
    const cards = [
      { face: 14, suit: 'S'},
      { face: 12, suit: 'H'},
      { face: 10, suit: 'S'},
      { face: 8, suit: 'C'},
      { face: 6, suit: 'S'},
    ]

    const expected = {
      combo: HIGH_CARD,
      result: [14, 12, 10, 8, 6]
    }

    expect(identify(cards, count(cards))).to.be.deep.equal(expected)
  })

})
