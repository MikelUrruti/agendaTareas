//SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract Agenda {

    mapping (address=>Tarea[]) private tareas;

    constructor () {

        address direccion = 0x3B7a7d5E22398689AF6A027a5916Ce199c7b1175;
        
        tareas[direccion].push(Tarea("prueba","esto es una prueba"));

    }

    struct Tarea{

        string nombre;
        string descripcion;

    }

    function obtenerTareas() view public returns (Tarea[] memory) {
        
        return tareas[msg.sender];

    }

    function obtenerTarea(uint tarea) view public returns (Tarea memory) {
        
        return tareas[msg.sender][tarea];

    }

    function obtenerTarea(string memory nombre) view public returns (Tarea memory) {
    
        for (uint256 index = 0; index < tareas[msg.sender].length; index++) {
            
            if (keccak256(abi.encodePacked(tareas[msg.sender][index].nombre)) == keccak256(abi.encodePacked(nombre))) {

                return tareas[msg.sender][index];

            }

        }

        revert("No se ha encontrado la tarea indicada");

    }

    function anadirTarea(string memory nombre, string memory descripcion) public{

        require(bytes(nombre).length > 0);
        require(bytes(descripcion).length > 0);

        tareas[msg.sender].push(Tarea(nombre,descripcion));

    }

    function eliminarTarea(uint tarea) public{

        delete tareas[msg.sender][tarea];

    }

    function eliminarTarea(string memory nombre) public{

        uint256 posicion = 0;
        bool encontrado = false;

        for (uint256 index = 0; index < tareas[msg.sender].length; index++) {
            
            if (keccak256(abi.encodePacked(tareas[msg.sender][index].nombre)) == keccak256(abi.encodePacked(nombre))) {
                
                posicion = index;
                encontrado = true;
                break;

            }

        }

        if (encontrado) {

            delete tareas[msg.sender][posicion];

        } else {
            
            revert("No se ha encontrado la tarea indicada");

        }

        

    }



}
