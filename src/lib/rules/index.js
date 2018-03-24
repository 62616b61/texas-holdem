const { ruleToNum, suits } = require('../other')
const {
  combo,
  sameSuit,
  fiveConsecutive,
  getDuplicates,
  getKickers,
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
  STRAIGHT_FLUSH
} = ruleToNum

function StraightFlush (cards, count) {
  if (Object.keys(count).length !== 5) return false

  return sameSuit(cards) && fiveConsecutive(cards)
    ? combo({
        rule: STRAIGHT_FLUSH,
        cards: [cards[0].face]
    })
    : false
}

function FourOfAKind (cards, count) {
  const quadruple = getDuplicates(count, 4)

  return quadruple
    ? combo({
      rule: FOUR_OF_A_KIND,
      cards: [cards[0].face],
      kickers: getKickers(cards, quadruple)
    })
    : false
}

function FullHouse (cards, count) {
  const triple = getDuplicates(count, 3)
  const pairs = getDuplicates(count, 2)

  return triple && pairs
    ? combo({
      rule: FULL_HOUSE,
      cards: [triple[0], pairs[0]]
    })
    : false
}

function Flush (cards) {
  return sameSuit(cards)
    ? combo({
      rule: FLUSH,
      cards: [cards[0].face],
      kickers: getFaces(cards.slice(1))
    })
    : false
}

function Straight (cards, count) {
  if (Object.keys(count).length !== 5) return false

  return fiveConsecutive(cards)
    ? combo({
        rule: STRAIGHT,
        cards: [cards[0].face]
      })
    : false
}

function ThreeOfAKind (cards, count) {
  const triple = getDuplicates(count, 3)

  return triple
    ? combo({
        rule: THREE_OF_A_KIND,
        cards: triple,
        kickers: getKickers(cards, triple)
      })
    : false
}

function Pairs (cards, count) {
  const pairs = getDuplicates(count, 2)

  return pairs
    ? combo({
        rule: pairs.length === 2 ? TWO_PAIR : PAIR,
        cards: pairs,
        kickers: getKickers(cards, pairs)
      })
    : false
}

function HighCard (cards) {
  return combo({
    rule: HIGH_CARD,
    cards: [cards[0].face],
    kickers: getFaces(cards.slice(1))
  })
}

/*
 * Rules are ordered in descending order by it's respective importance.
 * When the check is done against each rule,
 * the first found rank is the best one.
 */
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
