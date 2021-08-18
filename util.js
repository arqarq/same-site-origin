'use strict'
const MESSAGE_DISAPPEAR_TIMEOUT = 5000
let to2

class Area {
  constructor(xs, ys, W, H) {
    this.xs = xs
    this.ys = ys
    this.W = W
    this.H = H
  }
}

function makeElTransparentAfterTimeout(ref, setAfterMs) {
  if (setAfterMs) {
    to2 = setTimeout(() => {
      clearTimeout(to)
      ref.classList.add('transparent')
    }, setAfterMs)
    return
  }
  ref.classList.remove('transparent')
}

function showError(showPermanently) {
  clearTimeout(to2)
  tempRefForBody && makeElTransparentAfterTimeout(tempRefForBody, showPermanently ? undefined : MESSAGE_DISAPPEAR_TIMEOUT)
}

function showMessage(refTemplate) {
  showTemplateInBody(refTemplate)
  makeElTransparentAfterTimeout(tempRefForBody, MESSAGE_DISAPPEAR_TIMEOUT)
}
