const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
const txtMensaje = document.querySelector("#txtMensaje");
const btnEnviar = document.querySelector("#btnEnviar");
const chatBox = document.querySelector("#chatBox");

const socket = io();

socket.on("connect", () => {
  console.log("Conectado");
  lblOffline.hidden = true;
  lblOnline.hidden = false;
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
  lblOffline.hidden = false;
  lblOnline.hidden = true;
});

socket.on("enviar-mensaje", (payload) => {
  console.log(payload);
  const { fecha, mensaje } = payload;

  const mensajeRecibido = document.createElement("p");
  const horaDelMensaje = document.createElement("span");
  mensajeRecibido.classList.add("text-start");

  mensajeRecibido.innerHTML = mensaje;
  horaDelMensaje.innerHTML = new Date(fecha).toLocaleTimeString();

  mensajeRecibido.appendChild(horaDelMensaje);
  chatBox.appendChild(mensajeRecibido);
});

btnEnviar.addEventListener("click", () => {
  const mensaje = txtMensaje.value;
  const fecha = new Date().getTime();

  const fechaBien = new Date(fecha).toLocaleTimeString();

  const mensajeEnviado = document.createElement("p");
  const horaDelMensaje = document.createElement("span");
  mensajeEnviado.classList.add("text-end");

  mensajeEnviado.innerHTML = mensaje;
  horaDelMensaje.innerHTML = fechaBien;

  mensajeEnviado.appendChild(horaDelMensaje);
  chatBox.appendChild(mensajeEnviado);

  const payload = {
    mensaje,
    fecha,
  };

  socket.emit("enviar-mensaje", payload);
});
