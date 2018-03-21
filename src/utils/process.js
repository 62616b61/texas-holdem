const handChecks = require('./rules.js')
const faceToNum = {
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}

function parse (array) {
  const result = []

  for (let i = 0; i < array.length; i++) {
    const face = array[i][0]
    const suit = array[i][1]

    result.push({
      face: parseInt(face) ? parseInt(face) : faceToNum[face],
      suit
    })
  }

  return result
}

function count (hand) {
  return hand.reduce((acc, card) => {
    if (acc[card.face]) {
      acc[card.face]++
    } else {
      acc[card.face] = 1
    }

    return acc
  }, {})
}

function combinations (table, player) {
  const hands = []

  for (let i = 0; i < table.length; i++) {
    for (let j = i + 1; j < table.length; j++) {
      const hand = Object.assign([], table)
      hand[i] = player[0]
      hand[j] = player[1]

      hands.push(hand)
    }
  }

  return hands
}

function rank (cards, count) {
  let rank

  handChecks.some(check => {
    const result = check(cards, count)

    if (result) {
      rank = result
      return true
    }

    return false
  })

  return rank
}


module.exports = {
  parse,
  count,
  combinations,
  rank
}
