export const direccionContrato = "0x1c32B122541b9756B45429156B860bD2a50a8a13"
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
          },
          {
            "internalType": "bool",
            "name": "realizada",
            "type": "bool"
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
          },
          {
            "internalType": "bool",
            "name": "realizada",
            "type": "bool"
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
          },
          {
            "internalType": "bool",
            "name": "realizada",
            "type": "bool"
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
        "internalType": "string",
        "name": "nombre",
        "type": "string"
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
          },
          {
            "internalType": "bool",
            "name": "realizada",
            "type": "bool"
          }
        ],
        "internalType": "struct Agenda.Tarea[]",
        "name": "tareas",
        "type": "tuple[]"
      }
    ],
    "name": "eliminarTareas",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
