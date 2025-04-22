"use strict";

let map = L.map('map').setView([59.32512, 18.07109], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom:19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker;
document.getElementById("button-search").addEventListener("click", searchCity);

function searchCity(){

        let city=document.getElementById("search").value;
        let url=`https://nominatim.openstreetmap.org/search?format=json&q=${city}`;
    
        fetch(url)
        .then(response=>{
            if(!response.ok){
                throw new Error("Det blev fel vid inhämtningen");
            }
            return response.json();
        })
        .then(data=>{
            if(data.length>0){
                let lat=data[0].lat;
                let lon=data[0].lon;
    
                map.setView([lat, lon], 13);
    
                if (marker){
                    marker.setLatLng([lat, lon]);
                    }else{
                        marker=L.marker([lat, lon]).addTo(map);
                    }

                    marker.bindPopup(`Här är ${city}! (Lat: ${lat} och Lon: ${lon})`).openPopup();
                }else {
                    alert("Din sökning av önskad stad kunde inte hittas, prova med en annan!")

                }
            })
            .catch(error=>{
                console.error("Ett fel uppstod", error);

            }
        )};
