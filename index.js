const readline = require('readline')
const holdem = require('./src/app.js')
const { validate } = require('./src/lib/process')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const table = []
const players = []

/*
 * Holds all occurences of cards.
 * Is used to determine duplicates in input.
 */
const cards = []

let firstln = true
rl.on('line', line => {
  if (!line) return

  const input = line.trim().split(' ')

  try {
    validate(input, cards, firstln)
  } catch (e) {
    console.log('Error:', e.message)
    process.exit(0)
  }

  /*
   * Save all occurences of cards to later determine possible duplicates.
   */
  for (let i = firstln ? 0 : 1; i < input.length; i++) {
    cards.push(input[i])
  }

  /*
   * If the line is the first one, treat it like community cards,
   * otherwise like player's cards.
   */
  if (firstln) {
    firstln = false
    input.forEach(item => table.push(item))
  } else {
    players.push({
      name: input[0],
      cards: [input[1], input[2]]
    })
  }
}).on('close', () => {
  /*
   * When input interface is closed, run the application.
   */
  if (table.length && players.length) {
    console.log(holdem(table, players))
  }
  process.exit(0)
})
