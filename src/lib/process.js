const {
  faceToNum,
  numToFace,
  numToHand,
  faces,
  suits
} = require('./other')
const rules = require('./rules')

function validate (face, suit) {
  if (!faces.includes(face) || !suits.includes(suit)) {
    throw new Error(`Card ${face}${suit} is invalid`)
  }
}

function parse (array) {
  const result = []

  for (let i = 0; i < array.length; i++) {
    const face = array[i][0]
    const suit = array[i][1]

    validate(face, suit)

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

  rules.some(rule => {
    const result = rule(cards, count)

    if (result) {
      rank = result
      return true
    }

    return false
  })

  return rank
}

function output (array) {
  const result = ''

  return array.map((item, i) => {
    const {name, combo, result} = item
    const face = result[0]

    const winCard = numToFace[face - 2] +
      (combo === 2 ? ' ' + numToFace[result[1] - 2] : '')

    return `${i + 1} ${name} ${numToHand[combo]} ${winCard}`
  })
  .join('\n')
}

module.exports = {
  parse,
  count,
  combinations,
  rank,
  output
}
