import fs from "fs";
import path from "path";

const logDir = "logs";
const logFile = path.join(logDir, "app.log");

// Create logs folder if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export function logEvent(data) {
  const entry = {
    timestamp: new Date().toISOString(),
    ...data
  };

  fs.appendFileSync(logFile, JSON.stringify(entry) + "\n");

  console.log("LOG:", entry);
}

