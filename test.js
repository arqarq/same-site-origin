'use strict'
const bspPool = []

class Area {
  constructor(xs, ys, W, H) {
    this.xs = xs
    this.ys = ys
    this.W = W
    this.H = H
  }
}

function findMax(key) {
  let indexOfElWithMax, temp = -Infinity

  bspPool.forEach((it, idx) => {
    if (it[key] > temp) {
      temp = it[key]
      indexOfElWithMax = idx
    }
  })
  return indexOfElWithMax
}

bspPool.push(new Area(30, 30, 5, 5), new Area(0, 0, 10, 11), new Area(10, 0, 11, 10))
console.log(findMax('W') === 2)
console.log(findMax('H') === 1)
