'use strict'

const bspPool = [{xs: 0, ys: 0, W: window.innerWidth, H: window.innerHeight}]
let i = 50
console.log(bspPool)

function processPosition(imgRef) {
  console.log(1, imgRef.width, imgRef.height)
  imgRef.width = 40
  imgRef.style.position = 'absolute'
  imgRef.style.top = i + 'px'
  imgRef.style.left = i + 'px'
  i += 50
  return imgRef
}
