'use strict'

let bspPool, i = 50
const P = []

function processPosition(imgRef) {
  const wasEmptyAreaInArray = bsp(imgRef)
  if (wasEmptyAreaInArray) {
    console.log(1, imgRef.width, imgRef.height)
    imgRef.width = 200
    imgRef.style.position = 'absolute'
    imgRef.style.top = i + 'px'
    imgRef.style.left = i + 'px'
    i += 50
  }
  return wasEmptyAreaInArray
}

function bsp(it) {
  let indexOfElWithMaxW, temp = 0

  bspPool.forEach((it, idx) => {
    if (it.W > temp) {
      temp = it.W
      indexOfElWithMaxW = idx
    }
  })
  if (typeof indexOfElWithMaxW === 'number') {
    const area = bspPool.splice(indexOfElWithMaxW, 1)[0]
    P[1] = true
    P[2] = true
    console.log('area:', area)
    if (compareSide(area.W, it.width, 1)) {

    }
    return true
  }
  return false
}

function compareSide(left, right, blockAreaCalc) {
  if (left === right) {
    P[blockAreaCalc] = false
  }
  return left >= right
}
