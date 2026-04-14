import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { analyzeLog } from "./ai.js";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let logs = [];

// 🔥 MAIN LOG + AI RESPONSE (RESTORED BEHAVIOR)
app.post("/log", async (req, res) => {
  console.log("📥 Incoming:", req.body);

  const ai = await analyzeLog(req.body);

  const entry = {
    time: new Date().toISOString(),
    data: req.body,
    ai
  };

  logs.unshift(entry);

  // IMPORTANT: return AI immediately to frontend
  res.json({
    success: true,
    ai: ai
  });
});

// optional log viewer (NOT used by index anymore)
app.get("/api/logs", (req, res) => {
  res.json(logs);
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
