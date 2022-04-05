'use strict'

class Area {
  constructor(xs, ys, W, H) {
    this.xs = xs
    this.ys = ys
    this.W = W
    this.H = H
  }
}

function dialogToTopRightPrepare() {
  DIALOG_REF.style.right = DIALOG_REF.getBoundingClientRect().left + 'px'
  DIALOG_REF.style.left = 'auto'
}

function showTemplateInMessage(templateRef) {
  tempRefForMessageContent?.remove()
  tempRefForMessageContent = MESSAGE_REF.appendChild(templateRef)
}

function showTemplateInDialog(templateRef) {
  tempRefForDialogContent?.remove()
  tempRefForDialogContent = DIALOG_REF.appendChild(templateRef)
}

function switchMessageVisibility(setTransparent) {
  !messagePermanent && changeElementTransparency(MESSAGE_REF, !setTransparent)
}

function showMessage(refTemplate, setPermanent) {
  showTemplateInMessage(refTemplate)
  changeMessageVisibility(setPermanent)
}

function changeMessageVisibility(setPermanent) {
  messagePermanent = setPermanent
  changeElementTransparency(MESSAGE_REF, setPermanent)
}

function changeElementTransparency(ref, removeOrSet) {
  removeOrSet ? ref.classList.remove('transparent') : ref.classList.add('transparent')
}

function errorToConsole(data) {
  console.log(`błąd typu '${data.errEvType}' w zapytaniu: ${data.idx + 1}/${formData.photosCount}`)
}

function summaryToConsole(data) {
  console.log(`zapytań: ${data.idx + 1}/${formData.photosCount}, w tym z błędem: ${data.errCnt}`)
}

function storeFormData(data) {
  localStorage.setItem('formData', JSON.stringify(data))
}

function loadFormData() {
  let data

  if (data = JSON.parse(localStorage.getItem('formData'))) {
    Object.keys(data).forEach(key => formData[key] = data[key])
  }
}

try {
  if (process) {
    module.exports = {Area}
  }
} catch {
}
