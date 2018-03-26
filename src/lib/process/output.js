const { numToFace, numToRule } = require('../other')

/*
 * Find those kickers which decide your position in a ranking list.
 * Or, if all kickers are the same, return tie.
 */
function getEffectiveKickers (current, neighbour) {
  for (let i = 0; i < current.length; i++) {
    if (current[i] !== neighbour[i]) {
      return current.slice(0, i + 1)
    }
  }

  return ['Tie']
}

/*
 * Produces final output string out of array of users and their rank.
 */
module.exports = function output (array) {
  let counter = 1
  const output = []

  /*
   * Group resulting ranks by rule.
   * It allows to determine effective kickers among each group.
   */
  const groups = array.reduce((acc, cur) => {
    if (
      acc.length
      && acc[acc.length - 1][0].rule === cur.rule
      && cur.combo.every((card, i) => card === acc[acc.length - 1][0].combo[i])
    ) {
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

      const line = [counter, name, numToRule[rule]]
        .concat(combo.map(card => numToFace(card)))

      /*
       * Kickers should be displayed only if the number of resulting lines
       * is greater than 1 in a group.
       * Effective kickers are found by comparing kickers of
       * current resulting line and neighbouring resuling line (always next,
       * unless current resulting line is the last one in a group).
       */
      if (group.length > 1) {
        line.push(separator)
        getEffectiveKickers(kickers, group[last ? i - 1 : i + 1].kickers)
          .map(face => parseInt(face) ? numToFace(face) : face)
          .forEach(kicker => line.push(kicker))
      }

      output.push(line.join(' '))
      counter++
    }
  })

  return output.join('\n')
}
