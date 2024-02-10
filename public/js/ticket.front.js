const confirm_purchase_click = document.querySelector("#confirm_purchase")
const empty_cart_click = document.querySelector("#empty_cart")

confirm_purchase_click.addEventListener("click", (e) => {
    confirm_purchase_message();
});

function confirm_purchase_message() {
    Swal.fire({
        titleText: 'Felicitaciones!',
        icon: 'succes',
        color: '#f8f8f8',
        html:
            'Se ha realizado la compra correctamente<br>' +
            'En breve recibirá la confirmación por email ',
        allowOutsideClick: false,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
            'Entendido!',
        confirmButtonAriaLabel: 'Ok!',
    });
}

empty_cart_click.addEventListener("click", (e) => {
    empty_cart_message();
});

function empty_cart_message() {
    Swal.fire({
        title: `Se ha vaciado el carrito`,
        toast: true,
        position: "top-end",
    });
}

