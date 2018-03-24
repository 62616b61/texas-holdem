const { faces, suits } = require('../other')

/*
 * Validates the correctness of a card.
 */
function validateCard (card) {
  if (
    card.length !== 2 ||
    !faces.includes(card[0]) ||
    !suits.includes(card[1]))
  {
    throw new Error(`Card ${card} is invalid`)
  }
}

/*
 * Validates an array of community cards or player's cards.
 */
module.exports = function validate (array, cards, firstln) {
  if (array.length !== (firstln ? 5 : 3)) {
    throw new Error(`Incorrect number of cards specified`)
  }

  for (let i = firstln ? 0 : 1; i < array.length; i++) {
    const card = array[i]

    validateCard(card)

    if (cards.includes(card)) {
      throw new Error(`Card ${card} already exists`)
    }
  }
}
