'use strict'

function selectArea(it) {
  const indexOfElWithMaxW = findMax('W')
  const indexOfElWithMaxH = findMax('H')
  if ('number' === typeof indexOfElWithMaxW) {
    const temp = Math.abs(bspPool[indexOfElWithMaxW].W - it.width) <= Math.abs(bspPool[indexOfElWithMaxH].H - it.height)
    return temp ? indexOfElWithMaxW : indexOfElWithMaxH
  }
}

function doBsp(idx, it) {
  const area = bspPool.splice(idx, 1)[0]
  P[1] = P[2] = true
  if (area.W >= it.width) {
    if (area.W !== it.width && area.W - it.width < SIZE_THRESHOLD) {
      zoomSlightlyW(it, area.W)
    } else if (area.H > it.height && area.H - it.height < SIZE_THRESHOLD) {
      zoomSlightlyH(it, area.H, area.W)
    }
    if (it.height <= area.H) {
      it.height === area.H && (P[2] = false)
    } else {
      backToCutWidth(it, area.H)
    }
    area.W === it.width && (P[1] = false)
  } else {
    const tempHeight = Math.ceil(it.height * area.W / it.width)
    if (tempHeight <= area.H) {
      (it.height = tempHeight) === area.H && (P[2] = false)
      it.width = area.W
    } else {
      backToCutWidth(it, area.H)
    }
    area.W === it.width && (P[1] = false)
  }
  it.style.left = area.xs + 'px'
  it.style.top = area.ys + 'px'
  divideSpace(area, it)
}

function backToCutWidth(image, H) {
  P[2] = false
  image.width = Math.ceil(image.width * H / image.height)
  image.height = H
}

function zoomSlightlyW(image, W) {
  image.height = Math.ceil(image.height * W / image.width)
  image.width = W
}

function zoomSlightlyH(image, H, Wmax) {
  let temp

  if ((temp = Math.ceil(image.width * H / image.height)) <= Wmax) {
    image.width = temp
    image.height = H
  }
}

function divideSpace(area, image) {
  const log = []
  let temp

  area.H === 0 && log.push('area.H === 0')
  image.width === 0 && log.push('image.width === 0');
  (temp = area.W - image.width) === 0 && P[1] && log.push(`(P[1]) area.W - image.width === 0 (${area.W} - ${image.width})`)
  P[1] && bspPool.push(new Area(area.xs + image.width, area.ys, temp, area.H)); // right
  (temp = area.H - image.height) === 0 && P[2] && log.push(`(P[2]): area.H - image.height === 0 (${area.H} - ${image.height})`)
  P[2] && bspPool.push(new Area(area.xs, area.ys + image.height, image.width, temp)) // left below
  log.length && console.log(`P[1]: ${P[1]}, P[2]: ${P[2]},`, log.join(', '))
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
