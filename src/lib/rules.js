const { handToNum, suits } = require('./other')

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
      found.push(parseInt(face))
    }
  })

  return found.length
    ? found.sort((a, b) => b - a)
    : false
}

function getTriple (count) {
  let found = null
  Object.keys(count).forEach(face => {
    if (count[face] === 3) {
      found = parseInt(face)
    }
  })

  return found ? found : false
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
    result: [parseInt(found)]
  } : false
}

function FullHouse (cards, count) {
  const triple = getTriple(count)
  const pairs = getPairs(count)

  return triple && pairs ? {
    combo: FULL_HOUSE,
    result: [triple, pairs[0]]
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
  const triple = getTriple(count)

  return triple ? {
    combo: THREE_OF_A_KIND,
    result: [triple]
  } : false
}

function Pairs (cards, count) {
  const pairs = getPairs(count)

  return pairs ? {
    combo: pairs.length === 2 ? TWO_PAIR : PAIR,
    result: pairs
  } : false
}

function HighCard (cards) {
  return {
    combo: HIGH_CARD,
    result: [cards[0].face]
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
