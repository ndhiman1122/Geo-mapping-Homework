
// Creating the map object
var myMap = L.map("map", {
    center: [34.0413, -118.25],
    zoom: 8
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  // Assemble the API query URL.
  var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  // Get the data with d3.
  d3.json(queryUrl).then(function(data) {
      console.log(data)

  L.geoJson(data,{
      pointToLayer: function(feature,latLong) {
          return L.circleMarker(latLong)
      },
      onEachFeature: function(feature,layer) {
          layer.bindPopup("magnitude " + feature.properties.mag
                        + "<br> depth" + feature.geometry.coordinates[2]);
      }
  }).addTo(myMap)

   // Set Up Legend
   var legend = L.control({ position: "bottomright" });
   legend.onAdd = function() {
       var div = L.DomUtil.create("div", "info legend"), 
       magnitudeLevels = [0, 1, 2, 3, 4, 5];

       div.innerHTML += "<h3>Magnitude</h3>"

       for (var i = 0; i < magnitudeLevels.length; i++) {
           div.innerHTML +=
               '<i style="background: ' + chooseColor(magnitudeLevels[i] + 1) + '"></i> ' +
               magnitudeLevels[i] + (magnitudeLevels[i + 1] ? '&ndash;' + magnitudeLevels[i + 1] + '<br>' : '+');
       }
       return div;
   };
   // Add Legend to the Map
   legend.addTo(myMap);

});

