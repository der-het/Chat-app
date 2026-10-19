const http = require("http");
const { Server } = require("socket.io");
const app = require("./src/app");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("message:send", (message) => {
    io.emit("message:new", message);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
