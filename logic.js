// Creating map object
var myMap = L.map("map", {
  center: [43.6532, -79.3832],
  zoom: 7
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);


// Assemble API query URL
var url = "https://api.openchargemap.io/v3/poi/?output=json&latitude=43.6532&longitude=-79.3832&distance=1000&distanceunit=KM&countrycode=CA&maxresults=1000&opendata=true&client=Ontario%20charging%20stations&key=f6e470b3-c2f2-4c69-a477-3dbac08fea4b";
console.log(url)

// Grab the data with d3
d3.json(url, function(response) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup({
    maxClusterRadius: 30});

  // Loop through data
  
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i].AddressInfo;

    // Check for location property
    if (
    response[i].Connections.length > 0
    && response[i].Connections[0].ConnectionType.Title
    && response[i].AddressInfo
    && response[i].Connections[0].Level
    && response[i].Connections[0].Level.Title) {
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.Latitude, location.Longitude])
        .bindPopup("<h3>"+response[i].AddressInfo.Title+"</h3><hr><p>"+"ConnectionType: "+ response[i].Connections[0].ConnectionType.Title + "</p> <p> Power Level: " + response[i].Connections[0].Level.Title + "</p>"));
    }

  }


// Add our marker cluster layer to the map
myMap.addLayer(markers);


});
