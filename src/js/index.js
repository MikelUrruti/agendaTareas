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

            let enlaceTarjeta = document.createElement("a")
            enlaceTarjeta.href = "editarTarea.html"
            enlaceTarjeta.style.color = "inherit"
            enlaceTarjeta.style.textDecoration = "inherit"
            columnaTarea.appendChild(enlaceTarjeta)

            let tarjeta = document.createElement("div")
            tarjeta.classList.add("card")
            tarjeta.style.width = "18 rem"
            enlaceTarjeta.appendChild(tarjeta)

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

            // let botonEliminar = document.createElement("button")
            // botonEliminar.classList.add("btn","btn-danger")
            // botonEliminar.appendChild(document.createTextNode("Eliminar"))
            // contenidoTarjeta.appendChild(botonEliminar)


        }

        document.getElementById("tareas").appendChild(fila)
        
    }




}