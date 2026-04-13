import express from "express";
import { logEvent } from "../logger.js";

const router = express.Router();

router.post("/completions", (req, res) => {
  const userMessage = req.body.message;

  // Log incoming request
  logEvent({
    type: "request",
    message: userMessage
  });

  // Fake AI response
  const reply = `You said: ${userMessage}`;

  // Log response
  logEvent({
    type: "response",
    message: reply
  });

  res.json({ reply });
});

export default router;

