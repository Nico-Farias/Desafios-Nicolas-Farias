const socketClientReal = io()

// realTime
const productoP = document.getElementById('productoP')
const btnEliminar = document.getElementById('btnEliminar');


socketClientReal.on('Products', async (produc) => {
    const productosReal = await produc.map(prod => {
        return `
      <div class="productosListaReal">
        <div class="producto">
          <p>Name: ${
            prod.title
        }</p>
          <p>Description: ${
            prod.description
        }</p>
          <p>Price: $${
            prod.price
        }</p>
        </div>
        <input class="btnEliminar" data-product-id="${
            prod.id
        }" type="submit" value="Eliminar" />
      </div>
    `;
    });

    productoP.innerHTML = productosReal;

    const btnEliminarArray = document.getElementsByClassName('btnEliminar');
    for (let i = 0; i < btnEliminarArray.length; i++) {
        const btnEliminar = btnEliminarArray[i];

        btnEliminar.addEventListener('click', function () {
            const productId = this.getAttribute('data-product-id');
            socketClientReal.emit('eliminarProduct', productId);
        });
    }
});
