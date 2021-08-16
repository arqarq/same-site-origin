'use strict'

const bspPool = [], P = [], SIZE_THRESHOLD = 100

class Area {
  constructor(xs, ys, W, H) {
    this.xs = xs
    this.ys = ys
    this.W = W
    this.H = H
  }
}

function bsp(it) {
  let indexOfElWithMaxW, temp = 0

  bspPool.forEach((it, idx) => {
    if (it.W > temp) {
      temp = it.W
      indexOfElWithMaxW = idx
    }
  })
  if ('number' === typeof indexOfElWithMaxW) {
    const area = bspPool.splice(indexOfElWithMaxW, 1)[0]
    P[1] = P[2] = true
    // const W = it.width >= (temp = (area.W > SIZE_THRESHOLD) ? area.W - SIZE_THRESHOLD : area.W) ? temp : area.W
    const W = area.W - it.width < SIZE_THRESHOLD + 1 ? area.W : area.W
    if (W >= it.width) {
      W === it.width && (P[1] = false)
      if (it.height <= area.H) {
        it.height === area.H && (P[2] = false)
      } else {
        backToCutWidth(area, it, W)
      }
    } else {
      const tempHeight = Math.floor(it.height * W / it.width)
      if (area.H >= tempHeight) {
        P[1] = false
        area.H === tempHeight && (P[2] = false)
        it.width = W
        it.height = tempHeight
      } else {
        backToCutWidth(area, it, W)
      }
    }
    it.style.left = area.xs + 'px'
    it.style.top = area.ys + 'px'
    divideSpace(area, it)
    return true
  }
  return false
}

function backToCutWidth(area, image, W) {
  P[2] = false
  P[1] = true
  const number = image.width * area.H / image.height
  const number2 = image.height
  image.width = Math.floor(number)
  image.height = area.H
  console.log(W !== image.width, W, image.width, number, ' -> ', image.width, number2, ' -> ', image.height)
  // area.W !== image.width && (P[1] = true)
}

function divideSpace(area, image) {
  P[1] && bspPool.unshift(new Area(area.xs + image.width, area.ys, area.W - image.width, area.H)) // right
  if (P[1] && area.W - image.width === 0) {
    console.log('area.W - image.width (', area.W, image.width, ')', area.H, area, image)
  }
  P[2] && bspPool.push(new Area(area.xs, area.ys + image.height, image.width, area.H - image.height)) // left below
  if (P[2] && area.H - image.height === 0) {
    console.log(image.width, 'area.H - image.height (', area.H, image.height, ')', area, image)
  }
}
