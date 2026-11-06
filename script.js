const filaClientes = [];
const historial = [];

const inputCliente = document.getElementById("inputCliente");
const inputProductos = document.getElementById("inputProductos");
const btnAgregar = document.getElementById("btnAgregar");
const btnAtender = document.getElementById("btnAtender");
const listaClientes = document.getElementById("listaClientes");
const estadisticas = document.getElementById("estadisticas");

btnAgregar.addEventListener("click", agregarCliente);
btnAtender.addEventListener("click", atenderCliente);

function agregarCliente() {
  const nombre = inputCliente.value.trim();
  const productos = Number(inputProductos.value.trim());

  if(nombre !== "" && productos > 0){
    const cliente = {
      nombre: nombre,
      productos: productos
    };
    filaClientes.push(cliente); 

    inputCliente.value = "";
    inputProductos.value = "";
    inputCliente.focus();


    actualizarFilaEnPantalla();
    actualizarEstadisticasEnPantalla();




  }
}

function atenderCliente() {
  if (filaClientes.length > 0) {
    const cliente = filaClientes.shift();
    historial.push(cliente);
    actualizarFilaEnPantalla();
    actualizarEstadisticasEnPantalla();
  }
}

function actualizarFilaEnPantalla() {
    listaClientes.innerHTML = "";
    filaClientes.forEach(cliente => {
        const li = document.createElement("li");
        li.textContent = `${cliente.nombre} - ${cliente.productos} productos`;
        listaClientes.appendChild(li);
    });

}

function actualizarEstadisticasEnPantalla() {
    const clientesEnEspera = filaClientes.length;
    const clientesAtendidos = historial.length;
    const totalProductosPendientes = filaClientes.reduce((total, cliente) => total + cliente.productos, 0);
    estadisticas.textContent = `En espera: ${clientesEnEspera} | Atendidos: ${clientesAtendidos} | Productos pendientes: ${totalProductosPendientes}`;


}

