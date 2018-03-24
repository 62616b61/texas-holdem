const rules = require('../rules')

/*
 * Identifies hand's rank by checking the hand against all rules
 * in orderly fashion until hand's rank is found.
 * The check is done from greatest rank to lowest,
 * which means that the first identified rank is the best one.
 */
module.exports = function identify (cards, count) {
  let rank

  rules.some(rule => {
    const result = rule(cards, count)

    if (result) {
      rank = result
      return true
    }

    return false
  })

  return rank
}
