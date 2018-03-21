const readline = require('readline')
const app = require('./src/app.js')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const table = []
const players = []

let firstln = true
rl.on('line', line => {
  if (!line) rl.close()
  const input = line.trim().split(' ')

  if (firstln) {
    if (input.length !== 5) throw new Error('Table is supposed to have 5 cards')

    input.forEach(item => table.push(item))
    firstln = false
  } else {
    if (input.length !== 3) throw new Error('Player is supposed to have 2 cards')

    players.push({
      name: input[0],
      cards: [input[1], input[2]]
    })
  }

  rl.prompt()
}).on('close', () => {
  console.log(app(table, players))
  process.exit(0)
}).on('SIGINT', () => {
  rl.close()
  process.exit(0)
})

rl.setPrompt('')
rl.prompt()
