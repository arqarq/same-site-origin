'use strict'
const DEFAULT_PADDING = getComputedStyle(document.querySelector(':root')).getPropertyValue('--DEFAULT-PADDING')
const BODY_REF = document.body
const DIALOG_REF = document.querySelector('dialog#dialogContainer')
const REFS = {}
let tempRefForDialogContainer
let tempRefForBody

document.querySelectorAll('template').forEach(it => {
  const temp = REFS['$' + it.id] = it.content.firstElementChild
  Object.defineProperty(REFS, it.id, {
    get: function () {
      return temp.cloneNode(true)
    }
  })
})
tempRefForDialogContainer = DIALOG_REF.appendChild(REFS.startTemplate)
openCloseModal(true)
