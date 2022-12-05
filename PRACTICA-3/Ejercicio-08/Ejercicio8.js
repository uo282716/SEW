"use strict";
class Meteo {
    constructor(){
        this.apikey = "9398ffbe41acbc01fccd61df9a2c9c4e";
        this.ciudad = "Oviedo";
        this.codigoPais = "ES";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>"
    }
    cargarDatos(){
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){                
                    //Presentación de los datos contenidos en JSON
                    
                    var stringDatos = "<img src=\"https://openweathermap.org/img/w/" + datos.weather[0].icon + ".png\" alt=\"Logo de Ruby\" />";
                    stringDatos += "<ul><li>Ciudad: " + datos.name + "</li>";
                    stringDatos += "<li>País: " + datos.sys.country + "</li>";
                    stringDatos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                    stringDatos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                    stringDatos += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                    stringDatos += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                    stringDatos += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
                    stringDatos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                    stringDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                    stringDatos += "<li>Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                    stringDatos += "<li>Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>";
                    stringDatos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                    stringDatos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                    stringDatos += "<li>Hora de la medida: " + new Date(datos.dt *1000).toLocaleTimeString() + "</li>";
                    stringDatos += "<li>Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "</li>";
                    stringDatos += "<li>Descripción: " + datos.weather[0].description + "</li>";
                    stringDatos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                    stringDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";
                    
                    $("h3").after(stringDatos);
                },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                $("p").remove();
                }
        });
    }
    crearElemento(tipoElemento, texto, insertarAntesDe){
        // Crea un nuevo elemento modificando el árbol DOM
        // El elemnto creado es de 'tipoElemento' con un 'texto' 
        // El elemnto se coloca antes del elemnto 'insertarAntesDe'
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(elemento).prependTo(insertarAntesDe);
    }
    verJSON(ciudad){
        this.delete();
        this.ciudad = ciudad;
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;

              //Muestra el archivo JSON recibido
              this.cargarDatos();
              //this.crearElemento("p","","section:last"); // Crea un elemento con DOM para los datos obtenidos con JSON
              this.crearElemento("h3","Datos","section:last"); // Crea un elemento con DOM 
              this.crearElemento("h2","Datos de " + ciudad + ". Obtenidos en (<a href='http://openweathermap.org'>OpenWeatherMap</a>)","section:last"); 
              $("button").attr("disabled","disabled");
    }

    delete(){
        $("h2:last").remove();
        $("h3").remove();
        $("section > img").remove();
        $("ul").remove();
    }
}
var meteo = new Meteo();