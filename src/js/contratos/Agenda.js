export const direccionContrato = "0xD080539B638122ec659A96043b6ebd703E7Ff97a"
export const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "texto",
        "type": "string"
      }
    ],
    "name": "ErrorTarea",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "obtenerTareas",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "nombre",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "descripcion",
            "type": "string"
          }
        ],
        "internalType": "struct Agenda.Tarea[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tarea",
        "type": "uint256"
      }
    ],
    "name": "obtenerTarea",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "nombre",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "descripcion",
            "type": "string"
          }
        ],
        "internalType": "struct Agenda.Tarea",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "nombre",
        "type": "string"
      }
    ],
    "name": "obtenerTarea",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "nombre",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "descripcion",
            "type": "string"
          }
        ],
        "internalType": "struct Agenda.Tarea",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "nombre",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "descripcion",
        "type": "string"
      }
    ],
    "name": "anadirTarea",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tarea",
        "type": "uint256"
      }
    ],
    "name": "eliminarTarea",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "nombre",
        "type": "string"
      }
    ],
    "name": "eliminarTarea",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
