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
    withCallback ? prepareJsonWithJsonCallback() : prepareJson()
    clearTimeout(to)
  }, 500)
}

function cancel(skipSettingMessageNotPermanent) {
  showTemplateInDialog(REFS.startTemplate)
  imgsWereAddedOnce && dialogToTopRight(false)
  !skipSettingMessageNotPermanent && changeMessageVisibility(false)
}

function parse(ev) {
  formData[ev.target.id] = ev.target.value
}

function parseKind(ev) {
  withCallback = ev.target.value
}

function parseApiKey(ev) {
  const okButtonRef = document.querySelector('button#ok_button')
  if (ev && (formData[ev.target.id] = ev.target.value).length === 32 || formData.apiKey.length === 32) {
    okButtonRef.removeAttribute('disabled')
    okToSend = true
    return
  }
  if (!okButtonRef.hasAttribute('disabled')) {
    okButtonRef.setAttribute('disabled', '')
    okToSend = false
  }
}
