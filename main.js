'use strict'
let request, okToSend, imgsWereAddedOnce, withCallback, apiKey = null, tags = null, photosCount = '1'
const imgRefs = [], imgRefsBckp = []

function prepareJson() {
  request = new XMLHttpRequest()
  request.addEventListener('load', addImagesOrShowErrorMessage) // to samo: (data) => addImagesOrShowErrorMessage.bind(data.target)()
  request.addEventListener('error', () => showTemplateInBody(REFS.errorTemplate))
  request.open('GET', `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apiKey}` +
    `&format=json&tags=${tags}&nojsoncallback=1&media=photos&per_page=${photosCount}`)
  request.send()
}

function prepareJsonWithJsonCallback() {
  const s = document.createElement('script') // TODO czy zapytanie z callbackiem można przerwać?
  s.src = `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apiKey}` +
    `&format=json&tags=${tags}&jsoncallback=${addImagesOrShowErrorMessage.name}&media=photos&per_page=${photosCount}`
  document.head.removeChild(document.head.appendChild(s))
}

function addImagesOrShowErrorMessage(object) {
  if ((this?.responseText ? (object = JSON.parse(this.responseText)) : object).stat === 'ok') {
    addImages(object)
    imgsWereAddedOnce = true
    cancel()
    return
  }
  showTemplateInBody(REFS.errorTemplate)
  console.error(object.message)
}

function addImages(parsedJson) {
  removeImgs()
  initBspPool()
  const promises = parsedJson.photos.photo.map((it, idx, arr) => new Promise((resolve, reject) =>
    createImg(it, idx, arr.length, resolve, reject)))
  Promise.allSettled(promises).then(data => {
    const rejected = data.filter(it => 'rejected' === it.status)
    const fulfilled = data.find(it => 'fulfilled' === it.status)
    console.log('liczba zapytań:', `${data.length}, max:`, fulfilled ? fulfilled.value.l : '-')
    if (!rejected.length) {
      showMessage(REFS.loadedTemplate)
      return
    }
    showMessage(REFS.errorTemplate)
    rejected.forEach(it => console.log(`nie pobrano obrazka ${it.reason.idx + 1} z ${it.reason.l}:`, it.reason.errEvType))
  })
}

function createImg(it, idx, l, resolve, reject) {
  let temp

  const imgElement = document.createElement('img')
  imgElement.style.position = 'absolute'
  imgElement.setAttribute('alt', it.title)
  imgElement.setAttribute('src',
    `https://farm${it.farm}.staticflickr.com/${it.server}/${it.id}_${it.secret}.jp${idx === 100 || idx === 150 ? '' : 'g'}`)
  imgElement.addEventListener('load', () => {
    temp = imgElement.cloneNode(true)
    if (bsp(imgElement)) {
      imgRefs.push(showTemplateInPlaceRef(imgElement, IMG_CONTAINER_REF))
      imgRefsBckp.push(temp)
      resolve({idx, l})
      return
    }
    reject({idx, l, errEvType: 'not needed'})
  })
  imgElement.addEventListener('error', errEv => reject({idx, l, errEvType: errEv.type}))
}

function removeImgs() {
  const imgCount = imgRefs.length
  for (let i = 0; i < imgCount; i++) {
    removeTemplateFromPlaceRef(...imgRefs.splice(0, 1), IMG_CONTAINER_REF)
  }
  imgRefsBckp.splice(0)
}

function initBspPool() {
  bspPool.splice(0, bspPool.length, new Area(0, 0, window.innerWidth, window.innerHeight))
}
