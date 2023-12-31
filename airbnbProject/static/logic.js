function createMap(airbnbStays) {

    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
  
    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
      "Street Map": streetmap
    };
  
    // Create an overlayMaps object to hold the bikeStations layer.
    let overlayMaps = {
      "Airbnb Stays": airbnbStays
    };
  
    // Create the map object with options.
    let map = L.map("map-id", {
      center: [40.7282, -73.7949],
      zoom: 12,
      layers: [streetmap, airbnbStays]
    });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: true
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "stations" property from response.data.
    let airbnbs = response;
  
    // Initialize an array to hold bike markers.
    let staysMarkers = [];
  
    // Loop through the stations array.
    for (let index = 0; index < airbnbs.length; index++) {
      let airbnb = airbnbs[index];
  
      // For each station, create a marker, and bind a popup with the station's name.
      let staysMarker = L.marker([airbnb.latitude, airbnb.longitude])
        .bindPopup("<h3>" + airbnb.name + "<h3><h3>Price: $" + airbnb.price + " USD</h3><h3>Minimum nights: " + airbnb.minimum_nights + "</h3>");
  
      // Add the marker to the bikeMarkers array.
      staysMarkers.push(staysMarker);
    }
  
    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    createMap(L.layerGroup(staysMarkers));
  }
  
  
  // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
  d3.json("http://127.0.0.1:5000/map-api").then(createMarkers);

