'use strict'
const {findMax, doBsp, selectArea} = require('./bsp'), {Area} = require('./util'), {bspPool} = require('./imgs')
let i = 0

console.log(++i + '.')
bspPool.push(new Area(300, 300, 5, 5), new Area(30, 30, 5, 5), // Given
  new Area(0, 0, 10, 11), new Area(10, 0, 11, 10))
const W = findMax('W') // When
const H = findMax('H')
console.log('should find bspPool\'s index of area with max width,\t\t\texpected:', 3, 'actual:', W) // Then
console.log('should find bspPool\'s index of area with max height,\t\t\texpected:', 2, 'actual:', H)
console.log(++i + '.')
bspPool.splice(0, bspPool.length, new Area(0, 0, 15, 15))
doBsp(0, {width: 5, height: 5, style: {}})
console.log('bspPool should contain number of areas after image 5x5 added,\t\texpected:', 2, 'actual:', bspPool.length)
console.log('bspPool should contain area with params (xs: 5, ys: 0, W: 10, H: 15),\texpected:', true, 'actual:',
  bspPool.findIndex(it => it.xs === 5 && it.ys === 0 && it.W === 10 && it.H === 15) > -1)
console.log('bspPool should contain area with params (xs: 0, ys: 5, W: 5, H: 10),\texpected:', true, 'actual:',
  bspPool.findIndex(it => it.xs === 0 && it.ys === 5 && it.W === 5 && it.H === 10) > -1)
console.log(++i + '.')
bspPool.splice(0, bspPool.length, new Area(5, 0, 3, 15), new Area(0, 5, 5, 10))
let img = {width: 5, height: 5, style: {}}
const areaId = 0
doBsp(areaId, img)
console.log('image 5x5 should be scaled down to expected width:', 3, 'height:', 3, '\t\tactual width:', img.width, 'height:', img.height)
console.log('image 5x5 should have expected position left:', 5, 'px, top:', 0, 'px', '\t\tactual left:',
  +img.style.left.substring(0, img.style.left.length - 2), 'px, top:', +img.style.top.substring(0, img.style.left.length - 2), 'px')
console.log('bspPool should contain area with params (xs: 0, ys: 5, W: 5, H: 10),\texpected:', true, 'actual:',
  bspPool.findIndex(it => it.xs === 0 && it.ys === 5 && it.W === 5 && it.H === 10) > -1)
console.log('bspPool should contain area with params (xs: 5, ys: 3, W: 3, H: 12),\texpected:', true, 'actual:',
  bspPool.findIndex(it => it.xs === 5 && it.ys === 3 && it.W === 3 && it.H === 12) > -1)
console.log(++i + '.')
doBsp(areaId, img)
console.log('image 3x3 should be scaled up to expected width:', 5, 'height:', 5, '\t\tactual width:', img.width, 'height:', img.height)
console.log('image 3x3 should have expected position left:', 0, 'px, top:', 5, 'px', '\t\tactual left:',
  +img.style.left.substring(0, img.style.left.length - 2), 'px, top:', +img.style.top.substring(0, img.style.left.length - 2), 'px')
console.log('bspPool should contain area with params (xs: 0, ys: 10, W: 5, H: 5),\texpected:', true, 'actual:',
  bspPool.findIndex(it => it.xs === 0 && it.ys === 10 && it.W === 5 && it.H === 5) > -1)
console.log(++i + '.')
bspPool.splice(0, bspPool.length, new Area(5, 0, 6, 4), new Area(0, 4, 5, 5))
img = {width: 3, height: 3, style: {}}
console.log('should choose area with lower side difference regardless axis\t\texpected:', 1, 'actual:', selectArea(img))
