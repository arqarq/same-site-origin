'use strict'
let to, request, okToSend, imgsWereAddedOnce, withCallback, apiKey = null, tags = null, photosCount = '1'
const imgRefs = []

function prepareJson() {
  showTemplateInBody(REFS.loadingTemplate)
  to = setTimeout(() => {
    request = new XMLHttpRequest()
    request.addEventListener('load', addImagesOrShowErrorMessage) // to samo: (data) => addImagesOrShowErrorMessage.bind(data.target)()
    request.addEventListener('error', () => showTemplateInBody(REFS.errorTemplate))
    request.open('GET', `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apiKey}` +
      `&format=json&tags=${tags}&nojsoncallback=1&media=photos&per_page=${photosCount}`)
    request.send()
    clearTimeout(to)
  }, 2000)
}

function prepareJsonWithJsonCallback() {
  const s = document.createElement('script')
  s.src = `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apiKey}` +
    `&format=json&tags=${tags}&jsoncallback=${addImagesOrShowErrorMessage.name}&media=photos&per_page=${photosCount}`
  document.head.removeChild(document.head.appendChild(s))
}

function addImagesOrShowErrorMessage(object) {
  if ((this?.responseText ? (object = JSON.parse(this.responseText)) : object).stat === 'ok') {
    addImages(object)
    showTemplateInBody(REFS.loadedTemplate)
    imgsWereAddedOnce = true
    cancel()
    return
  }
  showTemplateInBody(REFS.errorTemplate)
  console.error(object.message)
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

function parseKind(ev) {
  withCallback = ev.target.value
}

function addImages(parsedJson) {
  const imgCount = imgRefs.length
  for (let i = 0; i < imgCount; i++) {
    removeTemplateFromPlaceRef(...imgRefs.splice(0, 1), IMG_CONTAINER_REF)
  }
  parsedJson.photos.photo.forEach(it => {
    const imgElement = document.createElement('img')
    imgElement.setAttribute('src', `https://farm${it.farm}.staticflickr.com/${it.server}/${it.id}_${it.secret}.jpg`)
    imgElement.setAttribute('alt', it.title)
    imgElement.addEventListener('load', () => {
      console.log(1, imgElement.width, imgElement.height)
      imgElement.style.width = '20px'
      console.log(2, imgElement.width, imgElement.height)
    })
    imgRefs.push(showTemplateInPlaceRef(imgElement, IMG_CONTAINER_REF))
  })
}
