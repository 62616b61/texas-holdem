const readline = require('readline')
const holdem = require('./src/app.js')
const { validate } = require('./src/lib/validate')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const table = []
const players = []
const cards = []

let firstln = true
rl.on('line', line => {
  if (!line) rl.close()
  const input = line.trim().split(' ')

  try {
    validate(input, cards, firstln)
  } catch (e) {
    console.log('Error:', e.message)
    process.exit(0)
  }

  for (let i = firstln ? 0 : 1; i < input.length; i++) {
    cards.push(input[i])
  }

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
  console.log(holdem(table, players))
})
