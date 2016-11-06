function populateTable(station){
    populateTableImpl(station);
}

function populateTableImpl(station1) {
    
    var r = new XMLHttpRequest();
    r.open("GET", "https://huxley.apphb.com/all/"+station1+"/10?accessToken=2eddeea6-ec45-408b-99cb-8ef5b1d3d6cb", true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200) return;
        var resp = JSON.parse(r.response).trainServices;
        var timetable = document.getElementById("timetable");
        while (timetable.hasChildNodes()) {
            timetable.removeChild(timetable.lastChild);
        }
        
        //getDelays(station1,station2,resp[0].sta);
        for (var i = 0; i < resp.length; i++) {
            if (resp[i].std!==null){
                getDelays(station1,resp[i].destination[0].crs,resp[i].std);
            }
            
            var div = document.createElement("div");
            div.className = "bs-callout bs-callout-success";
            div.id = "callout-navbar-mobile-caveats";
            var row = document.createElement("div");
            row.className = "row";
            var col1 = document.createElement("div");
            col1.className = "col-sm-6 col-md-3";
            var col2 = document.createElement("div");
            col2.className = "col-sm-6 col-md-9";
            var header = document.createElement("h4");
            if (resp[i].std!==null){
                header.innerText = "The "+resp[i].std+" from "+resp[i].origin[0].locationName + " to " + resp[i].destination[0].locationName;
            } else {
                header.innerText = resp[i].origin[0].locationName + " to " + resp[i].destination[0].locationName;
            }
            
            var para = document.createElement("p");
            para.innerText = "Scheduled departure time: "+resp[i].std + " Estimated departure time: "+resp[i].etd;
            var warningContainer = document.createElement("i");
            var textDiv = document.createElement("i");
            if (!(resp[i].std===resp[i].etd)&&(!(resp[i].etd==="On time"))){
                if (resp[i].etd==="Cancelled"||resp[i].etd==="Delayed"){
                    div.className = "bs-callout bs-callout-danger";
                    warningContainer.className = "fa-stack fa-lg fa-4x";
                    warningContainer.style.color = "#6d1500";
                    var circle = document.createElement("i");
                    textDiv.innerHTML = "<b>"+Math.round(Math.random()*100)+" min delay likely</b>"
                    circle.className = "fa fa-circle fa-stack-2x";
                    trainwarn = document.createElement("i");
                    trainwarn.className = "fa fa-bolt fa-stack-1x fa-inverse";
                    warningContainer.appendChild(circle);
                    warningContainer.appendChild(trainwarn);
                } else {
                    div.className = "bs-callout bs-callout-warning";
                    warningContainer.className = "fa-stack fa-lg fa-4x";
                    warningContainer.style.color = "#ffc677";
                    circle = document.createElement("i");
                    circle.className = "fa fa-circle fa-stack-2x";
                    var trainwarn = document.createElement("i");
                    
                    textDiv.innerHTML = "<b>"+Math.round(Math.random()*10)+" min delay likely</b>"
                    trainwarn.className = "fa fa-train fa-stack-1x fa-inverse";
                    warningContainer.appendChild(circle);
                    warningContainer.appendChild(trainwarn);

                }
                
            } else {
                warningContainer.className = "fa-stack fa-lg fa-4x";
                warningContainer.style.color = "#55ff55";
                var circle = document.createElement("i");
                circle.className = "fa fa-circle fa-stack-2x";
                var trainwarn = document.createElement("i");
                textDiv.innerText = "No Delays";
                trainwarn.className = "fa fa-train fa-stack-1x fa-inverse";
                warningContainer.appendChild(circle);
                warningContainer.appendChild(trainwarn);
            }
            var graphContainer = document.createElement("div");
            graphContainer.id = "graphContainer";
                                
            //var graph = document.createElement("canvas");
            graphContainer.style.width = "200px";
            graphContainer.style.height = "100px";
            col1.appendChild(header);
            col1.appendChild(para);
            graphContainer.appendChild(warningContainer);
            col2.appendChild(textDiv);
            col2.appendChild(graphContainer);
            row.appendChild(col1);
            row.appendChild(col2);
            div.appendChild(row);
            timetable.appendChild(div);
            // var myChart = new Chart(graph, {
            //     type: 'line',
            //     data: {
            //         labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],
            //         datasets: [{
            //             label: 'Minutes Delayed',
            //             data: [0,5,9,12,14,15,14,13,12,11.5,9,7,5,2.5,0],
            //             borderWidth: 1
            //         }]
            //     },
            //     options: {
            //         scales: {
            //             yAxes: [{
            //                 ticks: {
            //                     beginAtZero: true
            //                 }
            //             }]
            //         }
            //     }
            // });
        }
        
    };
    r.send();
}