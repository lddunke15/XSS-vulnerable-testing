
const API_URL = "http://sushi.it.ilstu.edu:8080";
const MODEL = "translategemma:latest";
const API_KEY = "sk-35f5c79a4e6a4e4592986c51dc71eca3";

export async function analyzeLog(logData) {
  const prompt = `
You are a cybersecurity analyst.

Analyze this web request log and determine:
1. What the user is trying to do
2. If it is malicious (like XSS, injection, etc.)
3. Why it is dangerous
4. How to fix the vulnerability

Log:
${JSON.stringify(logData, null, 2)}
`;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await res.json();
    return data.choices[0].message.content;

  } catch (err) {
const res = await fetch(API_URL, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: MODEL,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  })
});

const text = await res.text();
console.log("🔥 RAW AI RESPONSE:", text);

let data;
try {
  data = JSON.parse(text);
} catch (e) {
  throw new Error("Invalid JSON from AI server");
}

return data?.choices?.[0]?.message?.content || "No AI response";


