const { expect } = require('chai')

const { output } = require('../../src/lib/process')

describe('output', () => {
  it('produces output for single player', () => {
    const combos = [
      [{ name: 'Joanna', rule: 0, combo: [2] }],
      [{ name: 'Jack', rule: 1, combo: [3] }],
      [{ name: 'John', rule: 2, combo: [4, 5] }],
      [{ name: 'Josh', rule: 3, combo: [6] }],
      [{ name: 'Jane', rule: 4, combo: [6] }],
      [{ name: 'Jared', rule: 5, combo: [7] }],
      [{ name: 'Jessica', rule: 6, combo: [8, 9] }],
      [{ name: 'Jasmine', rule: 7, combo: [10] }],
      [{ name: 'Julia', rule: 8, combo: [11] }]
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
        { name: 'John', rule: 2, combo: [4, 5] },
        { name: 'Jack', rule: 1, combo: [3] }
      ],
      [
        { name: 'Jane', rule: 4, combo: [6] },
        { name: 'Josh', rule: 3, combo: [6] }
      ],
      [
        { name: 'Jessica', rule: 6, combo: [8, 9] },
        { name: 'Jared', rule: 5, combo: [7] }
      ],
      [
        { name: 'Julia', rule: 8, combo: [11] },
        { name: 'Jasmine', rule: 7, combo: [10] }
      ]
    ]

    const expected = [
      "1 John Two Pair Four Five\n" +
      "2 Jack Pair Three",

      "1 Jane Straight Six\n" +
      "2 Josh Three of a Kind Six",

      "1 Jessica Full House Eight Nine\n" +
      "2 Jared Flush Seven",

      "1 Julia Straight Flush Jack\n" +
      "2 Jasmine Four of a Kind Ten"
    ]

    combos.forEach((r, i) => {
      expect(output(r)).to.be.equal(expected[i])
    })
  })

  it('produces output for three players', () => {
    const combos = [
      [
        { name: 'John', rule: 2, combo: [4, 5]},
        { name: 'Jack', rule: 1, combo: [3]},
        { name: 'Joanna', rule: 0, combo: [2]}
      ],
      [
        { name: 'Jared', rule: 5, combo: [10]},
        { name: 'Jane', rule: 4, combo: [6]},
        { name: 'Josh', rule: 3, combo: [6]}
      ],
      [
        { name: 'Julia', rule: 8, combo: [14]},
        { name: 'Jasmine', rule: 7, combo: [13]},
        { name: 'Jessica', rule: 6, combo: [11, 12]}
      ]
    ]

    const expected = [
      "1 John Two Pair Four Five\n" +
      "2 Jack Pair Three\n" +
      "3 Joanna High Card Two",

      "1 Jared Flush Ten\n" +
      "2 Jane Straight Six\n" +
      "3 Josh Three of a Kind Six",

      "1 Julia Straight Flush Ace\n" +
      "2 Jasmine Four of a Kind King\n" +
      "3 Jessica Full House Jack Queen"
    ]

    combos.forEach((r, i) => {
      expect(output(r)).to.be.equal(expected[i])
    })
  })

  it('produces output for two players with kickers', () => {

    const combos = [
      [
        { name: 'Jasmine', rule: 0, combo: [11], kickers: [10, 9, 8, 6] },
        { name: 'Julia', rule: 0, combo: [11], kickers: [10, 9, 8, 5] }
      ],
      [
        { name: 'Jack', rule: 2, combo: [4, 3], kickers: [6, 5] },
        { name: 'John', rule: 2, combo: [4, 3], kickers: [6, 4] },
      ],
      [
        { name: 'Josh', rule: 3, combo: [9], kickers: [8, 7] },
        { name: 'Jane', rule: 3, combo: [9], kickers: [8, 5] }
      ],
      [
        { name: 'Jared', rule: 7, combo: [14], kickers: [10] },
        { name: 'Jessica', rule: 7, combo: [14], kickers: [9] }
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
        { name: 'Joanna', rule: 0, combo: [14], kickers: [13, 12, 11, 9] },
        { name: 'Jack', rule: 0, combo: [14], kickers: [13, 12, 11, 8] },
        { name: 'John', rule: 0, combo: [14], kickers: [13, 12, 11, 7] }
      ]
    ]

    const expected = [
      "1 Joanna High Card Ace | King Queen Jack Nine\n" +
      "2 Jack High Card Ace | King Queen Jack Eight\n" +
      "3 John High Card Ace | King Queen Jack Seven"
    ]

    combos.forEach((r, i) => {
      expect(output(r)).to.be.equal(expected[i])
    })
  })

  it('produces output for players with ties', () => {
    const combos = [
      [
        { name: 'Joanna', rule: 0, combo: [14], kickers: [13, 12, 11, 9] },
        { name: 'Jack', rule: 0, combo: [14], kickers: [13, 12, 11, 9] },
        { name: 'John', rule: 0, combo: [14], kickers: [13, 12, 11, 9] }
      ]
    ]

    const expected = [
      "1 Joanna High Card Ace | Tie\n" +
      "2 Jack High Card Ace | Tie\n" +
      "3 John High Card Ace | Tie",
    ]

    combos.forEach((r, i) => {
      expect(output(r)).to.be.equal(expected[i])
    })
  })

  it('produces output for players with mixed results', () => {
    const combos = [
      [
        { name: 'Jared', rule: 7, combo: [14], kickers: [10] },
        { name: 'Josh', rule: 3, combo: [9], kickers: [8, 7] },
        { name: 'Jane', rule: 3, combo: [9], kickers: [8, 5] },
        { name: 'Joanna', rule: 0, combo: [14], kickers: [13, 12, 11, 9] },
        { name: 'Jack', rule: 0, combo: [14], kickers: [13, 12, 11, 9] },
        { name: 'John', rule: 0, combo: [14], kickers: [13, 12, 11, 9] },
        { name: 'Jeff', rule: 0, combo: [14], kickers: [13, 12, 11, 9] },
        { name: 'Jyll', rule: 0, combo: [14], kickers: [13, 12, 11, 8] },
        { name: 'Joice', rule: 0, combo: [14], kickers: [13, 12, 11, 7] }
      ]
    ]

    const expected = [
      "1 Jared Four of a Kind Ace\n" +
      "2 Josh Three of a Kind Nine | Eight Seven\n" +
      "3 Jane Three of a Kind Nine | Eight Five\n" +
      "4 Joanna High Card Ace | Tie\n" +
      "5 Jack High Card Ace | Tie\n" +
      "6 John High Card Ace | Tie\n" +
      "7 Jeff High Card Ace | King Queen Jack Nine\n" +
      "8 Jyll High Card Ace | King Queen Jack Eight\n" +
      "9 Joice High Card Ace | King Queen Jack Seven"
    ]

    combos.forEach((r, i) => {
      expect(output(r)).to.be.equal(expected[i])
    })
  })

})
