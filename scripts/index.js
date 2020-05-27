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

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'

let trackStation = async () => {
  const resp = await fetch(api_url);
  const data = await resp.json();
  const { latitude, longitude } = data;
  document.getElementById('lat').textContent = latitude;
  document.getElementById('lon').textContent = longitude;
}
// trackStation()

var intervalID = window.setInterval(trackStation, 5000);
