"use strict";
class Precios {
    constructor(){
        this.apikey = "9398ffbe41acbc01fccd61df9a2c9c4e";
        this.ciudad = "Oviedo";
        this.codigoPais = "ES";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.startDate = "2022-10-27T00:00";
        this.endDate = "2022-11-27T17:48";


        this.url = "https://apidatos.ree.es/en/datos/mercados/precios-mercados-tiempo-real?start_date=" + this.startDate + "&end_date=" + this.endDate + "&time_trunc=hour"
        this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>"
    }
    cargarDatos(){
        let tiempo = Date.now();
        let fecha = new Date(tiempo);

        let start = fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + "T00:00";
        let end = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + (fecha.getDate() - 1) + "T23:59";

        this.startDate = start;
        this.endDate = end;

        this.url = "https://apidatos.ree.es/en/datos/mercados/precios-mercados-tiempo-real?start_date=" + this.startDate + "&end_date=" + this.endDate + "&time_trunc=hour"

        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){
                    //Presentación de los datos contenidos en JSON
                    var string = "";

                    let i = 0;
                    let date = new Date(datos.included[0].attributes.values[i].datetime);
                    let value = 0;

                    for(let property in datos.included[0].attributes.values){
                        let d = new Date(datos.included[0].attributes.values[i].datetime);
                        if(d.getDate() == date.getDate()){
                            value += datos.included[0].attributes.values[i].value;
                        } else{
                            

                            string += date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + ": " + (value / 24).toFixed(2) + "€\n";

                            date = new Date(datos.included[0].attributes.values[i].datetime);
                            value = datos.included[0].attributes.values[i].value
                        }

                        //string += datos.included[0].attributes.values[i].datetime + ": " + datos.included[0].attributes.values[i].value + "\n";
                        i++;
                    }
                    
                    $("pre:last").html(string);
                },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                $("pre").remove();
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

              //Muestra el archivo JSON recibido
              this.cargarDatos();
              this.crearElemento("pre","","section:last"); // Crea un elemento con DOM para los datos obtenidos con JSON
              this.crearElemento("h2","Datos de los últimos 31 días","section:last"); 
              $("button").attr("disabled","disabled");
    }

    delete(){
        $("h2").remove();
        $("pre").remove();
        $("p").remove();
    }
}
var precios = new Precios();