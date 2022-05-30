import { ethers } from "./librerias/ethers-5.6.esm.min.js";
import { abi } from "./contratos/Agenda.js";

var botonDesConectar = null;
var botonConectar = null;
var proveedor = null;
var contratoAgenda = null;
var tareas = []

window.onload = function () { 

    console.log(document.getElementById("desConectarBlockchain"))

    conectarBlockchain()

    botonDesConectar=document.getElementById("desConectarBlockchain")
    botonConectar=document.getElementById("conectarBlockchain")

    document.getElementById("conectarBlockchain").addEventListener("click",conectarBlockchain);
    document.getElementById("desConectarBlockchain").addEventListener("click",desConectarBlockchain);

    ethereum.on("chainChanged", (_chainId) => {

        console.log(ethereum.chainId)

        window.location.reload()
        
    });

}

function conectarBlockchain() {

    if (typeof window.ethereum !== 'undefined') {

        console.log(proveedor)

        if (ethereum.isConnected()) {

            solicitarCuenta()

        } else {

            solicitarCuenta()

        }

    
    } else {
    
        mostrarError("Tienes que instalar Metamask para poder utilizar esta aplicacion")
    
    }

}

async function comprobarRedCorrecta() {

    if (window.ethereum.chainId === "0xa869") {

        return true;

    }

    mostrarError("Conectado a cadena de bloques no soportada. Tienes que conectarte a la testnet de avalanche")

    try {

        await proveedor.send("wallet_switchEthereumChain", [{chainId: "0xa869"}])
        
    } catch (error) {
        
        if (error.code === 4902) {
            
            try {
                await proveedor.send("wallet_addEthereumChain", [
                    {
                      chainId: '0xa869',
                      chainName: 'Avalanche FUJI C-Chain',
                      rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
                      nativeCurrency: {

                        name: "Avalanche",
                        symbol: "AVAX",
                        decimals: 18


                      },
                      blockExplorerUrls: ["https://testnet.snowtrace.io/"]
                    },
                  ],
                );
              } catch (addError) {

                

              }

        }

    }

    return false;

}

async function solicitarCuenta() {

    proveedor = new ethers.providers.Web3Provider(window.ethereum)

    proveedor.send("eth_requestAccounts", [])
    .then((cuentas) => {

        console.log("cuentas: "+cuentas)
        console.log("ethereum address: "+ethereum.selectedAddress)

        if (cuentas > 0) {

            if (comprobarRedCorrecta()) {

                // mostrarExito("Conectado correctamente")

                obtenerTareas()

            }

            botonConectar.classList.add("d-none");
            botonDesConectar.classList.remove("d-none");

        } else {

            botonDesConectar.classList.add("d-none");
            botonConectar.classList.remove("d-none");

        }

    })
    .catch((error) => {

        console.log(error)

        if (error.code === 4001) {
            
            mostrarError("Has rechazado la conexion de Metamask")

        } else if(error.code === -32002) {

            mostrarAdvertencia("Solicitud de cuenta pendiente de aprobacion. Abre Metamask para aprobar o rechazar la conexion")

        }

    });

}

function mostrarError(texto) {

    var mensaje = document.getElementById("Mensaje");

    mensaje.className = "";
    mensaje.classList.add("container","alert","alert-danger","text-center");
    mensaje.innerHTML = texto;

}

function mostrarAdvertencia(texto) {

    var mensaje = document.getElementById("Mensaje");

    mensaje.className = "";
    mensaje.classList.add("container","alert","alert-warning","text-center");
    mensaje.innerHTML = texto;

}

function mostrarExito(texto) {

    var mensaje = document.getElementById("Mensaje");

    mensaje.className = "";
    mensaje.classList.add("container","alert","alert-success","text-center");
    mensaje.innerHTML = texto;

}

function mostrarMensaje(texto) {

    var mensaje = document.getElementById("Mensaje");

    mensaje.className = "";
    mensaje.classList.add("container","alert","alert-primary","text-center");
    mensaje.innerHTML = texto;

}

function borrarMensaje() {

    var mensaje = document.getElementById("Mensaje");

    mensaje.className = "";
    mensaje.innerText = "";

}

function desConectarBlockchain() {

    ethereum.selectedAddress = null;

    tareas = [];
    document.getElementById("tareas").innerHTML = ""

    botonDesConectar.classList.add("d-none");
    botonConectar.classList.remove("d-none");

    proveedor = null;

    borrarMensaje()

}

async function obtenerTareas() {

    const tareasPorFila = 4;

    contratoAgenda = new ethers.Contract("0x922501bC43C4290ee614B4394928000B22Fb0b24",abi,proveedor.getSigner());

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

//Direccion contrato: 0x922501bC43C4290ee614B4394928000B22Fb0b24