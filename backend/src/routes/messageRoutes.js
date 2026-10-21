const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 }).limit(100);

    res.json(messages);
  } catch (error) {
    console.error("Failed to retrieve messages:", error.message);
    res.status(500).json({
      message: "Failed to retrieve messages.",
    });
  }
});

module.exports = router;
