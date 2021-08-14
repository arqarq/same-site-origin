'use strict'

const bspPool = [], P = []

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
    if (compareGE(area.W, it.width, 1)) {
      if (!compareLE(it.height, area.H, 2)) {
        it.width = Math.ceil(it.width * area.H / it.height)
        it.height = area.H
        area.W !== it.width && (P[1] = true)
      }
    } else {
      const tempHeight = Math.ceil(it.height * area.W / it.width)
      if (compareGE(area.H, tempHeight, 2)) {
        it.width = area.W
        it.height = tempHeight
      } else {
        it.width = Math.ceil(it.width * area.H / it.height)
        it.height = area.H
        area.W !== it.width && (P[1] = true)
      }
    }
    it.style.left = area.xs + 'px'
    it.style.top = area.ys + 'px'
    divideSpace(area, it)
    return true
  }
  return false
}

function compareGE(left, right, blockAreaCalc) {
  if (left <= right) {
    P[blockAreaCalc] = false
  }
  return left >= right
}

function compareLE(left, right, blockAreaCalc) {
  if (left >= right) {
    P[blockAreaCalc] = false
  }
  return left <= right
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
