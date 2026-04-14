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

# Test attempt for class project
## How to use
- npm install when you cd into the file
- the npm install is for the package.json
- node server.js is the next step. 

## Final Steps
- get the AI api call to function
- write the report
- make the video
- make the website say relevant things
- maybe make the website look good
- dont have logs on website page


sudo apt install openconnect network-manager-openconnect network-manager-openconnect-gnome
curl -X OPTIONS http://sushi.it.ilstu.edu:8080/api/chat/completions -i

.ilstu.edu:8080/
HTTP/1.1 405 Method Not Allowed
date: Tue, 14 Apr 2026 01:38:09 GMT
server: uvicorn
content-length: 31
content-type: application/json
x-process-time: 0

