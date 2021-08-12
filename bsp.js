'use strict'

let bspPool, i = 50

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

function bsp(imgRef) {
  let indexOfMaxEl
  let temp = 0

  bspPool.forEach((it, idx) => {
    if (it.W > temp) {
      temp = it.W
      indexOfMaxEl = idx
    }
  })
  if (typeof indexOfMaxEl === 'number') {
    const area = bspPool.splice(indexOfMaxEl, 1)[0]
    console.log('area:', area)
    return true
  }
  return false
}
