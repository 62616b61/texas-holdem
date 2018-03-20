const table = ['KS', 'AD', '3H', '7C', 'TD']
const john = ['9H', '7S']
const becky = ['JD', 'QC']
const sam = ['AC', 'KH']

const hand = table.concat(john)

function parse (hand) {
  const faceToNum = {
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
  }

  return hand.map(card => {
    const face = card[0]
    const suit = card[1]

    return {
      face: parseInt(face) ? face : faceToNum[face],
      suit
    }
  })
}

function sort (hand) {
  return hand.sort((a, b) => a.face > b.face ? -1 : (b.face > a.face ? 1 : 0))
}

function identify (hand) {
  const rules = [
    // Straight Flush
    (hand) => {
      console.log('straight flush')
      return false
    },

    // Four of a Kind
    (hand) => {
      console.log('four of a kind')
      // apply optimizations here
      for (let i = 0; i < 15; i++) {
        const same = hand.filter(card => card.face).length

        if (same === 4) return true
      }

      return false
    },

    // Full House
    (hand) => {
      console.log('full house')
      return false
    },

    //
    //
    //

    // pair
    (hand) => {
      console.log('pair')
      let current = hand[0]
      const found = []
      for (let i = 1; i < hand.length; i++) {
        console.log('r', current.face, hand[i].face)
        if (current.face == hand[i].face) {
          found.push(hand[i].face)
        }
        else current = hand[i]
      }

      return !!found.length ? {
        result: true,
        faces: found
      } : false
    },
  ]

  return rules.some(rule => {
    const ruleCheck = rule(hand)

    console.log(ruleCheck)

    return ruleCheck.result ? ruleCheck.result : ruleCheck
  })
}

const result = identify(sort(parse(hand)))

console.log(result)
