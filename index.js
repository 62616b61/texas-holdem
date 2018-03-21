const app = require('./src/app.js')

const table = ['KS', 'AD', '3H', '7C', 'TD']
const players = [
  { name: 'John',  cards: ['9H', '7S'] },
  { name: 'Becky', cards: ['JD', 'QC'] },
  { name: 'Sam',   cards: ['AC', 'KH'] }
]

console.log( app(table, players) )
