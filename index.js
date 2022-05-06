/* Este es un desarrollo que servira para administrar grupos electrogenos
en tres aspectos: alquiler, venta y mantenimiento de correctivo
 */

//Menu de ingreso
const MSG_MENU = {nuevos_equipos: "Ingrese la cantidad de equipos que quiere ingresar entre 1 y 5 equipos"}

const SUBMENU = "Seleccione entre las opciones disponibles:" + "\n" +
                " a. Ver listado de equipos activos" + "\n" +
                " b. Agregar un equipo" + "\n" +
                " c. Quitar un equipo" + "\n" +
                " d. Buscar equipo por nombre" + "\n";

//creo objeto de errores
const ERRORES = {error_menu: "Error ha ingresado una opcion incorrecta.",
                 error_voltaje: "Ha seleccionado correctivo. No hace falta calcular Voltaje.",
                 error_default: "Ha seleccionado una opcion incorrecta. No es posible realizar su pedido",
                 error_formato: "Ingresado las horas en formato incorrecto",
                 error_maxQ: "Ha ingreado un parametro no establecido o supero la cantidad disponible. Por favo, intente nuevamente.",
                 error_tipo: "Ha ingresado un tipo no aceptado o la cantidad de caracteres supera la cantidad permitida",
                 error_equipo: "No se encuentra el equipo buscado",
                 error_deposito: "No existe equipo registrado en el depósito."};


//mensajes de inputs
const ENTRADAS = {msg_voltaje: "Ingrese la cantidad de horas necesarias para calcular voltaje",
                  msg_cantidadEquipos: "Ingrese la cantidad de grupos que quiere registrar || Maximo disponible: 5",
                  msg_equipoIngreso: "Ingrese el equipo que esta buscando:",
                  msg_equipoEliminar:"Ingrese el equipo que esta buscando: ",
                  msg_codigoInterno: "Ingrese el equipo que esta buscando: "
                 }

//Objeto de limites
const LIMITS = {limit_menu_down: 0, limit_menu_up: 5, limit_down_q_electrogenos: 1, limit_up_q_electrogenos: 5};



//Arroja menu de opciones y captura valor por prompt
let menu = () => parseInt(prompt(MSG_MENU.nuevos_equipos));
let opcionKey = () => prompt(SUBMENU)
/* let result = menu(); */
let output = "";

//function verificacion
let pass = (input, downLimit, upLimit,  error) => {
    while(input < downLimit || input > upLimit || isNaN(input)){
        alert(error); //Agrego Error segun feedback
        input = menu();     
   }
   let result = parseInt(input)
   return result;
}

 //voltaje
let voltaje = (tipo, horas) => {
    if(tipo === 1 || tipo === 2){
        horas = parseInt(prompt(ENTRADAS.msg_voltaje));
        while(isNaN(horas)){
            alert(ERRORES.error_formato);
            horas = parseInt(prompt(ENTRADAS.msg_voltaje));
        }
        const VOLTAJE = 2;
        return horas * VOLTAJE;
    }else{
        alert(ERRORES.error_voltaje);
    }
}

//Creacion de Clase grupo electrogeno
class Electrogeno{
    constructor(nombre, kva, descripcion, tipo){
        this.nombre = nombre;
        this.kva = kva;
        this.descripcion = descripcion;
        this.tipo = tipo
    }

    actividad(){
        return true;
    }

    traerGrupo(){
        let equipo = {
            "Equipo": this.nombre,
            "kva": this.kva,
            "Descripcion": this.descripcion,
            "Tipo": this.tipo
          }
        return equipo;

    }

}

//Creacion de deposito

class Deposito{
    constructor(){
        this.nuevoEquipo = [];
    }

    agregarEquipo(Equipo){
        this.nuevoEquipo.push(Equipo)
    }

    eliminarEquipo(Equipo, details){

        const index = this.nuevoEquipo.map(obj => obj.nombre).indexOf(Equipo);
        if(index != -1){
            this.nuevoEquipo.splice(index, 1);
            details.innerHTML = "";
            details.innerHTML = '<div class="alert alert-danger" id="detalle" role="alert">El equipo ' + Equipo +  'ha sido eliminado del depósito`</div>';
            
        }else{
            details.innerHTML = "";
            details.innerHTML = '<div class="alert alert-danger" id="detalle" role="alert">El equipo ' + Equipo +  'no se encuentra registrado en deposito`</div>';
        }

    }

    obtenerDeposito(){
       let equiposSeleccionados = [];
       for (let i = 0; i < this.nuevoEquipo.length; i++) {
           if(typeof this.nuevoEquipo[i].nombre != undefined){
                equiposSeleccionados.push(this.nuevoEquipo[i].traerGrupo())
           }
       }
     
      return equiposSeleccionados;
      
    }

}


//listamos todas los equipos con sus caracteristicas
const list = (arr, details) => {
    let output = "";
    if(arr.length > 0){
        for (let i = 0; i < arr.length; i++) {
            output += `<tr><td>${i}</td><td> ${arr[i].Equipo}</td> <td>${arr[i].kva}</td> <td>${arr[i].Descripcion}</td> <td>${arr[i].Tipo}`;
        }
        details.innerHTML = "";
        details.innerHTML = '<div class="alert alert-success" id="detalle" role="alert">Existen '+ arr.length +' electrogenos en deposito</div>';
        return output;
        
    }else{
        details.innerHTML = "";
        details.innerHTML = '<div class="alert alert-primary" id="detalle" role="alert">'+ ERRORES.error_deposito+'</div>'
        return output = "";
    }
} 

{ }
//agrego multiples equipos
const addEquipo = () => {
    let qGrupos;
    let inicio = 0;
    let nuevoEquipo;
    let divAviso = document.getElementById("aviso")
    
    qGrupos = parseInt(prompt(ENTRADAS.msg_cantidadEquipos));
    while(isNaN(qGrupos) || (qGrupos > 5) || (qGrupos < 1)){
        alert(ERRORES.error_maxQ);
        qGrupos = parseInt(prompt(ENTRADAS.msg_cantidadEquipos));
    }
        
        while(inicio < qGrupos){
            let nombre = prompt("Ingrese la marca del grupo electrogeno");
            let kva = prompt("Ingrese la cantidad de Kva maximo");
            let descripcion = prompt("Ingrese breve descripcion");
            let tipo = prompt("Ingrese tipo de equipo");
            nuevoEquipo = new Electrogeno(nombre, kva, descripcion,tipo);
            //activo equipo
            deposito.agregarEquipo(nuevoEquipo);
            nuevoEquipo.actividad();
            alert("Equipo ingresado correctamente. Por favor cargue el equipo n°" + (inicio + 1))
            ++inicio;
            
        }
        return list(deposito.obtenerDeposito(), divAviso);
}

//busca equipo
const searchEquipo = (details) => {
    let ingreso = prompt(ENTRADAS.msg_equipoIngreso);
    let output;
    const resposnseFind = deposito.obtenerDeposito().find((element) => element.Equipo == ingreso);
    if(resposnseFind != undefined){
        details.innerHTML = "";
        details.innerHTML = '<div class="alert alert-info" id="detalle" role="alert">El equipo '+resposnseFind.Equipo+' se encuentra en sistema.</div>'
        
    }else{

        details.innerHTML = "";
        details.innerHTML = '<div class="alert alert-danger" id="detalle" role="alert">'+ERRORES.error_equipo+'. El equipo <b>'+ingreso+'</b> no fue creado o tiene un error de tipeo.</div>'
       
        
    }
}

//borra equipo
const borrarEquipo = (arr, details) => {
    if(arr.length > 0){
        let equipoEliminar = prompt(ENTRADAS.msg_equipoEliminar)
        deposito.eliminarEquipo(equipoEliminar, details);
    }

} 
