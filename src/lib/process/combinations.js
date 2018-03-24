/*
 * Creates all possible combinations of player's cards and community cards.
 * Player's cards must be present in each combination.
 */
module.exports = function combinations (table, player) {
  const hands = []

  for (let i = 0; i < table.length; i++) {
    for (let j = i + 1; j < table.length; j++) {
      const hand = [].concat(table)

      hand[i] = player[0]
      hand[j] = player[1]

      hands.push(hand)
    }
  }

  return hands
}
