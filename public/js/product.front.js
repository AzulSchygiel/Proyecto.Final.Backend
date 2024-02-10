function AsignarBotones() {
    let buttons = document.querySelectorAll(".prod_button");
    for (const button of buttons) {
        button.addEventListener("click", (e) => {
            mensaje();
        })
    }
};

function mensaje() {
    Swal.fire({
        title: `Se ha agregado el producto al carrito`,
        toast: true,
        position: "top-end",
    });
}

document.addEventListener("DOMContentLoaded", AsignarBotones)