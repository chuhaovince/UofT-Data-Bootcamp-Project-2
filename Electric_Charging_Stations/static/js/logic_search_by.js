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
//var url = "mongodb://heroku_kmpx4htl:388nghofnub05u3dgf17qgf8lb@ds045588.mlab.com:45588/heroku_kmpx4htl?retryWrites=false"
console.log(url)

const markers = L.markerClusterGroup({maxClusterRadius: 30});
// Grab the data with d3
d3.json(url,function(response) {  
    
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i].AddressInfo;

    // Check for location property
    
    if (
    response[i].Connections.length > 0
    && response[i].Connections[0].ConnectionType.Title
    && response[i].AddressInfo
    && response[i].Connections[0].Level
    && response[i].Connections[0].Level.Title
    && response[i].Connections[0].Level.Title=="Level 1 : Low (Under 2kW)") {
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.Latitude, location.Longitude])
        .bindPopup("<h3>"+response[i].AddressInfo.Title+"</h3><hr><p>"+"ConnectionType: "+ response[i].Connections[0].ConnectionType.Title + "</p> <p> Power Level: " + response[i].Connections[0].Level.Title + "</p>"));
        console.log("Complete!")
    
      }
 
  }
  myMap.addLayer(markers)});
// Add our marker cluster layer to the map

d3.selectAll("#selDataset").on("change", getData);

// d3.selectAll("#searchNearby").on("submit", dosomething);

// function dosomething () {}; 

function getData () {
  d3.json(url,function(response) {
  markers.clearLayers();
  
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  console.log(dataset)
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
    && response[i].Connections[0].Level.Title
    && response[i].Connections[0].Level.Title==dataset) {
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.Latitude, location.Longitude])
        .bindPopup("<h3>"+response[i].AddressInfo.Title+"</h3><hr><p>"+"ConnectionType: "+ response[i].Connections[0].ConnectionType.Title + "</p> <p> Power Level: " + response[i].Connections[0].Level.Title + "</p>"));
    }

  }
// Add our marker cluster layer to the map
myMap.addLayer(markers);

})};








//Seach Nearby Button Handler
function handleSearchNearBy() {

  d3.event.preventDefault();
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    console.log(navigator.geolocation.getCurrentPosition(showPosition))
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}


function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    current_location=[lat,lng]
    
    console.log(current_location);
  buildMap(current_location)
  };



// var greenIcon = L.icon({
//     iconUrl: 'leaf-green.png',
//     iconSize: [38, 95],
//     iconAnchor: [22, 94],
//     popupAnchor: [-3, -76],
//     shadowUrl: 'leaf-shadow.png',
//     shadowSize: [68, 95],
//     shadowAnchor: [22, 94]
// });

function buildMap(current_location) {

// Create a new marker
// Pass in some initial options, and then add it to the map using the addTo method
var Mymarker = L.marker(current_location).addTo(myMap);
// Binding a pop-up to our marker
Mymarker.bindPopup("Hello You Are Here!");
};

d3.select("#submit").on("click", handleSearchNearBy);