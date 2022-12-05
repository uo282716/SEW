"use strict";
class Modificador{
    constructor(){
    }

    mostrarElemento(){
        $("footer").show();
    }

    ocultarElemento(){
        $("footer").hide();
    }

    cambiarTitulos(){
        $("h3").text("h3 cambiado");
    }

    defaultTitulos(){
        $("h3").text("Tabla de versiones");
    }

    addLista(){
        $("ul li:last-child").after("<li>Nuevo elemento</li>");
    }

    removeLista(){
        $("ul li:last-child").remove();
    }

    crearElemento(tipoElemento, texto, insertarAntesDe){
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(elemento).prependTo(insertarAntesDe);
    }

    recorrido(){

        $("*", document.body).each(function() {
            var etiquetaPadre = $(this).parent().get(0).tagName;

            var elemento = document.createElement("p"); 
            elemento.innerText = "Etiqueta padre : <"  + etiquetaPadre + "> elemento : <" + $(this).get(0).tagName + ">";
            $("main > h2:last").before(elemento);
        });
    }

    sumatorio(){
        let table = document.querySelector("table");
        let sumCol = new Array(table.rows[0].cells.length);
        let sumRow = 0;
        let sumTot = 0;
        for(let i = 0; i < table.rows.length; i++){
            sumCol[i] = 0;
        }

        let sum = document.createElement('th');
        let text = document.createTextNode("Sumatorio");
        sum.appendChild(text);
        document.querySelector("tr:first-child").appendChild(sum);
        for(let i = 1; i < table.rows.length; i++){
            for(let j = 1; j < table.rows[i].cells.length; j++){

                sumRow += Number(table.rows[i].cells[j].innerHTML);
                sumCol[j] += Number(table.rows[i].cells[j].innerHTML);
                sumTot += Number(table.rows[i].cells[j].innerHTML);
            }
            let celda = document.createElement('td');
            let valor = document.createTextNode(sumRow);
            celda.appendChild(valor);
            document.querySelector("tr:nth-child(" + (i+1) + ")").appendChild(celda);

            sumRow = 0;

        }
        let nuevaFila = document.createElement('tr');

        let celdaTotal = document.createElement('th');
        let textoCeldaTotal = document.createTextNode('Sumatorio: ');
        celdaTotal.appendChild(textoCeldaTotal);
        nuevaFila.appendChild(celdaTotal);

        for(let i = 1; i < table.rows[0].cells.length - 1; i++){
            let celda = document.createElement('td');
            let valor = document.createTextNode(sumCol[i]);
            celda.appendChild(valor);
            nuevaFila.appendChild(celda);
        }

        let celda = document.createElement('td');
        let valor = document.createTextNode(sumTot);
        celda.appendChild(valor);
        nuevaFila.appendChild(celda);

        document.querySelector("tbody").appendChild(nuevaFila);


    }
}

var mod = new Modificador();