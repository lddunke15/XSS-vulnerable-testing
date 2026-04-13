# XSS-vulnerable-testing
How everything connects
Browser (index.html)
   ↓
fetch() request (script.js)
   ↓
Express server (server.js)
   ↓
Route handler (chat.js)
   ↓
Logger writes to file (logger.js)
   ↓
logs/app.log   (THIS is what dashboard reads)
