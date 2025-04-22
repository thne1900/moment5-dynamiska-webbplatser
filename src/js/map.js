/*Javascript-map*/

"use strict";
/**
 * @type {L.map} Infogar en karta med variabeln: map, med utgångspunkt i Stockholm, Sverige och koordinater och inzoomningsgrad. 
 */
let map = L.map("map").setView([59.32512, 18.07109], 5);

/**
 * @type {L.tileLayer} Lägger på ett tileLayer från OpenStreetmap med en maxzoom. 
 */
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/**
 * @type {L.marker} Skapat en variabel för att markera på kartan.
 */
let marker;

/**
 * @type {HTMLElement} Vid klick (händelsehanterare) på knappen anropas funktionen (searchCity).
 */
document.getElementById("button-search").addEventListener("click", searchCity);

/**
 * @async visar att en asynkron funktion används.
 * @function searchCity Vid inmatning i inputfältet ska den sökta staden visas på kartan med en markering. 
 * @throws {Error} Om det uppstår fel vid den inhämtade datan, blir det felmeddelanden.
 * @example Då en besökare klickar på knappen SÖK STAD ("button-search"), kommer funktionen searchCity att anropas,
  som kommer visa den sökta staden på kartan med dess koordinater.
 */
async function searchCity() {

    let city = document.getElementById("search").value;
    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${city}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Det blev ett fel vid inhämtningen");
        }

        const data = await
            response.json();

        if (data.length > 0) {
            let lati = data[0].lat;
            let long = data[0].lon;

            map.setView([lati, long], 13);

            if (marker) {
                marker.setLatLng([lati, long]);

            } else {
                marker = L.marker([lati, long]).addTo(map);
            }

            marker.bindPopup(`Här är ${city}! (Lat: ${lati} och Lon: ${long})`).openPopup();
        } else {
            alert("Din sökning av önskad stad kunde inte hittas, prova med en annan!")
        }

    } catch (error) {
        console.error("Ett fel uppstod", error);

    }
}


