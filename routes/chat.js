export default router;
import express from "express";
import { logEvent } from "../logger.js";
import { analyzeLog } from "../ai.js";

const router = express.Router();

router.post("/completions", async (req, res) => {
  const userMessage = req.body.message;

  const logData = {
    type: "request",
    message: userMessage
  };

  // Save log
  logEvent(logData);

  // AI analyzes the log
  const analysis = await analyzeLog(logData);

  // Log AI output too
  logEvent({
    type: "analysis",
    result: analysis
  });

  res.json({
    reply: `You said: ${userMessage}`,
    analysis: analysis
  });
});

export default router;




