const socketController = (socket) => {
  console.log("Clinete conectado", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado", socket.id);
  });

  socket.on("enviar-mensaje", (payload) => {
    socket.broadcast.emit("enviar-mensaje", payload);
  });
};

module.exports = {
  socketController,
};
