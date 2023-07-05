const socketClientReal = io()

// realTime
const productoP = document.getElementById('productoP')
const btnEliminarArray = document.getElementsByClassName('btnEliminar');


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


    for (let i = 0; i < btnEliminarArray.length; i++) {
        const btnEliminar = btnEliminarArray[i];

        btnEliminar.addEventListener('click', function () {
            const productId = this.getAttribute('data-product-id');
            console.log(productId)
            socketClientReal.emit('eliminarProduct', (productId));
        });
    }


});


// ESTOY TENIENDO UN PROBLEMA QUE NO ME ENVIA EL ID AL SERVER, INTENTE DE TODO Y NOSE PORQUE, FIJATE SI ME LO PODES REVISAR Y VER QUE PUEDE PASAR
