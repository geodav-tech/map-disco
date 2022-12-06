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

let discoColors = [
  '#ff0000',
  '#ffaa00',
  '#aaff00',
  '#00ff00',
  '#00ffa9',
  '#00a9ff',
  '#0000ff',
  '#aa00ff',
  '#ff00aa'
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
    mapStyle.layers[2].paint['fill-color'][fillColorIndex] = discoColors[arrayIndex]
  })

  map.setStyle(mapStyle)
}

map.once('click', () => {
  // start the music
  document.getElementById('video').src += "&autoplay=1"
  
  // get funky at 104 bpm to match with the beegees (decimals probably get ignored?)
  setInterval(getFunky, 576.923077)
})
