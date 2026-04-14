const API_URL = "http://sushi.it.ilstu.edu:8080"; // Make sure this is the correct API URL
const MODEL = "translategemma:latest";  // Your model name
const API_KEY = "sk-ba5e11bb7308462f90234d4576245754";  // Your API Key

export async function analyzeLog(logData) {
  const prompt = `
You are a cybersecurity analyst.

Analyze this log and explain:
1. What happened
2. Whether it's malicious
3. Why it matters
4. How to fix it

Log:
${JSON.stringify(logData, null, 2)}
`;

  try {
    // Send raw input, no sanitization (XSS allowed in the input)
    const res = await fetch(API_URL, {
      method: "GET",  // POST method since we're sending data
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

    // Get raw response from AI
    const text = await res.text();
    console.log("🔥 RAW AI RESPONSE:", text);

    if (!res.ok) {
      return `AI request failed (${res.status}): ${text}`;
    }

    // Attempt to parse the response, if possible
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return text;  // If not JSON, just return the raw text
    }

    // Return multiple possible response formats
    return (
      data?.choices?.[0]?.message?.content ||
      data?.message ||
      data?.response ||
      data?.output ||
      JSON.stringify(data)
    );

  } catch (err) {
    console.log("🔥 FULL AI ERROR:", err);
    return "AI analysis failed: " + err.message;
  }
}
