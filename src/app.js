const HandChecks  = require('./hands.js')

function sort (hand) {
  return hand.sort((a, b) => {
    return a.face > b.face ? -1 : (b.face > a.face ? 1 : 0)
  })
}

function parse (hand) {
  const faceToNum = {
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
  }

  const cards = hand.map(card => {
    const face = card[0]
    const suit = card[1]

    return {
      face: parseInt(face) ? parseInt(face) : faceToNum[face],
      suit
    }
  })

  const count = cards.reduce((acc, card) => {
    if (acc[card.face]) {
      acc[card.face]++
    } else {
      acc[card.face] = 1
    }

    return acc
  }, {})

  return {
    cards: sort(cards),
    count
  }
}


function performChecks ({cards, count}) {
  HandChecks.some(check => {
    const result = check(cards, count)

    console.log(result)

    return result.combo ? true : result
  })
}


function process (cards) {
  const payload = parse(cards)

  console.log('PAYLOAD', payload)

  performChecks(payload)
}

process(['KS', 'KS', 'KH', 'JS', 'JC'])
