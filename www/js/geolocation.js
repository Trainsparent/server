function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}
function showPosition(position) {
    $.get("https://data.gov.uk/data/api/service/transport/naptan_railway_stations/nearest?lat="+position.coords.latitude+"&lon="+position.coords.longitude
    ,function(data, status){
        var dropdown = document.getElementById("nearestStation");
        for (i = 0; i < data.result.length; i++) { 
            opt = document.createElement("option");
            opt.value = data.result[i].crscode;
            opt.textContent = data.result[i].stationname;
            dropdown.appendChild(opt);
        }
    });
    
}