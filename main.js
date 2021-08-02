'use strict'

const DEFAULT_PADDING = getComputedStyle(document.querySelector(':root')).getPropertyValue('--DEFAULT-PADDING')
let tempRefForDialogContainer
let tempRefForBody

const firstElementChildOfContentOfStartTemplate = document.querySelector('template#startTemplate').content.firstElementChild
const firstElementChildOfContentOfFormTemplate = document.querySelector('template#formTemplate').content.firstElementChild
const firstElementChildOfContentOfLoadedTemplate = document.querySelector('template#loadedTemplate').content.firstElementChild
const dialogContainer = document.querySelector('dialog#dialogContainer')
const body = document.body
tempRefForDialogContainer = dialogContainer.appendChild(firstElementChildOfContentOfStartTemplate.cloneNode(true));
openCloseModal(true)

function start() {
  dialogContainer.removeChild(tempRefForDialogContainer)
  tempRefForDialogContainer = dialogContainer.appendChild(firstElementChildOfContentOfFormTemplate.cloneNode(true))
  dialogToTopRight(false)
  if (body.contains(tempRefForBody)) {
    body.removeChild(tempRefForBody)
  }
}

function sendPressed() {
  dialogToTopRight(true)
  dialogContainer.removeChild(tempRefForDialogContainer)
  tempRefForDialogContainer = dialogContainer.appendChild(firstElementChildOfContentOfStartTemplate.cloneNode(true))
  tempRefForBody = body.appendChild(firstElementChildOfContentOfLoadedTemplate.cloneNode(true))
}

function cancel() {
  dialogContainer.removeChild(tempRefForDialogContainer)
  tempRefForDialogContainer = dialogContainer.appendChild(firstElementChildOfContentOfStartTemplate)
}

function openCloseModal(open) {
  open ? dialogContainer.setAttribute('open', '') : dialogContainer.removeAttribute('open')
}

function dialogToTopRight(move) {
  if (move) {
    dialogContainer.style.margin = `0 ${DEFAULT_PADDING} 0 0`
    dialogContainer.style.position = 'fixed'
    dialogContainer.style.left = 'unset'
    dialogContainer.style.right = '0'
    return
  }
  dialogContainer.style.removeProperty('margin')
  dialogContainer.style.removeProperty('position')
  dialogContainer.style.removeProperty('left')
  dialogContainer.style.removeProperty('right')
}
