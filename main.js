'use strict'
let to
let apiKeyOrAddress
let request

function start() {
  clearBodyRef()
  showTemplateInDialog(REFS.formTemplate)
  dialogToTopRight(true)
  clearTimeout(to)
  request?.abort()
}

function sendPressed() {
  dialogToTopRight(false)
  cancel()
  prepareJson()
}

function cancel() {
  clearDialogRef()
  showTemplateInDialog(REFS.startTemplate)
}

function openCloseModal(open) {
  open ? DIALOG_REF.setAttribute('open', '') : DIALOG_REF.removeAttribute('open')
}

function prepareJson() {
  showTemplateInBody(REFS.loadingTemplate)
  to = setTimeout(() => {
    apiKeyOrAddress = `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apiKeyOrAddress}` +
      '&format=json&tags=cat,dog&nojsoncallback=1&media=photos&per_page=6'
    request = new XMLHttpRequest()
    request.addEventListener('load', reqListener)
    request.addEventListener('error', () => showTemplateInBody(REFS.errorTemplate))
    request.open('GET', apiKeyOrAddress)
    request.send()
    clearTimeout(to)
  }, 2000)
}

function reqListener() {
  const parsed = JSON.parse(this.responseText)
  if (parsed.stat === 'ok') {
    showTemplateInBody(REFS.loadedTemplate)
    return
  }
  console.log(parsed.message)
  showTemplateInBody(REFS.errorTemplate)
}

function parseApiKey(ev) {
  OK_BUTTON_REF = document.querySelector('button#ok_button')
  if ((apiKeyOrAddress = ev.target.value).length === 32) {
    OK_BUTTON_REF.removeAttribute('disabled')
    return
  }
  if (!OK_BUTTON_REF.hasAttribute('disabled')) {
    OK_BUTTON_REF.setAttribute('disabled', '')
  }
}
