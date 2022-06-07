import { ethers } from "./librerias/ethers-5.6.esm.min.js";
import { abi, direccionContrato } from "./contratos/Agenda.js";
import { iniciarConexion, proveedor } from "./agenda.js";

var tareas = []
var contratoAgenda = null;

window.onload = iniciarConexion(obtenerTareas, function(){
    tareas = [];
    document.getElementById("tareas").innerHTML = ""

})

async function obtenerTareas() {

    const tareasPorFila = 4;

    contratoAgenda = new ethers.Contract(direccionContrato,abi,proveedor.getSigner());

    var tareas = await contratoAgenda.obtenerTareas();

    var numFilas = Math.ceil(tareas.length / tareasPorFila);

    for (let indexFila = 0; indexFila < numFilas; indexFila++) {
        
        let fila = document.createElement("div")
        fila.classList.add("row","my-3")

        let maxPosicionTareas = indexFila < numFilas-1 ? ((indexFila+1) * tareasPorFila) : tareas.length;

        for (let indexTarea = (indexFila * tareasPorFila); indexTarea < maxPosicionTareas; indexTarea++) {
            
            let columnaTarea = document.createElement("div")
            columnaTarea.classList.add("col-3")
            fila.appendChild(columnaTarea)

            let tarjeta = document.createElement("div")
            tarjeta.classList.add("card","cardModificada")
            tarjeta.style.width = "18 rem"
            tarjeta.id = tareas[indexTarea].nombre
            columnaTarea.appendChild(tarjeta)

            tarjeta.addEventListener("click",function () { 
    
                if (this.classList.contains("cardSeleccionada")) {
                    
                    this.classList.remove("cardSeleccionada")

                } else {

                    this.classList.add("cardSeleccionada")

                }

                if (document.querySelectorAll(".cardSeleccionada").length > 0) {

                    console.log("hola")
                        
                    document.getElementById("eliminarTareas").classList.remove("disabled")
                    document.getElementById("finalizarTareas").classList.remove("disabled")

                } else {

                    console.log("hola deshabilitado")

                    document.getElementById("eliminarTareas").classList.add("disabled")
                    document.getElementById("finalizarTareas").classList.add("disabled")

                }
        
            })

            let imagen = document.createElement("img")
            imagen.src = "./img/cuaderno.png"
            imagen.classList.add("card-img-top")
            tarjeta.appendChild(imagen)

            let contenidoTarjeta = document.createElement("div")
            contenidoTarjeta.classList.add("card-body")
            tarjeta.appendChild(contenidoTarjeta)

            let titulo = document.createElement("h5")
            titulo.classList.add("card-title")
            titulo.appendChild(document.createTextNode(tareas[indexTarea].nombre))
            contenidoTarjeta.appendChild(titulo)

            let descripcion = document.createElement("p")
            descripcion.classList.add("card-text")
            descripcion.appendChild(document.createTextNode(tareas[indexTarea].descripcion))
            contenidoTarjeta.appendChild(descripcion)

            let botonEditar = document.createElement("button")
            botonEditar.classList.add("btn","btn-primary")
            botonEditar.appendChild(document.createTextNode("Editar"))
            contenidoTarjeta.appendChild(botonEditar)


        }

        document.getElementById("tareas").appendChild(fila)
        
    }

}

document.getElementById("eliminarTareas").addEventListener("click",async function () { 

    var elementosSeleccionados = document.querySelectorAll(".cardSeleccionada")

    if ((!this.classList.contains("disabled")) && (elementosSeleccionados.length > 0)) {
        
        contratoAgenda = new ethers.Contract(direccionContrato,abi,proveedor.getSigner());

        if (elementosSeleccionados.length == 1) {
            
            var eliminarTarea = await contratoAgenda.eliminarTarea(elementosSeleccionados[0].querySelectorAll(".card-title")[0].innerHTML);

            try {

                await eliminarTarea.wait();

            } catch (error) {

                console.log("error")

            }

        } else {

            

        }


    }

})