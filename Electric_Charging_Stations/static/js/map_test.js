// plot the whole map view when page is loaded
// set the api as the entire database cuz we here are poltting all stations
var url = "/api/allocations";

var myMap = L.map("map", {
    center: [43.6532, -79.3832],
    zoom: 8
  });

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// define a marker cluster group
var markers = L.markerClusterGroup({maxClusterRadius: 30});

d3.json(url,function(response) {  

    for (var i = 0; i < response.length; i++) {

		// Set the data location property to a variable
		var location = response[i].AddressInfo;
		// Get the connections as an array at each location
		//var connections = response[i].Connections;
		console.log(location);
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
			.bindPopup("<h3>"+response[i].AddressInfo.Title+"</h3><hr><h2>"+response[i].AddressInfo.AddressLine1+"</h2><hr><p>"+"Connection Type: "+ connections.forEach(type=>type.ConnectionType.Title) + "</p><hr><p> Power Level: " + connections.forEach(lvl=>lvl.LevelID) + "</p>"));
		console.log("Complete!")
        
        //   }
     
      }
	  myMap.addLayer(markers);
	});
