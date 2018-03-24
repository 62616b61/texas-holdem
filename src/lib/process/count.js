/*
 * Counts cards in a hand which is important for certain rule's checks
 * (pairs, three of a kind, four of a kind).
 */
module.exports = function count (cards) {
  return cards.reduce((acc, card) => {
    if (acc[card.face]) {
      acc[card.face]++
    } else {
      acc[card.face] = 1
    }

    return acc
  }, {})
}
