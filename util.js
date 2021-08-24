'use strict'

class Area {
  constructor(xs, ys, W, H) {
    this.xs = xs
    this.ys = ys
    this.W = W
    this.H = H
  }
}

function dialogToTopRight(reset) {
  makeElementTransparent(DIALOG_REF, reset)
  if (reset) {
    DIALOG_REF.style.removeProperty('left')
    DIALOG_REF.style.removeProperty('right')
    return
  }
  DIALOG_REF.style.left = 'unset'
  DIALOG_REF.style.right = `${DEFAULT_PADDING}`
}

function showTemplateInMessage(templateRef) {
  tempRefForMessageContent?.remove()
  tempRefForMessageContent = MESSAGE_REF.appendChild(templateRef)
}

function showTemplateInDialog(templateRef) {
  tempRefForDialogContent?.remove()
  tempRefForDialogContent = DIALOG_REF.appendChild(templateRef)
}

function openCloseModal(open) {
  open ? DIALOG_REF.setAttribute('open', '') : DIALOG_REF.removeAttribute('open')
}

function switchMessageVisibility(setTransparent) {
  !messagePermanent && makeElementTransparent(MESSAGE_REF, !setTransparent)
}

function showMessage(refTemplate, setPermanent) {
  showTemplateInMessage(refTemplate)
  changeMessageVisibility(setPermanent)
}

function changeMessageVisibility(setPermanent) {
  messagePermanent = setPermanent
  makeElementTransparent(MESSAGE_REF, setPermanent)
}

function makeElementTransparent(ref, removeOrSet) {
  removeOrSet ? ref.classList.remove('transparent') : ref.classList.add('transparent')
}

function errorToConsole(data) {
  console.log(`błąd typu '${data.errEvType}' w zapytaniu: ${data.idx + 1}/${formData.photosCount}`)
}

function summaryToConsole(data) {
  console.log(`zapytań: ${data.idx + 1}/${formData.photosCount}, w tym z błędem: ${data.errCnt}`)
}
