'use strict'

function dialogToTopRight(reset) {
  if (reset) {
    DIALOG_REF.style.removeProperty('margin')
    DIALOG_REF.style.removeProperty('position')
    DIALOG_REF.style.removeProperty('left')
    DIALOG_REF.style.removeProperty('right')
    return
  }
  DIALOG_REF.style.margin = `0 ${DEFAULT_PADDING} 0 0`
  DIALOG_REF.style.position = 'fixed'
  DIALOG_REF.style.left = 'unset'
  DIALOG_REF.style.right = '0'
}

function showTemplateInBody(templateRef) {
  if (BODY_REF.contains(tempRefForBody)) {
    BODY_REF.removeChild(tempRefForBody)
  }
  tempRefForBody = BODY_REF.appendChild(templateRef)
}

function showTemplateInDialog(templateRef) {
  if (DIALOG_REF.contains(tempRefForDialogContainer)) {
    DIALOG_REF.removeChild(tempRefForDialogContainer)
  }
  tempRefForDialogContainer = DIALOG_REF.appendChild(templateRef)
}

function clearBodyRef() {
  if (BODY_REF.contains(tempRefForBody)) {
    BODY_REF.removeChild(tempRefForBody)
  }
}

function clearDialogRef() {
  if (DIALOG_REF.contains(tempRefForDialogContainer)) {
    DIALOG_REF.removeChild(tempRefForDialogContainer)
  }
}
