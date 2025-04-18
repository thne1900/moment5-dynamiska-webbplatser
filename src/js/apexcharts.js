/*Javascript ApexCharts*/
"use strict";

//Data från extern url med Fetch-api med async/await.
let data=[];

window.onload=()=>{
    fetchData();
}

async function fetchData() {

    try {
        const response=await fetch('https://studenter.miun.se/~mallar/dt211g/');
        if(!response.ok){
            throw new Error("Fel vid inhämtningen av datan");
        }

        data = await response.json();
        displayData(data);
        displayDataAgain(data);
        

    }catch (error) {
        console.error("Ett fel uppstod", error);
        throw error;
    }
    console.table(data);
}
 function displayData(data) {

    let filteredCourses=data.filter((item)=>item.type==="Kurs");
    console.log(filteredCourses);

    let topCourses=filteredCourses.sort((a, b)=>b.applicantsTotal-a.applicantsTotal).slice(0,6);
    console.table(topCourses);

    let outputCourses=topCourses.map(item=>item.name);
    let totalApplicants=topCourses.map(item=>item.applicantsTotal);

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
                fontSize:"14px",
                color: "white",
            }
        }
    };
    let chart= new ApexCharts (document.querySelector("#chart"), options);
    chart.render();
   
}
function displayDataAgain(data) {

    let filteredProgram=data.filter((item)=>item.type==="Program");
    console.log(filteredProgram);

    let topProgram=filteredProgram.sort((a, b)=>b.applicantsTotal-a.applicantsTotal).slice(0,5);
    console.table(topProgram);

    let outputProgram=topProgram.map(item=>item.name);
    let tApplicants=topProgram.map(item=>parseInt(item.applicantsTotal,10));
    console.log(tApplicants);

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
                fontSize:"14px",
                color: "white",
            }
        }
    }

    let chart1= new ApexCharts (document.querySelector("#chart1"), options);
    chart1.render();
   
}


