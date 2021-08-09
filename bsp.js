'use strict'

const bspPool = [{xs: 0, ys: 0, W: window.innerWidth - 1, H: window.innerHeight - 1}]
let i = 50

function processPosition(imgRef) {
  console.log(1, imgRef.width, imgRef.height)
  imgRef.width = 200
  imgRef.style.position = 'absolute'
  imgRef.style.top = i + 'px'
  imgRef.style.left = i + 'px'
  i += 50
  return true
}
