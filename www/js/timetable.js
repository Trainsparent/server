function populateTable() {
    var r = new XMLHttpRequest();
    r.open("GET", "http://darwin.hacktrain.com/api/train/EUS/from/BHM?apiKey=2eddeea6-ec45-408b-99cb-8ef5b1d3d6cb&rows=10", true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200) return;
        var resp = JSON.parse(r.response);
        var timetable = document.getElementById("timetable");

        for (var i = 0; i < resp.length; i++) {
            var div = document.createElement("div");
            div.className = "bs-callout bs-callout-success";
            div.id = "callout-navbar-mobile-caveats";
            
            var header = document.createElement("h4");
            header.innerText = resp[i].origins[0].stationName + " to "+resp[i].destinations[0].stationName;
            var para = document.createElement("p");
            para.innerText = resp[i].scheduledArrivalTime;
            div.appendChild(header);
            div.appendChild(para);
            timetable.appendChild(div);

        }
    };
    r.send();
}