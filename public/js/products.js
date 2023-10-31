const socket = io();

const formProducts = document.getElementById('products-form');

formProducts.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const code = document.getElementById('code');
    const price = document.getElementById('price');
    const status = document.getElementById('status');
    const stock = document.getElementById('stock');
    const category = document.getElementById('category');

    const data = {
        title: title.value,
        description: description.value,
        code: code.value,
        price: parseFloat(price.value),
        status: status.value,
        stock: parseInt(stock.value),
        category: category.value
    };

    try {
        const response = await fetch('/realTimeProducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            title.value = '';
            description.value = '';
            code.value = '';
            category.value = '';
            price.value = '';
            status.value = '';
            stock.value = '';
            category.value = '';
        } else {
            alert('Error al agregar producto');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

socket.on('update-list', ({ products }) =>{
    const products_list = document.getElementById('products-list');
    products_list.innerText = '';

    products.forEach((data) => {
        const li = document.createElement('li');
        li.innerText = `[${data.category}] - ${data.title} (${data.code}) -> ${data.description}.............. $${data.price}  ${data.stock} restantes`;
        products_list.appendChild(li);
    });
})