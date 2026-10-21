const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// Parse JSON before handling routes
app.use(express.json());

// Register routes after the middleware
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Chat API is running!");
});

module.exports = app;
