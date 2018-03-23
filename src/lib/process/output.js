const { numToFace, numToRule } = require('../other')

function getEffectiveKickers (current, neighbour) {
  for (let i = 0; i < current.length; i++) {
    if (current[i] !== neighbour[i]) {
      return current.slice(0, i + 1)
    }
  }

  return ['Tie']
}

module.exports = function output (array) {
  let counter = 1
  const strings = []

  const groups = array.reduce((acc, cur) => {
    if (acc.length && acc[acc.length - 1][0].rule === cur.rule) {
      acc[acc.length - 1].push(cur)
    }
    else {
      acc.push([cur])
    }

    return acc
  }, [])

  groups.forEach(group => {
    for (let i = 0; i < group.length; i++) {
      const { name, rule, combo, kickers } = group[i]

      const separator = '|'
      const last = i === group.length - 1
      const displayKickers = group.length > 1 && rule === group[last ? i - 1 : i + 1].rule
      const string = [counter, name, numToRule[rule]]
        .concat(combo.map(card => numToFace(card)))
        .concat(
          displayKickers
          ? [separator].concat(
            getEffectiveKickers(kickers, group[last ? i - 1 : i + 1].kickers)
            .map(face => parseInt(face) ? numToFace(face) : face)
          )
          : []
        )

      strings.push(string.join(' '))
      counter++
    }
  })

  return strings.join('\n')
}
