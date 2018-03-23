const { ruleToNum, faceToNum, numToFace, numToRule } = require('./other')
const rules = require('./rules')

const {
  TWO_PAIR,
  FULL_HOUSE
} = ruleToNum


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

function count (cards) {
  return cards.reduce((acc, card) => {
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

function identify (cards, count) {
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

function getEffectiveKickers (current, neighbour) {
  for (let i = 0; i < current.length; i++) {
    if (current[i] !== neighbour[i]) {
      return current.slice(0, i + 1)
    }
  }

  return ['Tie']
}

function output (array) {
  const strings = []

  for (let i = 0; i < array.length; i++) {
    const { name, rule, combo, kickers } = array[i]

    const separator = '|'
    const last = i === array.length - 1
    const displayKickers = array.length > 1 && rule === array[last ? i - 1 : i + 1].rule
    const string = [i + 1, name, numToRule[rule]]
      .concat(combo.map(card => numToFace(card)))
      .concat(
        displayKickers
          ? [separator].concat(
              getEffectiveKickers(kickers, array[last ? i - 1 : i + 1].kickers)
                .map(face => parseInt(face) ? numToFace(face) : face)
            )
          : []
      )

    strings.push(string.join(' '))
  }

  return strings.join('\n')
}

module.exports = {
  parse,
  count,
  combinations,
  identify,
  output
}
