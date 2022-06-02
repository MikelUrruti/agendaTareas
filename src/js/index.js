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
        fila.classList.add("row")

        for (let indexTarea = (indexFila * tareasPorFila); indexTarea < tareas.length; indexTarea++) {
            
            let columnaTarea = document.createElement("div")
            columnaTarea.classList.add("col-3")
            fila.appendChild(columnaTarea)

            let tarjeta = document.createElement("div")
            tarjeta.classList.add("card")
            tarjeta.style.width = "18 rem"
            columnaTarea.appendChild(tarjeta)

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

            let botonEditar = document.createElement("a")
            botonEditar.classList.add("btn","btn-primary")
            botonEditar.href = "editarTarea.html"
            botonEditar.appendChild(document.createTextNode("Editar"))
            contenidoTarjeta.appendChild(botonEditar)


        }

        document.getElementById("tareas").appendChild(fila)
        
    }




}