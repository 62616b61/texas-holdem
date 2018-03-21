const { sortCards, sortRanks } = require('./utils/sort.js')
const { parse, count, combinations, rank } = require('./utils/process.js')

module.exports = (table, players) => {
  const tableParsed = parse(table)
  const playersParsed = players.map(player => ({
    name: player.name,
    cards: parse(player.cards)
  }))

  const result = []

  playersParsed.forEach(player => {
    const ranks = combinations(tableParsed, player.cards).map(hand => {
      const h = sortCards(hand)
      const c = count(h)

      return rank(h, c)
    })

    result.push(Object.assign(
      {},
      { name: player.name },
      sortRanks(ranks)[0]
    ))
  })

  return sortRanks(result)
}
