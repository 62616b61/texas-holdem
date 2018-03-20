const suits = ['S', 'D', 'H', 'C']

// helpers
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

function getPairs (count) {
  const found = []
  Object.keys(count).forEach(face => {
    if (count[face] === 2) {
      found.push(face)
    }
  })

  return found.length ? found : false
}

// checks
function StraightFlush ({cards, count}) {
  console.log('straight flush')

  if (Object.keys(count).length !== 5) return false

  return sameSuit(cards) && fiveConsecutive(cards) ? {
    combo: 'straight-flush',
    result: cards.map(card => card.face)
  } : false
}

function FourOfAKind ({cards, count}) {
  console.log('four of a kind')

  let found = null
  Object.keys(count).some(face => {
    if (count[face] === 4) {
      found = face
      return true
    }
  })

  return found ? {
    combo: '4-of-a-kind',
    result: found
  } : false
}

function FullHouse ({cards, count}) {
  console.log('full house')

  const triples = ThreeOfAKind({cards, count})
  const pairs = getPairs(count)

  return triples && pairs ? {
    combo: 'full-house',
    result: {
      triples: triples.result,
      pairs: pairs[0]
    }
  } : false
}

function Flush ({cards}) {
  console.log('flush')

  return sameSuit(cards) ? {
    combo: 'flush',
    result: cards[0].suit
  } : false
}

function Straight ({cards, count}) {
  console.log('straight')

  if (Object.keys(count).length !== 5) return false

  return fiveConsecutive(cards) ? {
    combo: 'straight',
    result: cards.map(card => card.face)
  } : false
}

function ThreeOfAKind ({cards, count}) {
  console.log('three of a kind')

  let found = null
  Object.keys(count).some(face => {
    if (count[face] === 3) {
      found = face
      return true
    }
  })

  return found ? {
    combo: '3-of-a-kind',
    result: found
  } : false
}

function Pairs ({cards, count}) {
  console.log('pairs')

  const pairs = getPairs(count)

  return pairs ? {
    combo: pairs.length === 2 ? 'two-pairs' : 'pairs',
    result: pairs
  } : false
}

function HighCard ({cards}) {
  console.log('high card')

  return {
    combo: 'high-card',
    result: cards[0].face
  }
}

module.exports = [
  StraightFlush,
  FourOfAKind,
  FullHouse,
  Flush,
  Straight,
  ThreeOfAKind,
  Pairs,
  HighCard
]
