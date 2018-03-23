const { expect } = require('chai')

const { output } = require('../../src/lib/process')

describe('output', () => {
  it('produces output for single player', () => {
    const combos = [
      [{ name: 'Joanna', rule: 0, combo: [2]}],
      [{ name: 'Jack', rule: 1, combo: [3]}],
      [{ name: 'John', rule: 2, combo: [4, 5]}],
      [{ name: 'Josh', rule: 3, combo: [6]}],
      [{ name: 'Jane', rule: 4, combo: [6, 5, 4, 3, 2]}],
      [{ name: 'Jared', rule: 5, combo: [7, 6, 5, 4, 3]}],
      [{ name: 'Jessica', rule: 6, combo: [8, 9]}],
      [{ name: 'Jasmine', rule: 7, combo: [10]}],
      [{ name: 'Julia', rule: 8, combo: [11, 10, 9, 8, 7]}]
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

    combos.forEach((r, i) => {
      expect(output(r)).to.be.equal(expected[i])
    })
  })

  it('produces output for two players', () => {
    const combos = [
      [
        { name: 'Jack', rule: 1, combo: [3]},
        { name: 'John', rule: 2, combo: [4, 5]}],
      [
        { name: 'Josh', rule: 3, combo: [6]},
        { name: 'Jane', rule: 4, combo: [6, 5, 4, 3, 2]}
      ],
      [
        { name: 'Jared', rule: 5, combo: [7, 6, 5, 4, 3]},
        { name: 'Jessica', rule: 6, combo: [8, 9]}
      ],
      [
        { name: 'Jasmine', rule: 7, combo: [10]},
        { name: 'Julia', rule: 8, combo: [11, 10, 9, 8, 7]}
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

    combos.forEach((r, i) => {
      expect(output(r)).to.be.equal(expected[i])
    })
  })

  it('produces output for three players', () => {
    const combos = [
      [
        { name: 'Joanna', rule: 0, combo: [2]},
        { name: 'Jack', rule: 1, combo: [3]},
        { name: 'John', rule: 2, combo: [4, 5]}
      ],
      [
        { name: 'Josh', rule: 3, combo: [6]},
        { name: 'Jane', rule: 4, combo: [6, 5, 4, 3, 2]},
        { name: 'Jared', rule: 5, combo: [10, 9, 8, 7, 6]}
      ],
      [
        { name: 'Jessica', rule: 6, combo: [11, 12]},
        { name: 'Jasmine', rule: 7, combo: [13]},
        { name: 'Julia', rule: 8, combo: [14, 13, 12, 11, 10]}
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

    combos.forEach((r, i) => {
      expect(output(r)).to.be.equal(expected[i])
    })
  })

  it('produces output for two players with kickers', () => {

    const combos = [
      [
        { name: 'Jasmine', rule: 0, combo: [11, 10, 9, 8, 6]},
        { name: 'Julia', rule: 0, combo: [11, 10, 9, 8, 5]}
      ],
      [
        { name: 'Jack', rule: 2, combo: [4, 3, 6, 5, 4]},
        { name: 'John', rule: 2, combo: [4, 3, 6, 4, 2]}],
      [
        { name: 'Josh', rule: 3, combo: [9, 8, 7]},
        { name: 'Jane', rule: 3, combo: [9, 8, 5]}
      ],
      [
        { name: 'Jared', rule: 7, combo: [14, 10]},
        { name: 'Jessica', rule: 7, combo: [14, 9]}
      ]
    ]

    const expected = [
      "1 Jasmine High Card Jack | Ten Nine Eight Six\n" +
      "2 Julia High Card Jack | Ten Nine Eight Five",

      "1 Jack Two Pair Four Three | Six Five\n" +
      "2 John Two Pair Four Three | Six Four",

      "1 Josh Three of a Kind Nine | Eight Seven\n" +
      "2 Jane Three of a Kind Nine | Eight Five",

      "1 Jared Four of a Kind Ace | Ten\n" +
      "2 Jessica Four of a Kind Ace | Nine"
    ]

    combos.forEach((r, i) => {
      expect(output(r)).to.be.equal(expected[i])
    })
  })

  it('produces output for three players with kickers', () => {
    const combos = [
      [
        { name: 'Joanna', rule: 0, combo: [14, 13, 12, 11, 9]},
        { name: 'Jack', rule: 0, combo: [14, 13, 12, 11, 8]},
        { name: 'John', rule: 0, combo: [14, 13, 12, 11, 7]}
      ],
      [
        { name: 'Josh', rule: 3, combo: [6]},
        { name: 'Jane', rule: 4, combo: [6, 5, 4, 3, 2]},
        { name: 'Jared', rule: 5, combo: [10, 9, 8, 7, 6]}
      ],
      [
        { name: 'Jessica', rule: 6, combo: [11, 12]},
        { name: 'Jasmine', rule: 7, combo: [13]},
        { name: 'Julia', rule: 8, combo: [14, 13, 12, 11, 10]}
      ]
    ]

    const expected = [
      "1 Joanna High Card Ace | King Queen Jack Nine\n" +
      "2 Jack High Card Ace | King Queen Jack Eight\n" +
      "3 John High Card Ace | King Queen Jack Seven",

      "1 Josh Three of a Kind Six\n" +
      "2 Jane Straight Six\n" +
      "3 Jared Flush Ten",

      "1 Jessica Full House Jack Queen\n" +
      "2 Jasmine Four of a Kind King\n" +
      "3 Julia Straight Flush Ace"
    ]

    combos.forEach((r, i) => {
      expect(output(r)).to.be.equal(expected[i])
    })
  })


})
