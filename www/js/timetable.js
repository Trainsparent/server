function populateTable(){
    populateTableImpl("https://huxley.apphb.com/all/big/from/vic/10?accessToken=2eddeea6-ec45-408b-99cb-8ef5b1d3d6cb");
    populateTableImpl("https://huxley.apphb.com/all/vic/from/big/10?accessToken=2eddeea6-ec45-408b-99cb-8ef5b1d3d6cb");
}

function populateTableImpl(url) {
    var r = new XMLHttpRequest();
    r.open("GET", url, true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200) return;
        var resp = JSON.parse(r.response).trainServices;
        var timetable = document.getElementById("timetable");

        for (var i = 0; i < resp.length; i++) {
            var div = document.createElement("div");
            div.className = "bs-callout bs-callout-success";
            div.id = "callout-navbar-mobile-caveats";

            var header = document.createElement("h4");
            header.innerText = resp[i].origin[0].locationName + " to " + resp[i].destination[0].locationName;
            var para = document.createElement("p");
            para.innerText = "Scheduled arrival time: "+resp[i].sta + " Estimated arrival time: "+resp[i].eta;
            if (!(resp[i].sta===resp[i].eta)&&(!(resp[i].eta==="On time"))){
                div.className = "bs-callout bs-callout-warning";
            }
            var graphContainer = document.createElement("div");

            var graph = document.createElement("canvas");
            graphContainer.style.width = "200px";
            graphContainer.style.height = "100px";
            div.appendChild(header);
            div.appendChild(para);
            graphContainer.appendChild(graph);
            para.appendChild(graphContainer);

            timetable.appendChild(div);
            var myChart = new Chart(graph, {
                type: 'line',
                data: {
                    labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],
                    datasets: [{
                        label: 'Minutes Delayed',
                        data: [0,5,9,12,14,15,14,13,12,11.5,9,7,5,2.5,0],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    };
    r.send();
}