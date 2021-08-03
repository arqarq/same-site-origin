'use strict'
let to

function start() {
  DIALOG_REF.removeChild(tempRefForDialogContainer)
  tempRefForDialogContainer = DIALOG_REF.appendChild(REFS.formTemplate)
  dialogToTopRight(false)
  if (BODY_REF.contains(tempRefForBody)) {
    BODY_REF.removeChild(tempRefForBody)
  }
  clearTimeout(to)
}

function sendPressed() {
  dialogToTopRight(true)
  DIALOG_REF.removeChild(tempRefForDialogContainer)
  tempRefForDialogContainer = DIALOG_REF.appendChild(REFS.startTemplate)
  prepareJson()
}

function cancel() {
  DIALOG_REF.removeChild(tempRefForDialogContainer)
  tempRefForDialogContainer = DIALOG_REF.appendChild(REFS.startTemplate)
}

function openCloseModal(open) {
  open ? DIALOG_REF.setAttribute('open', '') : DIALOG_REF.removeAttribute('open')
}

function dialogToTopRight(move) {
  if (move) {
    DIALOG_REF.style.margin = `0 ${DEFAULT_PADDING} 0 0`
    DIALOG_REF.style.position = 'fixed'
    DIALOG_REF.style.left = 'unset'
    DIALOG_REF.style.right = '0'
    return
  }
  DIALOG_REF.style.removeProperty('margin')
  DIALOG_REF.style.removeProperty('position')
  DIALOG_REF.style.removeProperty('left')
  DIALOG_REF.style.removeProperty('right')
}

function prepareJson() {
  tempRefForBody = BODY_REF.appendChild(REFS.loadingTemplate)
  to = setTimeout(() => {
    showError()
    clearTimeout(to)
  }, 4000)
}

function showError() {
  BODY_REF.removeChild(tempRefForBody)
  tempRefForBody = BODY_REF.appendChild(REFS.errorTemplate)
}
