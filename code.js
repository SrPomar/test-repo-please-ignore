class Lugar {
    constructor(nombre, marcador, cat, color, coordenadas, imagen, descripcion) {
        this.nombre = nombre;
        this.marcador = marcador;
        this.cat = cat;
        this.color = color;
        this.coordenadas = coords(coordenadas);
        this.imagen = imagen;
        this.descripcion = descripcion;
    }
}

function coords (pixeles) {
    var i;
    var output = [];
    var ancho;
    var alto;
    var pareja;
    for (i = 0; i < pixeles.length; i++) {
        ancho = pixeles[i][0];
        alto = 3216 - pixeles[i][1];
        pareja = [alto, ancho];
        output.push(pareja);
    };
    return output;
}

function desplegable(Lugar) { //Convierte los atributos del Lugar en código html válido para insertar en el popup
    var output = "<img src="+Lugar.imagen+"><h3>"+Lugar.nombre+"</h3><p>"+Lugar.descripcion+"</p>"
    return output
}

function addMarker(Lugar) { // Crea marcadores cogiendo coordenadas
    if (Lugar.descripcion == "" && Lugar.nombre == "" && Lugar.imagen =="") { //Si no hay descriptores para el popup
        if ((typeof Lugar.marcador) === "object"){ //Comprueba que se le haya pasado un objeto para generar el icono 
            return L.marker(Lugar.coordenadas[0], {icon: Lugar.marcador}).addTo(map);
        }
        else { 
            return L.marker(Lugar.coordenadas[0]).addTo(map);
        }
    }
    else {
        if ((typeof Lugar.marcador) === "object") {
            return L.marker(Lugar.coordenadas[0], {icon: Lugar.marcador})/*.addTo(map)*/.bindPopup(desplegable(Lugar));
        }
        else {
            return L.marker(Lugar.coordenadas[0]).addTo(map).bindPopup(desplegable(Lugar))
        }
    }
};

function drawPoly(Lugar) { // Crea polígonos y polilíneas 
    var hue = Lugar.color;

    if (Lugar.marcador == "zona") {
        if (Lugar.descripcion == "" && Lugar.nombre == "" && Lugar.imagen =="") {
            return L.polygon(Lugar.coordenadas, {color: hue}).addTo(map);
        }
        else {
            return L.polygon(Lugar.coordenadas, {color: hue}).addTo(map).bindPopup(desplegable(Lugar));
        }
    }
    else if (Lugar.marcador == "ruta") {
        if (Lugar.descripcion == "" && Lugar.nombre == "" && Lugar.imagen =="") {
            return L.polyline(Lugar.coordenadas, {color: hue}).addTo(map);
        }
        else {
            return L.polyline(Lugar.coordenadas, {color: hue}).addTo(map).bindPopup(desplegable(Lugar));
        }
    }
}

function smartAdd(Lugar) { //determina si añadir distritos o marcadores
    if (Lugar.marcador === "zona" || Lugar.cat === "ruta") {
        return drawPoly(Lugar);
    }
    else {
        return addMarker(Lugar)
    }
}

function sort(lugares) { // Genera un objeto Overlays 
    var categorias = []; // aquí añadiremos todas las categorias definidas por el usuario

    for (i=0; i < lugares.length; i++) { //recorremos el array de lugares
        nuevo = true; //asumimos que la categoría es nueva
        posi = 0; // posición en el array en la que hemos encontrado la coincidencia

      while (nuevo == true) { 
        if (posi == categorias.length) { //si es el primer elemento o llegamos al final de la lista de categorías sin coincidencia
            categorias.push([lugares[i].cat]); // añadimos la categoría
            categorias[posi].push(smartAdd(lugares[i])) // y añadimos el objeto a la categoría
            nuevo = false; // deja de ser nuevo, volvemos al for.
        }
        else {
            if (categorias[posi][0] == lugares[i].cat) { // si encontramos la categoría
                categorias[posi].push(smartAdd(lugares[i])); // añadimos el lugar a su lista
                nuevo = false; // deja de ser nuevo, volvemos al for.
            }
            else { //finalmente, si no encontramos coincidencia
                  posi ++;
              }
          }
      }
    }
    return categorias;
}

function crearOverlays(categorias) {
    overlays = {};
    console.log (categorias.length)
    for (i=0; i < categorias.length; i++) {
       overlays[categorias[i].shift()] = L.layerGroup(categorias[i]);
    }

    return overlays
}
