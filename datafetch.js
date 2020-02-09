dataURL = "https://api.openchargemap.io/v3/poi/?output=json&latitude=43.6532&longitude=-79.3832&distance=500&distanceunit=KM&countrycode=CA&maxresults=1000&opendata=true&client=Ontario%20charging%20stations&key=f6e470b3-c2f2-4c69-a477-3dbac08fea4b";

connectionType = [];

d3.json(dataURL).then(function(data) {
        data.forEach(function(station) {
            mongo.insert({
                "StationName" : station.OpeartorInfo.Title,
                "Address" : station.AddressInfo.AddressLine1,
                "City" : station.AddressInfo.Town,
                "POcode" : station.AddressInfo.Postcode,
                "State" : station.AddressInfo.StateOrProvince,
                "Country" : station.AddressInfo.Country.Title,
                "lat" : station.AddressInfo.Latitude,
                "lng" : station.AddressInfo.Longitude,
                "Website" : station.OpeartorInfo.WebsiteURL,
                "Phone" : station.AddressInfo.ContactTelephone1,
                "TypeName" : station.Connections.forEach(function(type) {
                    
                })
                function(type) {
                    connectionType.push(station.Connections)
                }
            })
        })
})