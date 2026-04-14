import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// needed for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(express.json());

// serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// in-memory logs
let logs = [];

// =========================
// 📥 LOG ENDPOINT
// =========================
app.post("/log", (req, res) => {
  console.log("🔥 LOG RECEIVED:", req.body);

  logs.unshift({
    id: logs.length + 1,
    time: new Date().toISOString(),
    ip: req.ip,
    data: req.body
  });

  res.json({ success: true });
});

// =========================
// 📊 DASHBOARD DATA API
// =========================
app.get("/api/logs", (req, res) => {
  res.json(logs);
});

// start server
app.listen(port, () => {
  console.log(`🚀 http://localhost:${port}`);
});
