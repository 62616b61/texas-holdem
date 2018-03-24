function sortCards (array) {
  return array.sort((a, b) => a.face > b.face ? -1 : (b.face > a.face ? 1 : 0))
}

function sortRanks (ranks) {
  return ranks.sort((a, b) => {
    const cA = [a.rule].concat(a.combo, a.kickers)
    const cB = [b.rule].concat(b.combo, b.kickers)

    for (let i = 0; i < cA.length; i++) {
      if (cA[i] > cB[i]) {
        return -1
      } else if (cB[i] > cA[i]) {
        return 1
      } else {
        continue
      }
    }

    return 0
  })
}

module.exports = {
  sortCards,
  sortRanks
}
