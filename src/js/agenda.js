import { ethers } from "./librerias/ethers-5.6.esm.min.js";

export {iniciarConexion, metamaskInstalado, comprobarRedCorrecta, mostrarAdvertencia, mostrarError, mostrarExito, desConectarBlockchain, borrarMensaje, solicitarCuenta, mostrarMensaje}

var botonDesConectar = null;
var botonConectar = null;
export var proveedor = null;

function iniciarConexion(callback, callbackDesconexion) { 

    console.log("iniciando conexion")

    metamaskInstalado(callback)

    botonDesConectar=document.getElementById("desConectarBlockchain")
    botonConectar=document.getElementById("conectarBlockchain")

    document.getElementById("conectarBlockchain").addEventListener("click",function(){metamaskInstalado(callback)});
    document.getElementById("desConectarBlockchain").addEventListener("click",function(){desConectarBlockchain(callbackDesconexion)});

    ethereum.on("chainChanged", (_chainId) => {

        console.log(ethereum.chainId)

        window.location.reload()
        
    });

}

function metamaskInstalado(callback) {

    if (typeof window.ethereum !== 'undefined') {

        solicitarCuenta(callback)
    
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

async function solicitarCuenta(callback) {

    proveedor = new ethers.providers.Web3Provider(window.ethereum)

    proveedor.send("eth_requestAccounts", [])
    .then((cuentas) => {

        console.log(cuentas)
        console.log("cuentas: "+cuentas)
        console.log("ethereum address: "+ethereum.selectedAddress)

        if (cuentas.length > 0) {

            if (comprobarRedCorrecta()) {

                // mostrarExito("Conectado correctamente")

                if (typeof callback !== "undefined") {
                    
                    callback()

                }

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

    if (mensaje != null) {
        
        mensaje.className = "";
        mensaje.classList.add("container","alert","alert-danger","text-center");
        mensaje.innerHTML = texto;

    }

}

function mostrarAdvertencia(texto) {

    var mensaje = document.getElementById("Mensaje");

    if (mensaje != null) {
        
        mensaje.className = "";
        mensaje.classList.add("container","alert","alert-warning","text-center");
        mensaje.innerHTML = texto;

    }

}

function mostrarExito(texto) {

    var mensaje = document.getElementById("Mensaje");

    if (mensaje != null) {
        
        mensaje.className = "";
        mensaje.classList.add("container","alert","alert-success","text-center");
        mensaje.innerHTML = texto;

    }

}

function mostrarMensaje(texto) {

    var mensaje = document.getElementById("Mensaje");

    if (mensaje != null) {

        mensaje.className = "";
        mensaje.classList.add("container","alert","alert-primary","text-center");
        mensaje.innerHTML = texto;

    }

}

function borrarMensaje() {

    var mensaje = document.getElementById("Mensaje");

    if (mensaje != null) {
        
        mensaje.className = "";
        mensaje.innerText = "";

    }

}

function desConectarBlockchain(callback) {

    ethereum.selectedAddress = null;

    if (typeof callback !== "undefined") {
        
        callback()

    }

    botonDesConectar.classList.add("d-none");
    botonConectar.classList.remove("d-none");

    proveedor = null;

    borrarMensaje()

}