const http = require("http");
const { Server } = require("socket.io");
const app = require("./src/app");
require("dotenv").config();
const Message = require("./src/models/Message");
const connectDB = require("./src/config/db");
const server = http.createServer(app);
const jwt = require("jsonwebtoken");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication token required."));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      socket.data.userId = decoded.userId;

      next();
    } catch (error) {
      next(new Error("Invalid or expired token."));
    }
  });

  socket.on("message:send", async (message) => {
    try {
      const savedMessage = await Message.create({
        sender: message.sender,
        text: message.text,
      });

      io.emit("message:new", savedMessage);
    } catch (error) {
      console.error("Failed to save message:", error.message);
      socket.emit("message:error", {
        message: "Message could not be saved.",
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});

async function startServer() {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed.");
    process.exit(1);
  }
}

startServer();
