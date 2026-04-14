import express from "express";
import logRoutes from "./routes/logs.js";

const app = express();
const port = 3000;

// ==========================
// 🔧 Middleware
// ==========================
app.use(express.json());

// ==========================
// 🧭 Routes
// ==========================
app.use("/", logRoutes);

// ==========================
// 🚀 Root route (optional health check)
// ==========================
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Log server running",
    dashboard: "/dashboard",
    logEndpoint: "/log"
  });
});

// ==========================
// 🚀 Start server
// ==========================
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📊 Dashboard: http://localhost:${port}/dashboard`);
  console.log(`📥 Log endpoint: http://localhost:${port}/log`);
});
