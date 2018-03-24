const { sortCards, sortRanks } = require('./lib/sort.js')
const {
  validate,
  parse,
  count,
  combinations,
  identify,
  output
} = require('./lib/process')

/**
 * Begin processing.
 * 1. Create all possible combinations of cards for each player
 * 2. Rank each combination and find the best one
 * 3. Rank players by their best hands
 */
module.exports = (table, players) => {
  const tableParsed = parse(table)
  const playersParsed = players.map(player => ({
    name: player.name,
    cards: parse(player.cards)
  }))

  const result = playersParsed.map(player => {
    const possibleCombinations = combinations(tableParsed, player.cards)
    const ranks = possibleCombinations.map(hand => {
      const h = sortCards(hand)
      const c = count(h)

      return identify(h, c)
    })

    const bestRank = sortRanks(ranks)[0]
    return Object.assign(
      {},
      { name: player.name },
      bestRank
    )
  })

  return output(sortRanks(result))
}
