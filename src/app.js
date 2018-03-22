const { sortCards, sortRanks } = require('./lib/sort.js')
const {
  parse,
  count,
  combinations,
  identify,
  output
} = require('./lib/process.js')

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

      return identify(h, c)
    })

    result.push(Object.assign(
      {},
      { name: player.name },
      sortRanks(ranks)[0]
    ))
  })

  return output(sortRanks(result))
}
