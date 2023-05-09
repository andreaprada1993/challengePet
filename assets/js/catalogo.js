
async function getEventsFromServer() {
    let url = `https://pro-talento.up.railway.app/api/mindy/products`;
    try {
        let response = await fetch(url);
        response = await response.json();
        productos = response.products;
        generateProductsCards(productos, ".cards-container");
        document.getElementById('botton-search').addEventListener('click', filterData);
        document.querySelectorAll('.form-check-input').forEach((each) => each.addEventListener('click', filterData));
    } catch (error) {
        console.error(error);
    }
}

getEventsFromServer();

async function filterData() {
    try {
        let inputSearch = document.getElementById('input-search').value.toLowerCase();
        let checkbox = Array.from(document.querySelectorAll('.form-check-input')).filter(each => each.checked).map(each => each.value);
        let url = `https://pro-talento.up.railway.app/api/mindy/products?nombre=${inputSearch}&tipo=${checkbox.join(',')}`;
        let response = await fetch(url);
        response = await response.json();
        if (response.products.length === 0) {
            const noMatchText = '<div class="no-match">No hay datos que coincidan con los filtros seleccionados.</div>';
            return document.querySelector(".cards-container").innerHTML = noMatchText;
        }
        generateProductsCards(response.products, ".cards-container");
    } catch (error) {
        console.error(error);
    }
}







