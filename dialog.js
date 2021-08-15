'use strict'
let to

function dialogToTopRight(reset) {
  if (reset) {
    DIALOG_REF.style.removeProperty('position')
    DIALOG_REF.style.removeProperty('left')
    DIALOG_REF.style.removeProperty('right')
    DIALOG_REF.classList.remove('transparent')
    return
  }
  DIALOG_REF.style.position = 'fixed'
  DIALOG_REF.style.left = 'unset'
  DIALOG_REF.style.right = `${DEFAULT_PADDING}`
  DIALOG_REF.classList.add('transparent')
}

function showTemplateInBody(templateRef, returnRef) {
  clearBodyRef()
  if (returnRef) return BODY_REF.appendChild(templateRef)
  tempRefForBody = BODY_REF.appendChild(templateRef)
}

function showTemplateInDialog(templateRef) {
  clearDialogRef()
  tempRefForDialogContainer = DIALOG_REF.appendChild(templateRef)
}

function clearBodyRef(tempRef = tempRefForBody) {
  BODY_REF.contains(tempRef) && BODY_REF.removeChild(tempRef)
}

function clearDialogRef(tempRef = tempRefForDialogContainer) {
  DIALOG_REF.contains(tempRef) && DIALOG_REF.removeChild(tempRef)
}

function showTemplateInPlaceRef(templateRef, placeRef) {
  return placeRef.appendChild(templateRef)
}

function removeTemplateFromPlaceRef(templateRef, placeRef) {
  placeRef.contains(templateRef) && placeRef.removeChild(templateRef)
}

function openCloseModal(open) {
  open ? DIALOG_REF.setAttribute('open', '') : DIALOG_REF.removeAttribute('open')
}

function start() {
  request?.abort()
  clearTimeout(to)
  clearBodyRef()
  dialogToTopRight(true)
  showTemplateInDialog(REFS.formTemplate)
  const element = document.querySelector('input#api_key')
  element.value = apiKey
  element.focus()
  document.querySelector('input#tags').value = tags
  document.querySelector('input#photosCount').value = photosCount
  document.querySelector(`input#requestKind${withCallback ? 'WithCallback' : ''}`).checked = true
  parseApiKey()
}

function onEnter(ev) {
  (okToSend && ev.keyCode === 13) && sendPressed()
}

function onEscape(ev) {
  (ev.keyCode === 27) && cancel()
}

function sendPressed() {
  showTemplateInBody(REFS.loadingTemplate)
  cancel()
  to = setTimeout(() => {
    withCallback ? prepareJsonWithJsonCallback() : prepareJson()
    clearTimeout(to)
  }, 500)
}

function cancel() {
  clearDialogRef()
  imgsWereAddedOnce && dialogToTopRight(false)
  showTemplateInDialog(REFS.startTemplate)
}
