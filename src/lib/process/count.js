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
