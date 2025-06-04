/*Javascript ApexCharts*/
"use strict";

/**
 * En tom array som har som syfte att fyllas med data.
 * @type {Array} 
 */
let data=[];

/**
 * Körs vid sidinladdning
 * @function window.onload - Anropar(fetchData) som hämtar in data. 
 */
window.onload=()=>{
    fetchData();
}

/**
 * Ska inhämta data från en extern källa (url) och visa i diagram med asynkron funktion.
 * @async
 * @function fetchData - Gör anrop till url för att komma åt den innehållande datan.
 * @function displayDataTopSix - Anropas för att få ut denna funktionens efterfrågade data i ett stapeldiagram.
 * @function displayDataTopFive - Anropas för att få ut den funktionens begärda data i ett cirkeldiagram. 
 * @throws {Error} - Ger felmeddelande vid problem vid inhämtning av datan. 
 */
async function fetchData() {

    try {
        const response=await fetch('https://studenter.miun.se/~mallar/dt211g/');
        if(!response.ok){
            throw new Error("Fel vid inhämtningen av datan");
        }

        data = await response.json();
        displayDataTopSix(data);
        displayDataTopFive(data);
        

    }catch (error) {
        console.error("Ett fel uppstod", error);
        throw error;
    }
}

/**
 * Hanterar datan så att den kommer ut i ett stapeldiagram.
 * @function displayDataTopSix - Filtrerar och sorterar datan.
 * @param {Array} data - Inhämtad data som ska hanteras för att visas i ett stapeldiagrammet.
 */
 function displayDataTopSix(data) {

    let filteredCourses=data.filter((item)=>item.type==="Kurs");
    let topCourses=filteredCourses.sort((a, b)=>b.applicantsTotal-a.applicantsTotal).slice(0,6);

    let outputCourses=topCourses.map(item=>item.name);
    let totalApplicants=topCourses.map(item=>parseInt(item.applicantsTotal, 10));

    let options= {
        chart: {
            type:"bar"
        },
        series:[{
            name:"Totalt sökantal",
            data:totalApplicants
        }],
        xaxis: {
            categories:outputCourses
        },
        title: {
            text:"De 6 mest sökta kurserna på Mittuniversitetet HT24",
            align: "center",
            style: {
                fontSize:"18px",
                color: "white",
            }
        }
    };
    let chart= new ApexCharts (document.querySelector("#chart"), options);
    chart.render();
   
}

/**
 * Hantera datan så att den visas i ett cirkeldiagram. 
 * @function displayDataTopFive - Filtrerar och sorterar datan.
 * @param {Array} data - Inhämtad data som ska hanteras för att visas i ett cirkeldiagrammet.
 */
function displayDataTopFive(data) {

    let filteredProgram=data.filter((item)=>item.type==="Program");
    let topProgram=filteredProgram.sort((a, b)=>b.applicantsTotal-a.applicantsTotal).slice(0,5);

    let outputProgram=topProgram.map(item=>item.name);
    let tApplicants=topProgram.map(item=>parseInt(item.applicantsTotal,10));

    let options= {
        chart: {
            type:"pie",
        },
        series:tApplicants,
        labels:outputProgram,
        title: {
            text:"De 5 mest sökta programmen på Mittuniversitetet HT24",
            align: "center",
            style: {
                fontSize:"18px",
                color: "white",
            }
        }
    }

    let chart1= new ApexCharts (document.querySelector("#chart1"), options);
    chart1.render();
   
}


