'use strict'
const {findMax, doBsp} = require('./bsp')
const {Area} = require('./util')
const {bspPool} = require('./main')

bspPool.push(new Area(300, 300, 5, 5), new Area(30, 30, 5, 5),
  new Area(0, 0, 10, 11), new Area(10, 0, 11, 10))
console.log('should find bspPool\'s index of area with max width,\t\t\texpected:', 3, 'actual:', findMax('W'))
console.log('should find bspPool\'s index of area with max height,\t\t\texpected:', 2, 'actual:', findMax('H'))
console.log('---')
bspPool.splice(0, bspPool.length, new Area(0, 0, 15, 15))
doBsp(0, {height: 5, width: 5, style: {}})
console.log('bspPool should contain number of areas after image added,\t\texpected:', 2, 'actual:', bspPool.length)
console.log('bspPool should contain area with params (xs: 5, ys: 0, W: 10, H: 15),\texpected:', true, 'actual:',
  bspPool.findIndex(it => it.xs === 5 && it.ys === 0 && it.W === 10 && it.H === 15) > -1)
console.log('bspPool should contain area with params (xs: 0, ys: 5, W: 5, H: 10),\texpected:', true, 'actual:',
  bspPool.findIndex(it => it.xs === 0 && it.ys === 5 && it.W === 5 && it.H === 10) > -1)
