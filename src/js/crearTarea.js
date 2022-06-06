import { ethers } from "./librerias/ethers-5.6.esm.min.js";
import { abi, direccionContrato } from "./contratos/Agenda.js";
import { iniciarConexion, mostrarAdvertencia, mostrarError, mostrarExito, proveedor } from "./agenda.js";

window.onload = iniciarConexion()

document.getElementById("formCrearTarea").addEventListener("submit",function (event){ 

    event.preventDefault()

    var nombre = document.getElementById("nombreTarea").value
    var descripcion = document.getElementById("descripcionTarea").value

    crearTarea(nombre, descripcion)

});

async function crearTarea(nombre, descripcion) {

    console.log(proveedor.getSigner())

    var contratoAgenda = new ethers.Contract(direccionContrato, abi, proveedor.getSigner());
    console.log(contratoAgenda)

    try {

        mostrarAdvertencia("Se esta procesando la transaccion, espere un momento...");

        var agregaTarea = await contratoAgenda.anadirTarea(nombre,descripcion,{
            gasLimit: 1000000
        });

        await agregaTarea.wait()

        mostrarExito("¡Se ha creado la tarea con exito!")
        
    } catch (e) {

        mostrarError(e)

        console.log(e)
        console.log(e.code)
        console.log(e.errorName)
        console.log(e.reason)


        if (e.code === "CALL_EXCEPTION") {
            // If the error was SomeCustomError(), we can get the args...
            if (e.errorName === "ErrorTarea") {
              // These are both the same; keyword vs positional.
              console.log(e.errorArgs.addr);
              console.log(e.errorArgs[0]);
              // These are both the same; keyword vs positional
              console.log(e.errorArgs.value);
              console.log(e.errorArgs[1]);
            }
        }
        
    }


    // console.log(agregaTarea)

}