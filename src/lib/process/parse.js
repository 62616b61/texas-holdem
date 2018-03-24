const { faceToNum } = require('../other')

/*
 * Parses an array of strings into an array of objects.
 */
module.exports = function parse (array) {
  const result = []

  for (let i = 0; i < array.length; i++) {
    const face = array[i][0]
    const suit = array[i][1]

    result.push({
      face: parseInt(face) ? parseInt(face) : faceToNum[face],
      suit
    })
  }

  return result
}
