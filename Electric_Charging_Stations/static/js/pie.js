var url = ("https://api.openchargemap.io/v3/poi/?output=json&latitude=43.6532&longitude=-79.3832&distance=500&distanceunit=KM&countrycode=CA&maxresults=1000&opendata=true&client=Ontario");

d3.json(url).then(function(response) {
    var lvl1 = 0;
    var lvl2 = 0;
    var lvl3 = 0;
    console.log(lvl2)
    response.forEach(function(location){
        var lis = location.Connections
        for (i=0; i<lis.length; i++) {
            var num = lis[i].LevelID;
    
            if (num == 1) {
                lvl1 += 1;
            }
            else if (num == 2) {
                lvl2 += 1;
            }
            else if (num == 3) {
                lvl3 += 1;
            }
        }
    })

    var data = [{
        values: [lvl1, lvl2, lvl3],
        labels: ['Level 1: Under 2KW', 'Level 2: Over 2KW', 'Level 3: Over 40KW'],
        type: 'pie',
        textinfo: "label+percent",
        insidetextorientation : "raidal",
        showlegend : false,
        sort : false
      }];
      
      var layout = {
        title : "Percentage of Each Charging Level",
        height: 500,
        width : 500
      };
      
      Plotly.newPlot("pie",data, layout); 
})

