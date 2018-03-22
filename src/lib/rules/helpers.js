const { suits } = require('../other')

function sameSuit (cards) {
  return suits.some(suit => cards.every(card => card.suit === suit))
}

function fiveConsecutive (cards) {
  for (let i = 1; i < cards.length; i++) {
    if (cards[i].face + 1 !== cards[i - 1].face) {
      return false
    }
  }

  return true
}

function getDuplicates (count, num) {
  const found = []
  Object.keys(count).forEach(face => {
    if (count[face] === num) {
      found.push(parseInt(face))
    }
  })

  return found.length
    ? found.length > 1 ? found.sort((a, b) => b - a) : found
    : false
}

function getFaces (cards) {
  return cards.map(card => card.face)
}

module.exports = {
  sameSuit,
  fiveConsecutive,
  getDuplicates,
  getFaces
}