'use strict'
const SIZE_THRESHOLD = 10, imgRefs = [], imgRefsBckp = [], bspPool = [], P = [], formData = {apiKey: null, tags: null, photosCount: '10'}
let to, request, messagePermanent, okToSend, withCallback, jsonWithImages

function prepareJson() {
  request = new XMLHttpRequest()
  request.addEventListener('load', addImagesOrShowErrorMessage) // to samo: data => addImagesOrShowErrorMessage.bind(data.target)()
  request.addEventListener('error', () => {
    request = null
    showMessage(REFS.errorTemplate, false)
  })
  request.open('GET', `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${formData.apiKey}` +
    `&format=json&tags=${formData.tags}&nojsoncallback=1&media=photos&per_page=${formData.photosCount}`)
  request.send()
}

function prepareJsonWithJsonCallback() {
  const s = document.createElement('script') // TODO czy zapytanie z callbackiem można przerwać?
  s.src = `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${formData.apiKey}` +
    `&format=json&tags=${formData.tags}&jsoncallback=${addImagesOrShowErrorMessage.name}&media=photos&per_page=${formData.photosCount}`
  document.documentElement.removeChild(document.documentElement.appendChild(s))
}

function addImagesOrShowErrorMessage(object) {
  request = null
  if (this?.responseText) {
    object = JSON.parse(this.responseText)
  }
  if (object.stat === 'ok' && object.total) {
    DIALOG_REF.style.right = `${DEFAULT_PADDING}`
    addImages(jsonWithImages = object)
    return
  }
  showMessage(REFS.errorTemplate, false)
  console.error(object.message)
}

function addImages(parsedJson, fromResize) {
  !fromResize && removeImgs()
  initBspPool()
  parsedJson.photos.photo.reduce((previousValue, currentValue, currentIndex) => previousValue.then(data => {
    if ('end' === data.errEvType) {
      return new Promise(resolve => resolve(data))
    }
    return new Promise((resolve, reject) => createImg(currentValue, currentIndex, resolve, reject, data.errCnt))
  }, data => {
    errorToConsole(data)
    return new Promise((resolve, reject) => createImg(currentValue, currentIndex, resolve, reject, data.errCnt))
  }), new Promise(resolve => resolve({errCnt: 0})))
    .catch(data => {
      errorToConsole(data)
      return new Promise(resolve => resolve(data))
    })
    .then(data => {
      summaryToConsole(data)
      if (data.errCnt) {
        showMessage(REFS.errorTemplate)
        return
      }
      showMessage(REFS.loadedTemplate)
    })
}

function resizeEnd() {
  if (jsonWithImages) {
    let temp

    removeImageElementsFromDom()
    imgRefsBckp.forEach((it, idx) => {
      if (!(temp = imgRefs[idx]).errEvType) {
        imgRefs[idx].width = it.w
        imgRefs[idx].height = it.h
      }
    })
    addImages(jsonWithImages, true)
  }
}

function createImg(it, idx, resolve, reject, errCnt) {
  let temp

  if (undefined === (temp = selectArea(it))) {
    resolve({idx: idx - 1, errCnt, errEvType: 'end'})
    return
  }
  if (imgRefs[idx]) {
    if (imgRefs[idx].errEvType) {
      reject(imgRefs[idx])
      return
    }
    imgRefs[idx] = doBspAndReturnImgRef(temp, imgRefs[idx])
    resolve({idx, errCnt})
    return
  }
  const imgElement = new Image()
  imgElement.style.position = 'absolute'
  imgElement.alt = it.title
  imgElement.src = `https://farm${it.farm}.staticflickr.com/${it.server}/${it.id}_${it.secret}.jp${idx === 4 || idx === 9 ? 'g' : 'g'}` +
    `?t=${new Date().getTime()}`
  imgElement.addEventListener('load', () => {
    imgRefsBckp[idx] = {w: imgElement.width, h: imgElement.height}
    imgRefs[idx] = doBspAndReturnImgRef(temp, imgElement)
    resolve({idx, errCnt})
  })
  imgElement.addEventListener('error', errEv => reject(imgRefs[idx] = {idx, errCnt: ++errCnt, errEvType: errEv.type}))
}

function removeImgs() {
  removeImageElementsFromDom()
  imgRefs.splice(0)
  imgRefsBckp.splice(0)
}

function initBspPool() {
  bspPool.splice(0, bspPool.length, new Area(0, 0, window.innerWidth, window.innerHeight))
}

function removeImageElementsFromDom() {
  imgRefs.forEach(it => it.errEvType || it.remove())
}

function doBspAndReturnImgRef(areaIdx, img) {
  doBsp(areaIdx, img)
  return IMG_CONTAINER_REF.appendChild(img)
}

try {
  if (process) {
    module.exports = {bspPool, P, SIZE_THRESHOLD}
  }
} catch {
}
