"use strict";
class Mapa {
    constructor(){
        
    }
    initMap (){
        $("p:last-child").after("<article></article>");
        let pos = {lat: 43.3672702, lng: -5.8502461};
        this.map = new google.maps.Map(document.querySelector('article'),{zoom: 8,center:pos});
    }

    cargarGeoJSON(files){
      this.initMap();
      let archivo = files[0];

      let array = archivo.name.split(".");
      let type = array[array.length - 1];
      var map = this.map;

      if(type != "geojson"){
        alert("Introduzca un archivo GEOJSON")
      } else{
        let reader = new FileReader();

        reader.onload = function(event){
          map.data.addGeoJson(JSON.parse(reader.result));
        }
        reader.readAsText(archivo);
      }
    }
}
var miMapa = new Mapa();