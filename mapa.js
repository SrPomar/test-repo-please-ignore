var map = L.map('mapa', { //inicializamos el mapa
    crs: L.CRS.Simple,
    minZoom: -2,
    attributionControl: false,


})

// establecemos la imagen y los bounds
var bounds = [[0,0], [3216,5216]];
var image = L.imageOverlay("kernassum.png", bounds).addTo(map);
map.fitBounds(bounds);

//MARKERS
/*var plazaTemplo = L.latLng([1824, 1756]);
var PlazaTemplo = L.marker(plazaTemplo).addTo(map).bindPopup("<img src='imgs/testrig.png'><b>¡La plaza del templo!</b><br>Esta plaza está junto al templo.");

var juan = [100, 100];
//var test = marcador(juan);

var poligono = [[1500, 1500],[1500, 1750],[2000, 2000],[800, 1500]];
var rojo = "red"
var dstrect = distrito(poligono, rojo);
*/
var ejemplo = new Lugar ("Test","distrito","red",[[1500, 1500],[1500, 1750],[2000, 2000],[800, 1500]],"imgs/testrig.png", "descripción ejemplo")
poly(ejemplo);
marcador(ejemplo); 

//CONTROLES
/*var marcadores = L.layerGroup([PlazaTemplo, test]);
var distritos = L.layerGroup([dstrect]);
var overlays = {"Marcadores": marcadores, "Distritos": distritos};
L.control.layers(null,overlays).addTo(map);
*/
