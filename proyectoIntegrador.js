const prompt = require("prompt-sync")({sigint:true});


//Array tareas

let tareas = [];
let categoriasNombres = [//Matríz
    "Trabajo",
    "Personal", //Agregar ,ás categorías si es necesario
]; 

//Muestra categorías

function mostrarTodasLasCategorias(){
    console.log("Categorías existentes: ");
    categoriasNombres.forEach(function(categoria, indice){ //Callback
        console.log(indice + ": " + categoria);
    });
}

//Cargar nuevas categorías por el Usuario

function agregarNuevaCategoriaPorElUsuario(nombreCategoria){
    categoriasNombres.push(nombreCategoria); //Agrega al final del array la información que recibe por parámetro
    console.log("Categoría " + nombreCategoria + " agregada correctamente!");
}

//Agregar tarea al array

function agregarTarea(nombreRecibido, fechaLimiteRecibida = null){

    mostrarTodasLasCategorias();

    let numeroCategoria = parseInt(prompt("Ingrese el numero de la categoria: "));

    if(numeroCategoria >= 0 && numeroCategoria < categoriasNombres.length){

        tareas.push({nombre: nombreRecibido,
            completada : false, //Redundante si pongo true ya que si la est´cargando es xq está false
            fechaLimite : fechaLimiteRecibida,
            categoria : numeroCategoria});  //objeto             
                                        
    console.log("Tarea agregada correctaemnte!");

    } else {
        console.log("Número de categoría incorrecto");
    }
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

function modificarTarea(indice, nuevoNombre, nuevaFechaLimite = null, nuevoNumeroDeCategoria){

    if(indice >= 0 && indice < tareas.length){
        tareas[indice].nombre = nuevoNombre !== undefined ? nuevoNombre : tareas[indice].nombre; //undefined por defecto, si llega algo lo cargo
        tareas[indice].fechaLimite = nuevaFechaLimite !== undefined ? nuevaFechaLimite : tareas[indice].fechaLimite;
        tareas[indice].categoria = nuevoNumeroDeCategoria !== undefined ? nuevoNumeroDeCategoria : tareas[indice].categoria;
        console.log("Modificación correcta");
/*         tareas[indice].nombre = nuevoNombre; //Dentro del array tareas ingresa a una posición específica [indice] y a la propiedad de ese objeto .propiedad
        if(nuevaFechaLimite !== null){
            tareas[indice].fechaLimite = nuevaFechaLimite;
        }
        console.log("Tarea modificada con éxito"); */
    } else {
        console.log("Índice de tarea inexistente");
    }
}

//Filtrar tareas por categoría

function filtrarTareasPorCategoria(numeroCategoria){
    //opcion1: recorrer array tareas con for y con if consultar si el objeto al que se accedió tiene una propiedad llamada categoria que coincide a el valor que se pasó por parámetro
    //opción2: Métodos de Arrays: .filter()

    let tareasFiltradas = tareas.filter(function(tarea){ //Callback: tarea, objeto del array principal
        return tarea.categoria === numeroCategoria;
    });
    return tareasFiltradas;
}

//Elegir una categoría y notificarle cuántas tareas tiene completadas sobre el total

function contarTareasCompletadasPorCategoria(numeroCategoria){
    let tareasCategoria = filtrarTareasPorCategoria(numeroCategoria); //Capturo array de la función anterior
    //Objetivo: Filtrar y recorrer el nuevo array tareasCategoria e ir acumulando cuantas tareas tengo cargadas ahí cuya propiedad llamada completada tiene un valor == true

    let tareasCompletadas = tareasCategoria.reduce(function(contador, tarea){
        return tarea.completada ? contador + 1 : contador; //retorno aquello cuya propiedad completada = true, si esto es así le sumo 1 a contador, de lo contrario contador queda como está

    }, 0);

    let tareasEnTotal = tareasCategoria.length;

    console.log("Tareas completadas de la categoría " + numeroCategoria + ": " + tareasCompletadas + " de " + tareasEnTotal + " tareas!");
}

//Mostrar todas las tareas no completadas

function mostrarTraeasNoCompletadas(){
    console.log("Tareas no completadas: ");
    tareas.forEach(function(tarea){
        if(!tarea.completada){
            console.log("- Nombre: " + tarea.nombre + ", Categoría: " + categoriasNombres[tarea.categoria]);
        }
    });
}

//Ordenar  tareas por la propiedad "nombre" con bubbleSort

function ordenarTareasPorNombre(){
    let total = tareas.length;

    for(let j = 0 ; j < total ; j++){

        for(let i = 0; i < total - 1 ; i++){
            if(tareas[i].nombre > tareas[i+1].nombre){

                let temp = tareas[i]; //arreglo tareas, posición i, totalidad del objeto
                tareas[i] = tareas[i+1];
                tareas[i+1] = temp;

                }
            }

        }
 
}

//Ordenar  tareas por la propiedad "fechaLimite" con bubbleSort

function ordenarTareasPorFechaLimite(){
    let total = tareas.length;

    for(let j = 0 ; j < total ; j++){

        for(let i = 0; i < total - 1 ; i++){
            if(tareas[i].fechaLimite > tareas[i+1].fechaLimite){

                let temp = tareas[i]; //arreglo tareas, posición i, totalidad del objeto
                tareas[i] = tareas[i+1];
                tareas[i+1] = temp;

                }
            }

        }
 
}





//Mostrar menú de opciones

function mostrarMenu(){
    console.log("Menu");
    console.log("1. Agregar tarea");
    console.log("2. Eliminar tarea");
    console.log("3. Marcar tarea como completada");
    console.log("4. Modificar una tarea");
    console.log("5. Mostrar todas las tareas");
    console.log("6. Ver todas las categorías");
    console.log("7. Agregar una nueva categoría");
    console.log("8. Filtrar tareas por categoría");
    console.log("9. Visualizar cantidad de tareas completadas por categoría");
    console.log("10. Visualizar tareas no completadas");
    console.log("11. Ordenar tareas alfabéticamente");
    console.log("12. Ordenar tareas por fecha límite");
    console.log("0. Salir");
}


//Interactuar con el usuario

function interactuarConUsuario(){
    let opcion = -1;

    while(opcion != 0){ //Si opción es distinto a 0 el usuario todavía quiere interactuar
        mostrarMenu();
        opcion = parseInt(prompt("Ingrese la opción deseada:"));
    

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
                
                if(indice >= 0 && indice < tareas.length){

                    let opcion = parseInt(prompt("¿Que propiedad desea modificar? 1. Nombre 2. Fecha Límite 3. Número de Categoría"));
                    switch (opcion) {
                        case 1:
                            let nuevoNombre = ("Ingrese el nuevo nombre de su tarea:");
                            modificarTarea(indice, nuevoNombre);
                            break;
                        case 2:
                            let nuevaFechaLimite = prompt("Ingrese nueva fecha límite para su tarea: ");
                            modificarTarea(indice, undefined, nuevaFechaLimite);
                            break;
                        case 3:
                            let nuevoNumDeCategoria = parseInt(promt("Ingrese nuevo número de categoría: "));
                            if(nuevoNumDeCategoria >= 0 && nuevoNumDeCategoria < categoriasNombres.length){
                                modificarTarea(indice, undefined, undefined, nuevoNumDeCategoria); //undefined porque no quiero cambiar el nombre y undefined porque no quiero cambiar la fecha
                            }
                            break;
                        default:
                            break;
                    }

                } else {
                    console.log("índice de tarea incorrecto!")
                }

                break;

            case 5:
                console.log("Lista de tareas: ");
                console.log(tareas);
                break;
            
            case 6:
                mostrarTodasLasCategorias();
                break;
            
            case 7:
                let nuevaCategoria = prompt("Ingrese el nombre de la nueva categoría: ");
                agregarNuevaCategoriaPorElUsuario(nuevaCategoria);
                break;


            case 8:
                mostrarTodasLasCategorias();
                let nroCategoria = parseInt(prompt("Ingrese el número de la categoría a filtrar: "));
                let tareasCategoria = filtrarTareasPorCategoria(nroCategoria); //captura array retornado en tareasCategoria

                console.log("Tareas de la categoría seleccionada: ");
                console.log(tareasCategoria);
                break;

            case 9:
                mostrarTodasLasCategorias();
                let nroCateg = parseInt(prompt("Ingrese el número de la categoría a visualizar: "));
                let contarTareasCompletadasPorCategoria(nroCateg);
                break;
            
            case 10:
                mostrarTraeasNoCompletadas();
                break;

            case 11:
                ordenarTareasPorNombre();
                console.log("Tareas por nombre: ");
                console.log(tareas);
                break;
            
            case 12:
                ordenarTareasPorFechaLimite();
                console.log("Tareas por fecha: ");
                console.log(tareas);
                break;
            
            default:
                console.log("Opción inválida");
                break;
        }
    }

}

interactuarConUsuario();