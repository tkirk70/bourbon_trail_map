// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// Dark Map
// We create the dark view tile layer that will be an option for our map.
let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// Light Map
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [38, -84.5],
  zoom: 7,
  layers: [streets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Night": night,
  "Light": light
};

// 1. Add a 3rd layer group for the major earthquake data.
let distilleries = new L.LayerGroup();
let krogers = new L.LayerGroup();

// 2. Add a reference to the major earthquake group to the overlays object.
let overlays = {
  "Distilleries": distilleries,
  "Kroger Locations": krogers
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the earthquake GeoJSON data.
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {


d3.csv("df_37.csv", function(data) {
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].Company);
      console.log(data[i].Address);
      console.log(data[i].City);
      console.log(data[i].State);
      console.log(data[i].Zip);
      console.log(data[i].Nearest_Kroger);
    }
});
  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }



  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // We create a popup for each circleMarker to display the magnitude and location of the earthquake
    //  after the marker has been created and styled.
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Company: " + feature.properties.mag + "<br>Location: " + feature.properties.place + "<br>Nearest Kroger: " + new Date(feature.properties.time).toString());
    }
  }).addTo(distilleries);

  // Then we add the earthquake layer to our map.
  distilleries.addTo(map);

  // 3. Retrieve the major earthquake GeoJSON data >4.5 mag for the week.
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

    // 4. Use the same style as the earthquake data.
    function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: #BF553E,
        color: "#000000",
        // radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      }
    };



    // 6. Use the function that determines the radius of the earthquake marker based on its magnitude.


    // 7. Creating a GeoJSON layer with the retrieved data that adds a circle to the map
    // sets the style of the circle, and displays the magnitude and location of the earthquake
    //  after the marker has been created and styled.
    L.geoJson(data, {
      filter: function (feature, layer) {
        return feature.properties.mag > 4.5;
      },
      pointToLayer: function (feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
      },

      style: styleInfo,

      onEachFeature: function (feature, layer) {
        layer.bindPopup("Company: " + data.Company + "<br>Location: " + data.Address + "<br>Nearest_Kroger: " + data.Nearest_Kroger);
      }

    }).addTo(majorEarthquakes);
    // 8. Add the major earthquakes layer to the map.
    krogers.addTo(map);
    console.log(krogers);
    // 9. Close the braces and parentheses for the major earthquake data.
  });



    // Looping through our intervals to generate a label with a colored square for each interval.




  var mapStyle = { color: '#F7342Bed', weight: 1.5}

  })
});
