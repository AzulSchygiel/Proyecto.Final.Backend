const socket = io();

const contenedor = document.getElementById("Contenedor");


socket.on("new-product", (data) => {
    contenedor.innerHTML += `<li>
                                <p>Id : ${data.id}</p>
                                <p>Title: ${data.title}</p>
                                <p>Description: ${data.description}</p>
                                <p>Price: ${data.price} </p>
                                <p>Thumbnail: ${data.thumbnail} </p>
                                <p>Code: ${data.code}</p>
                                <p>Stock: ${data.stock} </p>
                                <p>Category: ${data.category} </p>
                                <p>Status: ${data.status}</p>
                            </li>`

});

socket.on("product-updated", (products) => {
    contenedor.innerHTML = "";
    products.forEach(prod => {
        contenedor.innerHTML += `<li>
                                        <p>Id : ${prod.id}</p>
                                        <p>Title: ${prod.title}</p>
                                        <p>Description: ${prod.description}</p>
                                        <p>Price: ${prod.price} </p>
                                        <p>Thumbnail: ${prod.thumbnail} </p>
                                        <p>Code: ${prod.code}</p>
                                        <p>Stock: ${prod.stock} </p>
                                        <p>Category: ${prod.category} </p>
                                        <p>Status: ${prod.status}</p>
                                    </li>`
    })
});

socket.on("deleted-product", (products) => {
    contenedor.innerHTML = "";
    products.forEach(prod => {
        contenedor.innerHTML += `<li>
                                    <p>Id : ${prod.id}</p>
                                    <p>Title: ${prod.title}</p>
                                    <p>Description: ${prod.description}</p>
                                    <p>Price: ${prod.price} </p>
                                    <p>Thumbnail: ${prod.thumbnail} </p>
                                    <p>Code: ${prod.code}</p>
                                    <p>Stock: ${prod.stock} </p>
                                    <p>Category: ${prod.category} </p>
                                    <p>Status: ${prod.status}</p>
                                </li>`
    })
});
