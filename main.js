'use strict'
let to, request, okToSend, apiKey = null, tags = null, photosCount = '1'
const imgRefs = []

function start() {
  clearBodyRef()
  showTemplateInDialog(REFS.formTemplate)
  dialogToTopRight(true)
  const element = document.querySelector('input#api_key')
  element.value = apiKey
  element.focus()
  document.querySelector('input#tags').value = tags
  document.querySelector('input#photosCount').value = photosCount
  parseApiKey()
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
    request = new XMLHttpRequest()
    request.addEventListener('load', reqListener)
    request.addEventListener('error', () => showTemplateInBody(REFS.errorTemplate))
    request.open('GET', `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apiKey}` +
      `&format=json&tags=${tags}&nojsoncallback=1&media=photos&per_page=${photosCount}`)
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
  if (ev && ((apiKey = ev.target.value).length === 32) || apiKey?.length === 32) {
    okButtonRef.removeAttribute('disabled')
    okToSend = true
    return
  }
  if (!okButtonRef.hasAttribute('disabled')) {
    okButtonRef.setAttribute('disabled', '')
    okToSend = false
  }
}

function parseTags(ev) {
  tags = ev.target.value
}

function parseCount(ev) {
  photosCount = ev.target.value
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
