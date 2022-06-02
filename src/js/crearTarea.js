import { ethers } from "./librerias/ethers-5.6.esm.min.js";
import { abi, direccionContrato } from "./contratos/Agenda.js";
import { iniciarConexion, proveedor } from "./agenda.js";

window.onload = iniciarConexion()

document.getElementById("formCrearTarea").addEventListener("submit",function (event){ 

    event.preventDefault()

    var nombre = document.getElementById("nombreTarea")
    var descripcion = document.getElementById("descripcionTarea")

    crearTarea(nombre, descripcion)

});

async function crearTarea(nombre, descripcion) {

    console.log(proveedor.getSigner())

    var contratoAgenda = new ethers.Contract(direccionContrato, abi, proveedor.getSigner());

    try {

        var agregaTarea = await contratoAgenda.anadirTarea(nombre,descripcion,{
            gasLimit: 1000000,
            nonce: undefined
        });
        
        console.log(agregaTarea)
        
    } catch (error) {

        console.log(error)
        
    }


    // console.log(agregaTarea)

}