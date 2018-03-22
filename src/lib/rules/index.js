const { handToNum, suits } = require('../other')
const {
  sameSuit,
  fiveConsecutive,
  getDuplicates,
  getFaces
} = require('./helpers')

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

function StraightFlush (cards, count) {
  if (Object.keys(count).length !== 5) return false

  return sameSuit(cards) && fiveConsecutive(cards) ? {
    combo: STRAIGHT_FLUSH,
    result: [cards[0].face]
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
    result: [cards[0].face]
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
    result: getFaces(cards)
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
