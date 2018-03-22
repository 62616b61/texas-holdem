function sortCards (hand) {
  return hand.sort((a, b) => a.face > b.face ? -1 : (b.face > a.face ? 1 : 0))
}

function sortRanks (ranks) {
  const makeDecisionByResult = (a, b) => {
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
  }

  return ranks.sort((a, b) => {
    return a.combo > b.combo
      ? -1
      : b.combo > a.combo
      ? 1
      : makeDecisionByResult(a.result, b.result)
  })
}

module.exports = {
  sortCards,
  sortRanks
}
