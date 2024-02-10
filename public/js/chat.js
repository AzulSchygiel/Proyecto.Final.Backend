const socket = io();

let username;

Swal.fire({
    title: 'Bienvenido, Identificate:',
    input: "text",
    text: 'Ingresa tu nombre de usuario:',
    inputValidator: (value) => {
        return !value && "No has ingresado tu usuario"
    },
    allowOutsideClick: false,
    icon: 'info',
    confirmButtonText: 'Cool'
}).then((result) => {

    username = result.value;
    socket.emit("new-user", username);
});

const chatInput = document.getElementById("chat-input");
chatInput.addEventListener("keyup", (ev) => {
    if (ev.key === "Enter") {  
        const input = chatInput.value;
        if (input.trim().length > 0) {
            socket.emit("messages", { username, message: input });
            chatInput.value = "" 
        }
    }
});

const chatMessages = document.getElementById("chat-messages");
socket.on("messages", (data) => {
    let message = "";
    data.forEach((m) => {
        message += `<b>${m.username}:</b> ${m.message}</br>`;
    });
    chatMessages.innerHTML = message
});

socket.on("new-user", (username) => { 
    Swal.fire({
        title: `${username} se ha conectado al chat`,
        toast: true,
        position: "top-end",
    });
});
