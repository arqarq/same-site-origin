'use strict'
const DEFAULT_PADDING = getComputedStyle(document.querySelector(':root')).getPropertyValue('--DEFAULT-PADDING')
const BODY_REF = document.body, REFS = {}, DIALOG_REF = document.querySelector('dialog#dialogContainer')
const IMG_CONTAINER_REF = document.querySelector('div#imageContainer')
let tempRefForDialogContainer, tempRefForBody

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
