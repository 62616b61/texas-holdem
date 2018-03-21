const readline = require('readline')
const app = require('./src/app.js')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

const table = []
const players = []

let firstln = true
rl.on('line', line => {
  const input = line.split(' ')

  if (firstln) {
    input.forEach(item => table.push(item))
    firstln = false
  } else {
    players.push({
      name: input[0],
      cards: [input[1], input[2]]
    })
  }
})

rl.on('close', () => {
  console.log(app(table, players))
})
