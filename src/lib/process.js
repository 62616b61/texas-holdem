const { handToNum, faceToNum, numToFace, numToHand } = require('./other')
const rules = require('./rules')

const {
  TWO_PAIR,
  FULL_HOUSE
} = handToNum


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

function howManyComboCards (combo) {
  return [TWO_PAIR, FULL_HOUSE].includes(combo) ? 2 : 1
}

function getKickers (current, next) {
  if (current.combo !== next.combo) return false

  for (let i = 0; i < current.result.length; i++) {
    if (current.result[i] !== next.result[i]) {
      const cc = howManyComboCards(current.combo)

      return {
        current: current.result.slice(cc, i + 1),
        next: next.result.slice(cc, i + 1)
      }
    }
  }

  return {
    current: 'Tie',
    next: 'Tie'
  }
}

function getComboCards (combo, result) {
  return result
    .slice(0, howManyComboCards(combo))
    .map(face => numToFace(face))
    .join(' ')
}

function output (array) {
  const strings = []
  let prevKickers = false

  for (let i = 0; i < array.length; i++) {
    const { name, combo, result } = array[i]

    const comboCards = getComboCards(combo, result)
    const string = [
      i + 1,
      name,
      numToHand[combo],
      comboCards
    ]

    // Kickers
    const isLastItem = i === array.length - 1
    const currentKickers = !isLastItem
      ? getKickers(array[i], array[i + 1])
      : false

    const kickers = isLastItem ? prevKickers.next : currentKickers.current

    if (kickers) {
      string.push('|')
      kickers.forEach(k => string.push(numToFace(k)))
    }

    prevKickers = currentKickers

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
