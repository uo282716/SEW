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

      if(type != "kml"){
        alert("Introduzca un archivo KML")
      } else{
        let reader = new FileReader();

        reader.onload = function (evento) {

          $('coordinates',reader.result).each(function(){
            let coor = $(this).text();
            let co = coor.split(", ");

            let pos = {lat: Number(co[1]), lng: Number(co[0])}
            var marcador = new google.maps.Marker({position:pos,map:map});

          });

        }      
          reader.readAsText(archivo);
        
      }
    }

    // var totalNodos            = $('*',datos).length; // cuenta los elementos de XML: son los nodos del árbol DOM de XML
    //                 var ciudad                = $('city',datos).attr("name");
    //                 var longitud              = $('coord',datos).attr("lon");
    //                 var latitud               = $('coord',datos).attr("lat");
    //                 var pais                  = $('country',datos).text();
    //                 var amanecer              = $('sun',datos).attr("rise");
}
var miMapa = new Mapa();