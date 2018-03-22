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

function getDuplicates (count, num) {
  const found = []
  Object.keys(count).forEach(face => {
    if (count[face] === num) {
      found.push(parseInt(face))
    }
  })

  return found.length
    ? found.length > 1 ? found.sort((a, b) => b - a) : found
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
  const quadruple = getDuplicates(count, 4)

  return quadruple ? {
    combo: FOUR_OF_A_KIND,
    result: quadruple
  } : false
}

function FullHouse (cards, count) {
  const triple = getDuplicates(count, 3)
  const pairs = getDuplicates(count, 2)

  return triple && pairs ? {
    combo: FULL_HOUSE,
    result: [triple[0], pairs[0]]
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
  const triple = getDuplicates(count, 3)

  return triple ? {
    combo: THREE_OF_A_KIND,
    result: triple
  } : false
}

function Pairs (cards, count) {
  const pairs = getDuplicates(count, 2)

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
