// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center at the San Francisco airport.
// let map = L.map('mapid').setView([37.5, -122.5], 10);

// Create the map object with center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

// Add GeoJSON data.
// let sanFranAirport =
// {
//     "type": "FeatureCollection", "features": [{
//         "type": "Feature",
//         "properties": {
//             "id": "3469",
//             "name": "San Francisco International Airport",
//             "city": "San Francisco",
//             "country": "United States",
//             "faa": "SFO",
//             "icao": "KSFO",
//             "alt": "13",
//             "tz-offset": "-8",
//             "dst": "A",
//             "tz": "America/Los_Angeles"
//         },
//         "geometry": {
//             "type": "Point",
//             "coordinates": [-122.375, 37.61899948120117]
//         }
//     }
//     ]
// };

// Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function (feature, latlng) {
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country + "</h3");
//     }

// }).addTo(map);

// Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     onEachFeature: function (feature, layer) {
//         console.log(layer);
//         layer.bindPopup("<h3>Airport Code: " + feature.properties.faa + "</h3> <hr> <h3>Airport Name: " + feature.properties.name + "</h3");
//     }

// }).addTo(map);

// Accessing the airport GeoJSON URL
// let airportData = "https://raw.githubusercontent.com/tkirk70/Mapping_Earthquakes/Mapping_GeoJSON_Points/majorAirports.json";


// L.circleMarker(city.location, { radius: (city.population / 100000), color: 'orange', lineweight: 4 })
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population: " + city.population.toLocaleString() + "</h3>")
//     .addTo(map);
// Create the map object with a center and zoom level.  Later in module for adding multiple layers. 
// let map = L.map("mapid", {
//     center: [
//         40.7, -94.5
//     ],
//     zoom: 4
// });

// We create the tile layer that will be the background of our map.
// To change the map's style, change the map id using the list of Mapbox ids below:

// mapbox / streets - v11
// mapbox / outdoors - v11
// mapbox / light - v10
// mapbox / dark - v10
// mapbox / satellite - v9
// mapbox / satellite - streets - v11
// mapbox / navigation-night-v1
// We create the tile layer that will be the background of our map.


// Streets Map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
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

let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Night: night,
    Light: light,
    Satellite: satellite
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// Accessing data from GitHub account.
// let airportData = "https://raw.githubusercontent.com/tkirk70/Mapping_Earthquakes/Mapping_GeoJSON_Points/majorAirports.json";
// let torontoData = "https://raw.githubusercontent.com/tkirk70/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/Mapping_GeoJSON_Linestrings/torontoRoutes.json";
// let torontoNeighborhoods = "https://raw.githubusercontent.com/tkirk70/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";

// Grabbing our GeoJSON data.
// d3.json(airportData).then(function (data) {
//     console.log(data);
//     // Creating a GeoJSON layer with the retrieved data.
//     L.geoJSON(data, {
//         onEachFeature: function (feature, layer) {
//             console.log(layer);
//             layer.bindPopup("<h3>Airport Code: " + feature.properties.faa + "</h3> <hr> <h3>Airport Name: " + feature.properties.name + "</h3");}
//         }).addTo(map);
// });

// var myStyle = {color: 'blue', weight: 1, fillColor: "yellow", fillOpacity: 0.4};

// Grabbing our GeoJSON data.
// d3.json(torontoData).then(function (data) {
//     console.log(data);
//     // Creating a GeoJSON layer with the retrieved data.
//     L.geoJSON(data, {style: myStyle,
//         onEachFeature: function (feature, layer) {
//             console.log(layer);
//             layer.bindPopup("<h3>Airline Code: " + feature.properties.airline + "</h3> <hr> <h3>Aiport Destination: " + feature.properties.dst + "</h3>");}
        
//     }).addTo(map);
// });

// The onEachFeature option is a function that gets called on each feature before adding it
// to a GeoJSON layer. A common reason to use this option is to
// attach a popup to features when they are clicked.

// d3.json(torontoNeighborhoods).then(function (data) {
//     console.log(data);
//     // Creating a GeoJSON layer with the retrieved data.
//     L.geoJSON(data, {
//         style: myStyle,
//         onEachFeature: function (feature, layer) {
//             console.log(layer);
//             layer.bindPopup("<h3>Neighborhood: " + feature.properties.AREA_NAME + "</h3> <hr> <h3>Area Code: " + feature.properties.AREA_S_CD + "</h3>");
//         }

//     }).addTo(map);
// });

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data).addTo(map);
});