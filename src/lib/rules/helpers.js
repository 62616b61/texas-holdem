const { suits } = require('../other')

/*
 * Produces an object that represents hand's rank,
 * including combo cards and kickers.
 */
function combo ({rule, cards, kickers}) {
  return {
    rule,
    combo: cards,
    kickers: kickers ? kickers : []
  }
}

/*
 * Identifies whether each card in a hand is of the same suit.
 */
function sameSuit (cards) {
  return suits.some(suit => cards.every(card => card.suit === suit))
}

/*
 * Identifies whether a hand is comprised of five consecutive cards.
 */
function fiveConsecutive (cards) {
  for (let i = 1; i < cards.length; i++) {
    if (cards[i].face + 1 !== cards[i - 1].face) {
      return false
    }
  }

  return true
}

/*
 * Finds all repeating cards (pairs, triples, quadruples)
 */
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

/*
 * Finds kickers for given cards via excluding combo cards.
 */
function getKickers (cards, duplicates) {
  return getFaces(cards.filter(card => !duplicates.includes(card.face)))
}

function getFaces (cards) {
  return cards.map(card => card.face)
}

module.exports = {
  combo,
  sameSuit,
  fiveConsecutive,
  getDuplicates,
  getKickers,
  getFaces
}
