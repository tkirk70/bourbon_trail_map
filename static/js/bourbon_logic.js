
// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  tileSize: 512,
  zoomOffset: -1,
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
  center: [37.85, -85.5],
  zoom: 7.8,
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
  "Krogers": krogers,
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the earthquake GeoJSON data.
d3.json("https://raw.githubusercontent.com/tkirk70/bourbon_trail_map/main/Bourbon.geojson").then(function (data) {


  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
    style: function(feature) {
      return {color: 'red'}
    },
    // We create a popup for each circleMarker to display the magnitude and location of the earthquake
    //  after the marker has been created and styled.
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Comapny: " + feature.properties.Company + "<br>Location: " + feature.properties.Address + "<br>Nearest Kroger: " + feature.properties.Nearest_Kroger);
    }
  }).addTo(distilleries);

  // Then we add the earthquake layer to our map.
  distilleries.addTo(map);
});
  // 3. Retrieve the major earthquake GeoJSON data >4.5 mag for the week.
d3.json("https://raw.githubusercontent.com/tkirk70/bourbon_trail_map/main/kroger_list_latlong.geojson").then(function (data) {
    // 7. Creating a GeoJSON layer with the retrieved data that adds a circle to the map
    // sets the style of the circle, and displays the magnitude and location of the earthquake
    //  after the marker has been created and styled.
  L.geoJson(data, {
      // We turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
      // We create a popup for each circleMarker to display the magnitude and location of the earthquake
      //  after the marker has been created and styled.
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Kroger: " + "<br>Address:" + feature.properties.Nearest_Kroger + "<br>City: " + feature.properties.City + "<br>Zip: " + feature.properties.Zip);
    }
  }).addTo(krogers);

    // Then we add the earthquake layer to our map.
  krogers.addTo(map);
});
