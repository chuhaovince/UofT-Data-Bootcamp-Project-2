var url = "/api/types";

// Create an empty array to store different connector types
// var connectorType = [];

d3.json(url).then(function(response) {
    var connectorType =[];
    response.forEach(function(type) {
        connectorType.push(type);
    })
    console.log(connectorType);
    // push unique type into the array
    // response.forEach(function(location) {
    //     var lis = location.Connections;
    //     for (i=0;i<lis.length;i++) {
    //         var type = lis[i].ConnectionType.Title;
    //         if (type in connectorType) {
    //             continue
    //         }
    //         else {
    //             cconnectorType.push(type)
    //         }
    //     };

    // });

    // exclude the unknown type from the connector array
    for( var i = 0; i < connectorType.length; i++){ 
        if ( connectorType[i] === "Unknown") {
          connectorType.splice(i, 1); 
        }
    };

    // Add all the types into html so it can show in the dropdown list
    for (i=0; i<connectorType.length; i++) {
        d3.select("#selTypes").append("option").attr("value",connectorType[i]).text(connectorType[i]);
        console.log(d3.select("option").attr("value"));
    };

    // Do the same: add 1 2, 3 level into html dropdown list
    for (i=1; i<4; i++) {
        d3.select("#selLevels").append("option").attr("value",i).text(`Level ${i}`);
        console.log(d3.select("option").attr("value"));
    };

})