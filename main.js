'use strict'
let to
let apiKeyOrAddress
let request
let okToSend
const imgRefs = []

function start() {
  clearBodyRef()
  showTemplateInDialog(REFS.formTemplate)
  dialogToTopRight(true)
  document.querySelector('input#api_key').focus()
  clearTimeout(to)
  request?.abort()
}

function onEnter(ev) {
  if (okToSend && ev.keyCode === 13) {
    sendPressed()
  }
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
      '&format=json&tags=cat,dog&nojsoncallback=1&media=photos&per_page=8'
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
    addImages(parsed)
    showTemplateInBody(REFS.loadedTemplate)
    return
  }
  showTemplateInBody(REFS.errorTemplate)
  console.log(parsed.message)
}

function parseApiKey(ev) {
  const okButtonRef = document.querySelector('button#ok_button')
  if ((apiKeyOrAddress = ev.target.value).length === 32) {
    okButtonRef.removeAttribute('disabled')
    okToSend = true
    return
  }
  if (!okButtonRef.hasAttribute('disabled')) {
    okButtonRef.setAttribute('disabled', '')
    okToSend = false
  }
}

function addImages(parsedJson) {
  const imgCount = imgRefs.length
  for (let i = 0; i < imgCount; i++) {
    removeTemplateFromPlaceRef(...imgRefs.splice(0, 1), IMG_CONTAINER_REF)
  }
  parsedJson.photos.photo.forEach(it => {
    const cloneFromImageTemplate = REFS.imageTemplate
    cloneFromImageTemplate.setAttribute('src', `https://farm${it.farm}.staticflickr.com/${it.server}/${it.id}_${it.secret}.jpg`)
    cloneFromImageTemplate.setAttribute('alt', it.title)
    imgRefs.push(showTemplateInPlaceRef(cloneFromImageTemplate, IMG_CONTAINER_REF))
  })
}
