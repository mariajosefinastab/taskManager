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