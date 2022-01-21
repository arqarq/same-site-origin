'use strict'

function start() {
  if (request) {
    request.abort() // TODO AbortController?
    request = null
    tempRefForMessageContent.remove()
    clearTimeout(to)
  }
  changeMessageVisibility(true)
  dialogToTopRight(true)
  showTemplateInDialog(REFS.formTemplate)
  OK_BUTTON_REF = document.querySelector('button#ok_button')
  const element = document.querySelector('input#apiKey')
  element.value = formData.apiKey
  element.focus()
  document.querySelector('input#tags').value = formData.tags
  document.querySelector('input#photosCount').value = formData.photosCount
  document.querySelector(`input#requestKind${withCallback ? 'WithCallback' : ''}`).checked = true
  parseApiKey()
}

function onEnter(ev) {
  okToSend && ev.keyCode === 13 && okPressed()
}

function onEscape(ev) {
  ev.keyCode === 27 && cancel()
}

function okPressed() {
  showMessage(REFS.loadingTemplate, true)
  cancel(true)
  to = setTimeout(() => {
    storeFormData(formData)
    withCallback ? prepareJsonWithJsonCallback() : prepareJson()
    clearTimeout(to)
  }, 500)
}

function cancel(skipSettingMessageNotPermanent) {
  showTemplateInDialog(REFS.startTemplate)
  jsonWithImages && dialogToTopRight(false)
  !skipSettingMessageNotPermanent && changeMessageVisibility(false)
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
