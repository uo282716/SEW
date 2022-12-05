"use strict";
class Mapa {
  constructor(){
    this.latitud = 0;
    this.longitud = 0;
    this.altitud = 0;
    this.key = "9398ffbe41acbc01fccd61df9a2c9c4e";
    this.url = "https://api.openweathermap.org/data/2.5/weather?lat=" + this.latitud + "&lon=" + this.longitud + "&appid=" + this.key;
    this.map = null;
  }
  initMap() {
    var myLatlng = { lat: 0, lng: 0 };
    var map = new google.maps.Map(document.querySelector('article'),{
      zoom: 8,
      center:myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    map.addListener("click", (mapsMouseEvent) => {
      this.#getPosicion(mapsMouseEvent);
  });
  
    let infoWindow = new google.maps.InfoWindow;  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
      }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: Ha fallado la geolocalización' :
                            'Error: Su navegador no soporta geolocalización');
      infoWindow.open(mapaGeoposicionado);
    
  }

  #getPosicion(mapsMouseEvent){
    this.longitud         = mapsMouseEvent.latLng.lng(); 
    this.latitud          = mapsMouseEvent.latLng.lat();  
    this.url = "https://api.openweathermap.org/data/2.5/weather?lat=" + this.latitud.toFixed(2) + "&lon=" + this.longitud.toFixed(2)   + "&appid=" + this.key + "&units=metric";     

    $.ajax({
      dataType: "json",
      url: this.url,
      method: 'GET',
      success: function(datos){                
        //Presentación de los datos contenidos en JSON
        var stringDatos = "<h2>Datos del tiempo</h2>"
        stringDatos += "<img src=\"https://openweathermap.org/img/w/" + datos.weather[0].icon + ".png\" alt=\"Logo del Tiempo\" />";
        stringDatos += "<ul><li>Ciudad: " + datos.name + "</li>";
        stringDatos += "<li>País: " + datos.sys.country + "</li>";
        stringDatos += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li></ul>";
        
        $("h2:last").remove();
        $("main > img").remove();
        $("ul").remove();
        $("article").after(stringDatos); 
      },
      error:function(){
          $("h2").html("¡Tenemos problemas! No puedo obtener XML de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
      }     
    });
  }
}

var miMapa = new Mapa();