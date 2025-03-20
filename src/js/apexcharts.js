/*Javascript ApexCharts*/
"use strict";

    let options= {
        chart: {
            type:"bar"
        },
        series:[{
            name:"Totalt sökantal",
            data: [1,2,3,4,5,6]
        }],
        xaxis: {
            categories:[1,2,3,4,5,6]
        },
        title: {
            text:"De 6 mest sökta kurserna på Mittuniversitetet HT24",
            align: "center",
            style: {
                fontSize:"16px",
                color: "white",
            }
        }
    }
    let chart= new ApexCharts (document.querySelector("#chart"), options)
    chart.render()

