let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// fetch 
const url = "./data.json"; 

fetch(url)
.then(res => res.json())
.then(data => mostrarProductos(data))


// generar productos
    
const contenedorProd = document.querySelector(".productos"); 

function mostrarProductos(productos){
    //console.log("En la funcion"); 
    //console.log(productos); 

    productos.forEach( prod => {
        let card = document.createElement('div'); 
        card.innerHTML = `<div class="card ${prod.class}" style="width: 18rem;" >
                      
                        <img src="${prod.img}" class="card-img-top" alt="..."/> 
                        <div class="card-body">
                        <h5 class="card-title">${prod.nombre}</h5>
                        <p class="card-text">${prod.description}</p>
                        <p class="card-text precio">${prod.precio}</p>
                        <button class="btn btn-primary agregar-carrito" id="${prod.id}"> Agregar al carrito </button></div>
                        </div>`

        contenedorProd.appendChild(card)
    })

    const botonesAgregar = document.querySelectorAll(".agregar-carrito"); 
     botonesAgregar.forEach(btn => {
        btn.addEventListener("click", (e)=> agregarAlCarrito(e, productos))
     })
}



//funcion agregar al carrito
 function agregarAlCarrito(e, prods){
    console.log(prods); 
    console.log(e.target.id); 

    Toastify({
        text:"Agregado al carrito", 
        duration: 3000, 
        gravity: "top", 
        position: "center", 
        style: {
            color: "rgb(190,182,178)", 
            background: "rgb(64,79,60)", 
            fontWeight: "bold",
            borderRadius: "15px", 
            fontSize: "20px"}
        
    }).showToast(); 


    console.log("Producto agregado al carrito", e.target); 
    let hijo = e.target; //btn de agregar al carrito
    let papa = hijo.parentNode; 
    let abuelo = papa.parentNode; 

    let nombreProducto = papa.querySelector("h5").textContent; 
    console.log(nombreProducto); 

    let precio = papa.querySelector(".precio").innerText; 
    console.log(precio); 

    let fotoProducto = abuelo.querySelector("img").src; 
    console.log(fotoProducto); 

    let producto= {
        nombre : nombreProducto, 
        precio: precio, 
        img: fotoProducto, 
        cantidad: 1
    }; 

    carrito.push(producto);

    contenidoCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito)); 
    contenidoCarrito();


 }
//function totales del carrito

function calcularTotales(){
    let totalProductos = 0; 
    let precioTotal = 0; 
    
    for(let producto of carrito) {
        totalProductos += producto.cantidad; 
        precioTotal += parseInt(producto.precio) * producto.cantidad; 
    }

    return {totalProductos, precioTotal}; 

}

// contenido carrito 


 function contenidoCarrito(){
    let tabla = document.getElementById("tbody"); 

    tabla.innerHTML = "";
    
    for(let producto of carrito){
        let fila = document.createElement("tr"); 
        fila.innerHTML = `<td><img src="${producto.img}"></td>
                            <td><p>${producto.nombre}</p></td>
                            <td><p>${producto.cantidad}</p></td>
                            <td><button class="btn-btn-danger eliminarItem">Eliminar Item</button></td>
                            `; 
        tabla.appendChild(fila); 

    }

    // calcular totales
    let {totalProductos, precioTotal} = calcularTotales(); 
    let filaResultado = document.createElement("tr"); 
    filaResultado.innerHTML = `<td></td>
                            <td></td>
                            <td><p> Total Productos: ${totalProductos}</p></td>
                            <td><p> Total: ${precioTotal}</p></td>
                            <boton><a href="./compraste.html">COMPRAR</a><botton>`; 
    tabla.appendChild(filaResultado); 

// boton borrar    
let botonBorrar = document.querySelectorAll(".eliminarItem"); 

    for (let btn of botonBorrar){
        btn.addEventListener("click", borrarItem); 
        
    }

    

}
// borrar item

function borrarItem(e){
    console.log("borrar item:", e.target); 
    let abuelo = e.target.parentNode.parentNode; 
    let productoEliminar = abuelo.querySelector("p").innerText; 
    
    console.log(productoEliminar); 

   //abuelo.remove(); 

    function eliminarProducto (producto){
        return producto.nombre != productoEliminar 
        
    }

    let resultadoFilter = carrito.filter(eliminarProducto); 
    carrito = resultadoFilter;  
    console.log(resultadoFilter); 

    localStorage.setItem("carrito", JSON.stringify(carrito)) 

    contenidoCarrito(); 

}


console.log(
    carrito
)

// pop-up sweet alert con asincronia

setTimeout(function() {
    Swal.fire({
      title: '¡Promoción especial!',
      text: 'No te pierdas nuestras ofertas de esta semana.',
      icon: 'info',
      background: "rgb(204,202,189)",
      color: "rgb(85,95,104)",
      confirmButtonText: 'Cerrar',
      confirmButtonColor:"rgb(154,123,115)", 
      showClass: {
        popup: "animate__animated animate__bounceInLeft"
    }, 
    hideClass: {
        popup: "animate__animated animate__bounceOutRight"

    } 
    });
  }, 5000);

