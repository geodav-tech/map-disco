import './styles.css'
import mapStyle from './map-style'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

let map = new maplibregl.Map({
  container: 'map', // container id
  style: mapStyle,
  center: [0, 0], // starting position [lng, lat]
  zoom: 0 // starting zoom
})

// override the youtube video as needed
const urlParams = new URLSearchParams(window.location.search)
if (urlParams.get('video')) {
  document.getElementById('video').src = `//www.youtube.com/embed/${urlParams.get('video')}?rel=0`
}

let discoColors = [
  // colors and their associated png favicon. it's dumb that parceljs can't handle static assets better and makes me import them...
  // well in 30 minutes of struggling nothing worked and i got impatient, so maybe if you dig deeper they're a way.
  ['#ff0000', require('./funky-favicons/favicon-ff0000.png')],
  ['#ffaa00', require('./funky-favicons/favicon-ffaa00.png')],
  ['#aaff00', require('./funky-favicons/favicon-aaff00.png')],
  ['#00ff00', require('./funky-favicons/favicon-00ff00.png')],
  ['#00ffa9', require('./funky-favicons/favicon-00ffa9.png')],
  ['#00a9ff', require('./funky-favicons/favicon-00a9ff.png')],
  ['#0000ff', require('./funky-favicons/favicon-0000ff.png')],
  ['#aa00ff', require('./funky-favicons/favicon-aa00ff.png')],
  ['#ff00aa', require('./funky-favicons/favicon-ff00aa.png')]
]

function shuffle(array) {
  let currentIndex = array.length, randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

function getFunky() {
  // need to replace each of these indices in map layers style; these define country fill colors
  let fillColors = shuffle([3, 5, 7, 9, 11, 13, 15, 17, 18])

  fillColors.forEach((fillColorIndex, arrayIndex) => {
    mapStyle.layers[1].paint['fill-color'][fillColorIndex] = discoColors[arrayIndex][0]
  })

  map.setStyle(mapStyle)

  // set the favicon to a random color
  let randomColorFavicon = discoColors[Math.floor(Math.random() * discoColors.length)][1]
  let favicon = document.querySelector("link[rel~='icon']")
  favicon.href = randomColorFavicon
}

document.getElementById('party-button').onclick = () => {
  // hide the button
  document.getElementById('party-button').classList.toggle('zind-99')

  // start the music
  document.getElementById('video').src += "&autoplay=1"
  document.getElementById('video').classList.add('zind-99') // bring to front

  // show the disco ball
  document.getElementById('disco-ball').classList.add('zind-99') // bring to front
  
  // get funky at 104 bpm to match with the beegees (decimals probably get ignored?)
  setInterval(getFunky, 576.923077)
}
