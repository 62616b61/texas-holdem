const app = require('./src/app.js')

const table = ['KS', 'AD', '3H', '7C', 'TD']
const players = [
  { name: 'john',  cards: ['9H', '7S'] },
  { name: 'becky', cards: ['JD', 'QC'] },
  { name: 'sam',   cards: ['AC', 'KH'] }
]

console.log( app(table, players) )
