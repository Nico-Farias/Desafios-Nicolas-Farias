const socketClient = io()


// home
const formulario = document.getElementById('formulario')
const title = document.getElementById('title')
const description = document.getElementById('description')
const price = document.getElementById('price')
const thumbnail = document.getElementById('thumbnail')
const qty = document.getElementById('qty')
const products = document.getElementById('products')
const btn = document.getElementById('btn')


btn.addEventListener('click', () => {
    socketClient.emit('newProduct', {
        title: title.value,
        description: description.value,
        price: price.value,
        thumbnail: thumbnail.value
    })

    socketClient.on('prodId', (prod) => {

        products.innerHTML = `
           <div class="productosLista">
            <p>Id:  ${
            prod.id
        } </p>
            <p>Name:  ${
            prod.title
        } </p>
            <p>Description:  ${
            prod.description
        }</p>
            <p>Price:  $${
            prod.price
        } </p>
    
           </div>`

    })


})
