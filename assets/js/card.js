
cart = JSON.parse(localStorage.getItem('cart')) || [];
const orderList = document.querySelector('.order-items');
const totalElement = document.querySelector('.total');
async function renderCart() {

    try {
        let product = await fetch('https://pro-talento.up.railway.app/api/mindy/products').then(Response => Response.json()).then(data => data.products)
        orderList.innerHTML = '';
        let total = 0;
        for (let index = 0; index < cart.length; index++) {
            let productTrue = product.find(e => e._id == cart[index].id);
            console.log(cart)
            let targetaProducto = `
            <div class="row text-center filas rounded mb-1">
                <div class="col-lg-3 col-md-6 col-12 mt-2 mb-2">
                    <img src="${productTrue.imagen}" class="imglista rounded" alt="">
                </div>
                <div class="col-lg-4 col-md-6 col-12 infotit">
                    <h5 class="card-title">${productTrue.nombre}</h5>
                    <p>Tipo: ${productTrue.tipo}<br>Precio: ${productTrue.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}</p>
                </div>
                <div class="col-lg-2 col-md-4 col-4 colinfo">
                    <p>Cantidad: ${cart[index].cantidad} 
            
    
                        
                    </p>
                </div>
                <div class="col-lg-2 col-md-4 col-4 colinfo">
                    <p>Subtotal: ${(cart[index].cantidad * productTrue.precio).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}</p>
                </div>
                <div class="col-lg-1 col-md-4 col-4 colinfo">
                    <button id="${productTrue._id}" class="botoneliminar" onclick="deleteProduct(id)">
                       
                    `
            total += productTrue.precio * cart[index].cantidad;
            totalElement.textContent = `$${total.toFixed(2)}`;


            orderList.innerHTML += targetaProducto;
        }
    } catch (error) {
        console.log(error)
    }



}


renderCart();


function deleteProduct(id) {
    // Encuentra el índice del producto en el carrito
    const index = cart.findIndex(item => item.id === id);

    // Si el producto está en el carrito, elimínalo
    if (index !== -1) {
        cart.splice(index, 1);

        // Actualiza la vista del carrito
        renderCart();
        if (cart.length === 0) {
            total = 0;
        } else {
            total -= productToDelete.precio * productToDelete.cantidad;
        }
        totalElement.textContent = `$${total.toFixed(2)}`;
    

    }

}



const clearButton = document.querySelector('.clear-cart');

clearButton.addEventListener('click', () => {
    localStorage.removeItem('cart');
    cart = [];
    totalElement.textContent = `$${0}`;
    renderCart();
});
