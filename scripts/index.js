// 1.) first we fetch the data from wherever it is & then we store it in the response variable.
// 2.) we then take the response variable & connect it w/ the type of response we expect back.
// 3.) we store our data in a final variable
// 4.) then we retrieve our data.

let getData = async () => {
    const response = await fetch('./zoneTemps.csv'); // 1.
    const data = await response.text(); // 2. & 3.
    // console.log(data); // 4.

    const rows = data.split('\n').slice(1);
    rows.forEach(el => {
      const row = el.split(',')
      const year = row[0];
      const temp = row[1];
      console.log(year, temp);
    })
    // console.log(rows);
}
// getData()

////////////////////////////////////////////////////////////////////////////////
// TRACK THE ISS SPACE STATION
// Make a map & tiles
const myMap = L.map('mapid').setView([0, 0], 2);
const attribution =
'&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributers';
const tile_url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tile_url, { attribution });
tiles.addTo(myMap);

// Set an Icon as the map marker
const issIcon = L.icon({
    iconUrl: 'ISS200.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});
const marker = L.marker([0, 0], {icon: issIcon}).addTo(myMap);

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'

let trackStation = async () => {
  const resp = await fetch(api_url);
  const data = await resp.json();
  const { latitude, longitude } = data;
  marker.setLatLng([latitude, longitude])
  document.getElementById('lat').textContent = latitude;
  document.getElementById('lon').textContent = longitude;
}

// trackStation()

var intervalID = window.setInterval(trackStation, 5000);
