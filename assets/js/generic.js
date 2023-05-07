let url = `https://pro-talento.up.railway.app/api/mindy/products`;
async function getCategorias() {
    try {
        let response = await fetch(url);
        response = await response.json();
        const categorias = Array.from(new Set(response.products.map(product => product.tipo)));
        console.log(categorias)
        crearCheckboxesDeCategorias(categorias);

    } catch (error) {
        console.log(error);
    }
}

getCategorias();

function crearCheckboxesDeCategorias(array) {
    const container = document.querySelector('.container-filtros');
    const formGroup = document.createElement('div');
    formGroup.classList.add('form-group');
    container.appendChild(formGroup);
    array.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
            <input class="form-check-input" type="checkbox" value="${category}" id="${category}">
            <label class="form-check-label" for="${category}">${category}</label>
        `;
        formGroup.appendChild(div);
    });
}


function generateProductsCards(array, containerId) {
    const container = document.querySelector(containerId);
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const id=array[i]._id;
        const nameCard = array[i].nombre;
        const imgCard = array[i].imagen;
        const priceCard = array[i].precio;
        const stockCard = array[i].stock;
        const tipoCard = array[i].tipo;
        const descripcionCard = array[i].descripcion;
        let card = cardProduct(id,nameCard, imgCard, priceCard, stockCard, tipoCard);
        container.appendChild(card);
    }
}

function cardProduct(id,nameCard, imgCard, priceCard, stockCard, tipoCard) {
    let content = document.createElement('div');
    content.className = "product-card";
    let card = '<img src="' + imgCard + '">\n' +
        '<div class="product-info">\n' +
        '<div>\n' +
        '<p>' + "$" + priceCard + '</p>\n' +
        '<p>' + nameCard + '</p>\n' +
        '<p>' + "stock: " + stockCard + '</p>\n' +
        '<p>' + "Tipo: " + tipoCard + '</p>\n' +
        '</div>\n' +
        '</div>\n';
    content.innerHTML += card;
    content.addEventListener('click', () => {
        detallesProductos(id);
    });
    return content;


}

async function detallesProductos(id) {
    try {
        let producto = await fetch(url + "/" + id).then(response => response.json()).then(data => data.product);
        Swal.fire({
            imageUrl: producto.imagen,
            imageHeight: 200,
            title: producto.nombre,
            html: `<div class="product-info"><p class="price"> ${producto.precio}</p><p class="details"> ${producto.descripcion} </p><p class="stock"> ${producto.stock} </p><p class="Tipo"> ${producto.tipo} </p><button class="primary-button add-to-cart-button"><img src="../assets/icons/bt_add_to_cart.svg" alt="add to cart"> Add to cart</button></div>`,
            showCloseButton: true,
            showConfirmButton: false
        });
    } catch (error) {


    }
}
