const handChecks = require('./hands.js')

function sortCards (hand) {
  return hand.sort((a, b) => {
    return a.face > b.face
      ? -1
      : (b.face > a.face ? 1 : 0)
  })
}

function parse (array) {
  const faceToNum = {
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
  }

  for (let i = 0; i < array.length; i++) {
    const face = array[i][0]
    const suit = array[i][1]

    array[i] = {
      face: parseInt(face) ? parseInt(face) : faceToNum[face],
      suit
    }
  }
}

function countCards (hand) {
  return hand.reduce((acc, card) => {
    if (acc[card.face]) {
      acc[card.face]++
    } else {
      acc[card.face] = 1
    }

    return acc
  }, {})
}

function generateCombinations(table, player) {
  const hands = []

  for (let i = 0; i < table.length; i++) {
    for (let j = i + 1; j < table.length; j++) {
      const hand = Object.assign([], table)
      hand[i] = player[0]
      hand[j] = player[1]

      hands.push(hand)
    }
  }

  return hands
}

function findRank (cards, count) {
  let rank

  handChecks.some(check => {
    const result = check(cards, count)

    if (result) {
      rank = result
      return true
    }

    return false
  })

  return rank
}

function sortRanks (ranks) {
  const ranksByResult = (a, b) => {
    if (Array.isArray(a)) {
      for (let i = 0; i < a.length; i++) {
        if (a[i] > b[i]) {
          return -1
        } else if (b[i] > a[i]) {
          return 1
        } else {
          continue
        }
      }

      return 0
    } else {
      return a > b ? -1 : b > a ? 1 : 0
    }
  }

  return ranks.sort((a, b) => {
    return a.combo > b.combo
      ? -1
      : b.combo > a.combo
      ? 1
      : ranksByResult(a.result, b.result)
  })
}

function process () {
  const table = ['KS', 'AD', '3H', '7C', 'TD']
  const players = {
    john: ['9H', '7S'],
    becky: ['JD', 'QC'],
    sam: ['AC', 'KH']
  }

  parse(table)
  Object.keys(players).forEach(player => {
    console.log('checking player', player)
    parse(players[player])

    // Generate combinations
    const combinations = generateCombinations(table, players[player])

    const ranks = combinations.map(h => {
      const hand = sortCards(h)
      const count = countCards(hand)
      const rank = findRank(hand, count)

      return rank
    })

    players[player] = sortRanks(ranks)[0]
  })

  console.log('players', players)
}

process()
