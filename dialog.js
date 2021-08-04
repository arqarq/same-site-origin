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

function showTemplateInBody(templateRef, returnRef) {
  clearBodyRef()
  if (returnRef) {
    return BODY_REF.appendChild(templateRef)
  }
  tempRefForBody = BODY_REF.appendChild(templateRef)
}

function showTemplateInDialog(templateRef) {
  clearDialogRef()
  tempRefForDialogContainer = DIALOG_REF.appendChild(templateRef)
}

function clearBodyRef(tempRef = tempRefForBody) {
  if (BODY_REF.contains(tempRef)) {
    BODY_REF.removeChild(tempRef)
  }
}

function clearDialogRef(tempRef = tempRefForDialogContainer) {
  if (DIALOG_REF.contains(tempRef)) {
    DIALOG_REF.removeChild(tempRef)
  }
}

function showTemplateInPlaceRef(templateRef, placeRef) {
  return placeRef.appendChild(templateRef)
}

function removeTemplateFromPlaceRef(templateRef, placeRef) {
  if (placeRef.contains(templateRef)) {
    placeRef.removeChild(templateRef)
  }
}
