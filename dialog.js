'use strict'

function start() {
  if (request) {
    clearTimeout(to)
    request.abort() // TODO AbortController?
    request = null
    tempRefForMessageContent.remove()
  }
  showTemplateInDialog(REFS.formTemplate)
  OK_BUTTON_REF = document.querySelector('#ok_button')
  parseApiKey()
  const element = document.querySelector('#apiKey')
  element.value = formData.apiKey
  element.focus()
  document.querySelector('#tags').value = formData.tags
  document.querySelector('#photosCount').value = formData.photosCount
  document.querySelector(`#requestKind${withCallback ? 'WithCallback' : ''}`).checked = true
  !jsonWithImages && dialogToTopRightPrepare()
}

function onEnter(ev) {
  okToSend && ev.keyCode === 13 && okPressed()
}

function onEscape(ev) {
  ev.keyCode === 27 && cancel()
}

function okPressed() {
  if (jsonWithImages) {
    showTemplateInDialog(REFS.startTemplate)
  } else {
    DIALOG_REF.classList.add('move-right')
  }
  showMessage(REFS.loadingTemplate, true)
  to = setTimeout(() => {
    clearTimeout(to)
    storeFormData(formData)
    withCallback ? prepareJsonWithJsonCallback() : prepareJson()
  }, 100)
}

function cancel() {
  showTemplateInDialog(REFS.startTemplate)
  if (jsonWithImages) {
    changeElementTransparency(DIALOG_REF, false)
  } else {
    DIALOG_REF.style.removeProperty('left')
    DIALOG_REF.style.removeProperty('right')
  }
  changeMessageVisibility(false)
}

function transitionEnd() {
  if (transitionEndRanOnce) {
    showTemplateInDialog(REFS.startTemplate)
    DIALOG_REF.classList.remove('move-right')
    DIALOG_REF.classList.add('transparent')
    DIALOG_REF.ontransitionend = null
    return
  }
  transitionEndRanOnce = true
}

function parse(ev) {
  formData[ev.target.id] = ev.target.value
}

function parsePhotosCount(ev) {
  const count = formData[ev.target.id] = ev.target.value
  if (count > 0 && formData.apiKey?.length === 32) {
    okButtonEnable(OK_BUTTON_REF)
    return
  }
  okButtonDisable(OK_BUTTON_REF)
}

function parseKind(ev) {
  withCallback = ev.target.value
}

function parseApiKey(ev) {
  const apiKey = ev && (formData[ev.target.id] = ev.target.value)
  if (formData.photosCount > 0 && (apiKey?.length === 32 || formData.apiKey?.length === 32)) {
    okButtonEnable(OK_BUTTON_REF)
    return
  }
  okButtonDisable(OK_BUTTON_REF)
}

function okButtonDisable(okButtonRef) {
  if (!okButtonRef.hasAttribute('disabled')) {
    okButtonRef.setAttribute('disabled', '')
    okToSend = false
  }
}

function okButtonEnable(okButtonRef) {
  if (okButtonRef.hasAttribute('disabled')) {
    okButtonRef.removeAttribute('disabled')
    okToSend = true
  }
}
