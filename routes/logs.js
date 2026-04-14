import express from "express";
import { logs } from "../data/logsStore.js";

const router = express.Router();

// ==========================
// 📥 Receive logs
// ==========================
router.post("/log", (req, res) => {
  const logEntry = {
    id: logs.length + 1,
    time: new Date().toISOString(),
    ip: req.ip,
    data: req.body
  };

  logs.unshift(logEntry);

  console.log("📥 LOG:", logEntry);

  res.json({ success: true, id: logEntry.id });
});

// ==========================
// 📊 Dashboard
// ==========================
router.get("/dashboard", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Log Dashboard</title>
      <style>
        body {
          font-family: Arial;
          background: #0d0d0d;
          color: #00ff99;
          padding: 20px;
        }
        .log {
          border: 1px solid #333;
          padding: 10px;
          margin-bottom: 10px;
          background: #111;
        }
        .time {
          font-size: 12px;
          color: #888;
        }
        pre {
          white-space: pre-wrap;
        }
      </style>
    </head>
    <body>
      <h1>📊 Log Dashboard</h1>
      <p>Total logs: ${logs.length}</p>

      ${logs.map(log => `
        <div class="log">
          <div class="time">#${log.id} | ${log.time} | IP: ${log.ip}</div>
          <pre>${escapeHtml(JSON.stringify(log.data, null, 2))}</pre>
        </div>
      `).join("")}
    </body>
    </html>
  `);
});

// ==========================
// 🧼 Prevent XSS in dashboard
// ==========================
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default router;
