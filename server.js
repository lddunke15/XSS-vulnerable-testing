import express from "express";
import logRoutes from "./routes/logs.js";

const app = express();
const port = 3000;

app.use(express.json());

// routes
app.use("/", logRoutes);

// simple homepage (so you always see a webpage)
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Log Server</title>
      <style>
        body {
          font-family: Arial;
          background: #0d0d0d;
          color: #00ff99;
          padding: 40px;
          text-align: center;
        }
        a {
          color: #00ff99;
          font-size: 20px;
        }
      </style>
    </head>
    <body>
      <h1>🚀 Log Server Running</h1>
      <p>Everything is working.</p>
      <a href="/dashboard">Go to Dashboard</a>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📊 Dashboard: http://localhost:${port}/dashboard`);
});
