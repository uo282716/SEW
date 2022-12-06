"use strict";
class Fichero {
    constructor(){
        
    }
    leerArchivoTexto(files) 
  { 
      //Solamente toma un archivo
      //var archivo = document.getElementById("archivoTexto").files[0];
      var archivo = files[0];
      var nombre = document.querySelector("p[title='nombreArchivo']");
      var tamaño = document.querySelector("p[title='tamañoArchivo']");
      var tipo = document.querySelector("p[title='tipoArchivo']");
      var ultima = document.querySelector("p[title='ultimaModificacion']");
      var contenido = document.querySelector("p[title='contenidoArchivo']");
      var errorArchivo = document.querySelector("p[title='errorLectura']");
      nombre.innerText = "Nombre del archivo: " + archivo.name;
      tamaño.innerText = "Tamaño del archivo: " + archivo.size + " bytes"; 
      tipo.innerText = "Tipo del archivo: " + archivo.type;
      ultima.innerText = "Fecha de la última modificación: " + archivo.lastModifiedDate;
      contenido.innerText="Contenido del archivo de texto:"
      //Solamente admite archivos de tipo texto
      var tipoTxt = /text.plain/;
      var tipoJSon = /application.json/;
      var tipoXml = /text.xml/;
      if (archivo.type.match(tipoTxt) || archivo.type.match(tipoJSon) || archivo.type.match(tipoXml)) 
        {
          var lector = new FileReader();
          lector.onload = function (evento) {
            //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
            //La propiedad "result" es donde se almacena el contenido del archivo
            //Esta propiedad solamente es válida cuando se termina la operación de lectura
            let text = lector.result.replace("<br>", "\n");

            $("code").text(text);
            }      
          lector.readAsText(archivo);
          }
      else {
          errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
          }       
  }
}
var fichero = new Fichero();