const prompt = require("prompt-sync")({sigint:true});


//Array tareas

let tareas = [];

//Agregar tarea al array

function agregarTarea(nombreRecibido, fechaLimiteRecibida = null){
    tareas.push({nombre: nombreRecibido,
                 completada : false, //Redundante si pongo true ya que si la est´cargando es xq está false
                 fechaLimite : fechaLimiteRecibida                
    });  //objeto
}

//Eliminar tarea

function eliminarTarea(indice){

    if(indice >= 0 && indice < tareas.length){
        tareas.splice(indice, 1); //ingresa al array, busca la posición, elimina el objeto en esa posición
        console.log("Tarea eliminada correctamente");
    } else {
        console.log("Índice de tarea inexistente");
    }
}

//Tarea completada

function completarTarea(indice){

    if(indice >= 0 && indice < tareas.length){ //Si indice se encuentra enel rango disponible de la cantidad de elementos que tiene cargado treas(length)
        tareas[indice].completada = true; //en el array tareas en la posición que tiene el parámetro indice acceda a la propiedad llamada completada.
        console.log("Tarea marcada como completada");
    } else {
        console.log("Índice de tarea inexistente");
    }
}

//Modificar una tarea

function modificarTarea(indice, nuevoNombre, nuevaFechaLimite = null){

    if(indice >= 0 && indice < tareas.length){
        tareas[indice].nombre = nuevoNombre; //Dentro del array tareas ingresa a una posición específica [indice] y a la propiedad de ese objeto .propiedad
        if(nuevaFechaLimite !== null){
            tareas[indice].fechaLimite = nuevaFechaLimite;
        }

        console.log("Tarea modificada con éxito");
    } else {
        console.log("Índice de tarea inexistente");
    }
}

//mostrar menú de opciones

function mostrarMenu(){
    console.log("Menu");
    console.log("1. Agregar tarea");
    console.log("2. Eliminar tarea");
    console.log("3. Marcar tarea como completada");
    console.log("4. Modificar una tarea");
    console.log("5. Mostrar todas las tareas");
    console.log("0. Salir");
}


//Interactuar con el usuario

function interactuarConUsuario(){
    let opcion = -1;

    while(opcion != 0){ //Si opción es distinto a 0 el usuario todavía quiere interactuar
        mostrarMenu();
        opcion = parseInt(prompt("Ingrese la opción deseada:"));
    }

    switch (opcion) {
        case 1:
            let nombreTareaNueva = prompt("Ingrese el nombre de la tarea a cargar: ");
            agregarTarea(nombreTareaNueva);
            break;
    
        case 2:
            let indiceAEliminar = parseInt(prompt("Ingrese el índice de la tarea a eliminar: "));
            eliminarTarea(indiceAEliminar);
            break;

        case 3:
            let indiceACompletar = parseInt(prompt("Ingrese el índice de la tarea a completar: "));
            completarTarea(indiceACompletar);
            break;


        case 4:
            let indice = parseInt(prompt("Ingrese el índice de la tarea a modificar: "));
            let nuevoNombre = prompt("Ingrese el nuevo nombre de su tarea: ");
            modificarTarea(indice, nuevoNombre);
            break;

        case 4:
            console.log("Lista de tareas: ");
            console.log(tareas);
            break;

        default:
            console.log("Opción inválida");
            break;
    }
}


interactuarConUsuario();