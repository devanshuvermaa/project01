const map = L.map('map').setView([28.6139, 77.2090], 13); // Default: Delhi

L.tileLayer(`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=qqimZ9fHuuL0m2mu453G`, {
    tileSize: 512,
    zoomOffset: -1,
    attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
}).addTo(map);

L.marker([28.6139, 77.2090]).addTo(map)
    .bindPopup('This is your listing location')
    .openPopup();
    map.setView([28.6139, 77.2090], 13);

// console.log(coordinates);
window.addMarker=(lat,lng)=>{
L.marker([lat, lng]).addTo(map)
    .bindPopup('This is your listing location')
    .openPopup();
    map.setView([lat, lng], 13);
}
