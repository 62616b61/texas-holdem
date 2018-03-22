const { expect } = require('chai')

const { output } = require('../../src/lib/process')

describe('output', () => {
  it('produces output for single player', () => {

    const results = [
      [{ name: 'Joanna', combo: 0, result: [2]}],
      [{ name: 'Jack', combo: 1, result: [3]}],
      [{ name: 'John', combo: 2, result: [4, 5]}],
      [{ name: 'Josh', combo: 3, result: [6]}],
      [{ name: 'Jane', combo: 4, result: [6, 5, 4, 3, 2]}],
      [{ name: 'Jared', combo: 5, result: [7, 6, 5, 4, 3]}],
      [{ name: 'Jessica', combo: 6, result: [8, 9]}],
      [{ name: 'Jasmine', combo: 7, result: [10]}],
      [{ name: 'Julia', combo: 8, result: [11, 10, 9, 8, 7]}]
    ]

    const expected = [
      "1 Joanna High Card Two",
      "1 Jack Pair Three",
      "1 John Two Pair Four Five",
      "1 Josh Three of a Kind Six",
      "1 Jane Straight Six",
      "1 Jared Flush Seven",
      "1 Jessica Full House Eight Nine",
      "1 Jasmine Four of a Kind Ten",
      "1 Julia Straight Flush Jack"
    ]

    results.forEach((r, i) => {
      expect(output(r)).to.be.equal(expected[i])
    })
  })

  it('produces output for two players', () => {
    const results = [
      [
        { name: 'Jack', combo: 1, result: [3]},
        { name: 'John', combo: 2, result: [4, 5]}],
      [
        { name: 'Josh', combo: 3, result: [6]},
        { name: 'Jane', combo: 4, result: [6, 5, 4, 3, 2]}
      ],
      [
        { name: 'Jared', combo: 5, result: [7, 6, 5, 4, 3]},
        { name: 'Jessica', combo: 6, result: [8, 9]}
      ],
      [
        { name: 'Jasmine', combo: 7, result: [10]},
        { name: 'Julia', combo: 8, result: [11, 10, 9, 8, 7]}
      ]
    ]

    const expected = [
      "1 Jack Pair Three\n" +
      "2 John Two Pair Four Five",

      "1 Josh Three of a Kind Six\n" +
      "2 Jane Straight Six",

      "1 Jared Flush Seven\n" +
      "2 Jessica Full House Eight Nine",

      "1 Jasmine Four of a Kind Ten\n" +
      "2 Julia Straight Flush Jack",
    ]

    results.forEach((r, i) => {
      expect(output(r)).to.be.equal(expected[i])
    })
  })

  it('produces output for three players', () => {
    const results = [
      [
        { name: 'Joanna', combo: 0, result: [2]},
        { name: 'Jack', combo: 1, result: [3]},
        { name: 'John', combo: 2, result: [4, 5]}
      ],
      [
        { name: 'Josh', combo: 3, result: [6]},
        { name: 'Jane', combo: 4, result: [6, 5, 4, 3, 2]},
        { name: 'Jared', combo: 5, result: [10, 9, 8, 7, 6]}
      ],
      [
        { name: 'Jessica', combo: 6, result: [11, 12]},
        { name: 'Jasmine', combo: 7, result: [13]},
        { name: 'Julia', combo: 8, result: [14, 13, 12, 11, 10]}
      ]
    ]

    const expected = [
      "1 Joanna High Card Two\n" +
      "2 Jack Pair Three\n" +
      "3 John Two Pair Four Five",

      "1 Josh Three of a Kind Six\n" +
      "2 Jane Straight Six\n" +
      "3 Jared Flush Ten",

      "1 Jessica Full House Jack Queen\n" +
      "2 Jasmine Four of a Kind King\n" +
      "3 Julia Straight Flush Ace"
    ]

    results.forEach((r, i) => {
      expect(output(r)).to.be.equal(expected[i])
    })
  })
})
