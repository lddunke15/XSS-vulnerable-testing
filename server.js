import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import logRoutes from "./routes/logs.js";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// serve your frontend folder
app.use(express.static(path.join(__dirname, "public")));

// backend API
app.use("/", logRoutes);

app.listen(port, () => {
  console.log(`🚀 http://localhost:${port}`);
});
