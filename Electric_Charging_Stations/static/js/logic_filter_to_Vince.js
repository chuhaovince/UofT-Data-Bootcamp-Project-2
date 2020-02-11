d3.selectAll("#button").on("click", getLocation())
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

// // Assemble API query URL
// var url = "/api/filter";
// console.log(url)
// ​
// // Grab the data with d3
// d3.json(url, function(response) {
// ​
//   // Create a new marker cluster group
//   var markers = L.markerClusterGroup({
//     maxClusterRadius: 30});
// ​
//   // Clear previous marker layer
//   markers.clearLayers();
// ​
//   // Loop through data
  
//   for (var i = 0; i < response.length; i++) {
// ​
//     // Set the data location property to a variable
//     var location = response[i];
// ​
//     // Add a new marker to the cluster group and bind a pop-up
//     markers.addLayer(L.marker([location.AddressInfo.Latitude, location.AddressInfo.Longitude])
//       .bindPopup("<h3>"+response[i].AddressInfo.Title+"</h3><hr><p>"+"ConnectionType: "+ response[i].Connections[0].ConnectionType.Title + "</p> <p> Power Level: " + response[i].Connections[0].Level.Title + "</p>"));
// ​
//   }
// ​
// ​
// // Add our marker cluster layer to the map
// myMap.addLayer(markers);
// ​
// ​
// });


// Assemble API query URL
var url = "/api/filter";
//var url = "mongodb://heroku_kmpx4htl:388nghofnub05u3dgf17qgf8lb@ds045588.mlab.com:45588/heroku_kmpx4htl?retryWrites=false"
console.log(url)
const markers = L.markerClusterGroup({maxClusterRadius: 30});
// Grab the data with d3
d3.json(url,function(response) {  
    
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i].AddressInfo;

    // Check for location property
    
    // if (
    // response[i].Connections.length > 0
    // && response[i].Connections[0].ConnectionType.Title
    // && response[i].AddressInfo
    // && response[i].Connections[0].Level
    // && response[i].Connections[0].Level.Title
    // && response[i].Connections[0].Level.Title=="Level 1 : Low (Under 2kW)") {
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.Latitude, location.Longitude])
        .bindPopup("<h3>"+response[i].AddressInfo.Title+"</h3><hr><p>"+"ConnectionType: "+ response[i].Connections[0].ConnectionType.Title + "</p> <p> Power Level: " + response[i].Connections[0].Level.Title + "</p>"));
        console.log("Complete!")
    
      }
 
  
  myMap.addLayer(markers)});
// Add our marker cluster layer to the map

 


d3.selectAll("#selDataset").on("change", getData);
// d3.selectAll("#searchNearby").on("submit", dosomething);

// function dosomething () {}; 

function getData () {
  d3.json(url,function(response) {

  //const markers = L.markerClusterGroup({maxClusterRadius: 30});
  
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
    
    // if (
    // response[i].Connections.length > 0
    // && response[i].Connections[0].ConnectionType.Title
    // && response[i].AddressInfo
    // && response[i].Connections[0].Level
    // && response[i].Connections[0].Level.Title
    // && response[i].Connections[0].Level.Title==dataset) {
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.Latitude, location.Longitude])
        .bindPopup("<h3>"+response[i].AddressInfo.Title+"</h3><hr><p>"+"ConnectionType: "+ response[i].Connections[0].ConnectionType.Title + "</p> <p> Power Level: " + response[i].Connections[0].Level.Title + "</p>"));
    

  }
// Add our marker cluster layer to the map
myMap.addLayer(markers);

})};





