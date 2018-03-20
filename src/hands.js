const {
  HIGH_CARD,
  PAIRS,
  TWO_PAIRS,
  THREE_OF_A_KIND,
  STRAIGHT,
  FLUSH,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  STRAIGHT_FLUSH,
} = require('./utils/handCodes.js')

const suits = ['S', 'D', 'H', 'C']

// helpers
function sameSuit (cards) {
  return suits.some(suit => cards.every(card => card.suit === suit))
}

function fiveConsecutive (cards) {
  for (let i = 1; i < cards.length; i++) {
    if (cards[i].face + 1 !== cards[i - 1].face) {
      return false
    }
  }

  return true
}

function getPairs (count) {
  const found = []
  Object.keys(count).forEach(face => {
    if (count[face] === 2) {
      found.push(face)
    }
  })

  return found.length
    ? found.sort((a, b) => a + b)
    : false
}

function getFaces (cards) {
  return cards.map(card => card.face)
}

// checks
function StraightFlush (cards, count) {
  if (Object.keys(count).length !== 5) return false

  return sameSuit(cards) && fiveConsecutive(cards) ? {
    combo: STRAIGHT_FLUSH,
    result: getFaces(cards)
  } : false
}

function FourOfAKind (cards, count) {
  let found = null
  Object.keys(count).some(face => {
    if (count[face] === 4) {
      found = face
      return true
    }
  })

  return found ? {
    combo: FOUR_OF_A_KIND,
    result: found
  } : false
}

function FullHouse (cards, count) {
  const triples = ThreeOfAKind(cards, count)
  const pairs = getPairs(count)

  return triples && pairs ? {
    combo: FULL_HOUSE,
    result: Object.assign([], triples.result, pairs[0])
  } : false
}

function Flush (cards) {
  return sameSuit(cards) ? {
    combo: FLUSH,
    result: getFaces(cards)
  } : false
}

function Straight (cards, count) {
  if (Object.keys(count).length !== 5) return false

  return fiveConsecutive(cards) ? {
    combo: STRAIGHT,
    result: getFaces(cards)
  } : false
}

function ThreeOfAKind (cards, count) {
  let found = null
  Object.keys(count).some(face => {
    if (count[face] === 3) {
      found = face
      return true
    }
  })

  return found ? {
    combo: THREE_OF_A_KIND,
    result: found
  } : false
}

function Pairs (cards, count) {
  const pairs = getPairs(count)

  return pairs ? {
    combo: pairs.length === 2 ? TWO_PAIRS : PAIRS,
    result: pairs
  } : false
}

function HighCard (cards) {
  return {
    combo: HIGH_CARD,
    result: cards[0].face
  }
}

module.exports = [
  StraightFlush,
  FourOfAKind,
  FullHouse,
  Flush,
  Straight,
  ThreeOfAKind,
  Pairs,
  HighCard
]
