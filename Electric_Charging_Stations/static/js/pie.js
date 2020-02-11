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
        labels: ['Level_1', 'Level_2', 'Level_3'],
        type: 'pie'
      }];
      
      var layout = {
        height: 400,
        width: 500
      };
      
      Plotly.newPlot(pie,data, layout); 
})

