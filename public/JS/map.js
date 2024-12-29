const mapApiKey = "ef5f1edeaa754c1e85e086a12778b01c";
// const mapApiKey =  process.env.GEOCODING_API_KEY;

let map_location = document.querySelector(".mapLocation");
let map_country = document.querySelector(".mapCountry");
let map_address = map_location.textContent;
console.log(map_location.textContent);

function initializeMap() {
    const locationText = map_address;
    const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(locationText)}&key=${mapApiKey}`;

    fetch(geocodeUrl)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        updateMap(lat, lng);
      } else {
        console.error('Location not found');
      }
    })
    .catch(error => console.error('Error fetching geocode data:', error));

    function updateMap(lat, lng) {
        const map = L.map('map').setView([lat, lng], 13); // Adjust zoom level as needed
        var osm =L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        })
        osm.addTo(map);
        
        let marker = L.marker([lat, lng]);
        marker.addTo(map)
        .bindPopup(`Location: ${locationText}`)
        .openPopup();
        
    }
}
// Initialize the map once the document is ready
document.addEventListener('DOMContentLoaded', initializeMap);
