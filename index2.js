
//creo nuevo deposito
let deposito = new Deposito();
const btnAgregar = document.querySelector("#agregar-grupo");
let table = document.getElementById("electrogeno")
const btnBuscar = document.getElementById("buscar-grupo")
let divAviso = document.getElementById("aviso")
const btnEliminar = document.getElementById("eliminar-grupo")


btnAgregar.addEventListener("click", () => {
    table.innerHTML = addEquipo();

});

btnBuscar.addEventListener("click", () => {
    searchEquipo(divAviso)
});

btnEliminar.addEventListener("click", () => {
    borrarEquipo(deposito.obtenerDeposito(), divAviso)
    table.innerHTML = list(deposito.obtenerDeposito(), divAviso)
});
