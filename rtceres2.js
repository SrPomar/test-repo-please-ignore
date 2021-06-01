var map = L.map('mapa', { //inicializamos el mapa
    crs: L.CRS.Simple,
    minZoom: -1.7,
    attributionControl: false,
    zoomSnap: 0.3,

})

// establecemos la imagen y los bounds
var bounds = [[0,0], [1080, 1080]];
var image = L.imageOverlay(lienzo, bounds).addTo(map);
map.fitBounds(bounds);

overlays = crearOverlays(sort(lugares));

L.control.layers(null,overlays).addTo(map);

