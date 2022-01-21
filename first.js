'use strict'
const DEFAULT_PADDING = getComputedStyle(document.querySelector(':root')).getPropertyValue('--DEFAULT-PADDING'), REFS = {}
const DIALOG_REF = document.querySelector('dialog#dialogContainer')
const IMG_CONTAINER_REF = document.querySelector('div#imageContainer')
const MESSAGE_REF = document.querySelector('div#messageContainer')
const RESIZE_TIMEOUT_MS = 500
let OK_BUTTON_REF, tempRefForDialogContent, tempRefForMessageContent, resizeTimeout

document.querySelectorAll('template').forEach(it => {
  const temp = REFS['$' + it.id] = it.content.firstElementChild
  Object.defineProperty(REFS, it.id, {
    get: function () {
      return temp.cloneNode(true)
    }
  })
})
showTemplateInDialog(REFS.startTemplate)
openCloseModal(true)
window.addEventListener('resize', function () {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    resizeEnd()
    clearTimeout(resizeTimeout)
  }, RESIZE_TIMEOUT_MS)
})
window.addEventListener('load', loadFormData, {once: true})
