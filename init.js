'use strict'
const DEFAULT_PADDING = getComputedStyle(document.querySelector(':root')).getPropertyValue('--DEFAULT-PADDING'), REFS = {},
  DIALOG_REF = document.querySelector('#dialogContainer'), IMG_CONTAINER_REF = document.querySelector('#imageContainer'),
  MESSAGE_REF = document.querySelector('#messageContainer'), RESIZE_TIMEOUT_MS = 500
let OK_BUTTON_REF, tempRefForDialogContent, tempRefForMessageContent, resizeTimeout, transitionEndRanOnce

document.querySelectorAll('template').forEach(it => {
  const temp = REFS['$' + it.id] = it.content.firstElementChild
  Object.defineProperty(REFS, it.id, {
    get: function () {
      return temp.cloneNode(true)
    }
  })
})
showTemplateInDialog(REFS.startTemplate)
DIALOG_REF.setAttribute('open', '')
window.addEventListener('resize', function () {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    clearTimeout(resizeTimeout)
    resizeEnd()
  }, RESIZE_TIMEOUT_MS)
})
window.addEventListener('load', loadFormData, {once: true})
