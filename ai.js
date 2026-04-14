const API_URL = "http://sushi.it.ilstu.edu:8080";
const MODEL = "translategemma:latest";
const API_KEY = "sk-35f5c79a4e6a4e4592986c51dc71eca3";

export async function analyzeLog(logData) {
  const prompt = `
You are a cybersecurity analyst.

Analyze this request log and explain:
1. What the user is doing
2. Whether it is malicious (XSS, injection, etc.)
3. Why it is dangerous
4. How to fix it

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
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    // 🔍 Debug status
    console.log("AI STATUS:", res.status);

    // Get raw response text first (IMPORTANT for debugging)
    const text = await res.text();
    console.log("RAW AI RESPONSE:", text);

    // Try parsing JSON safely
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      throw new Error("AI did not return valid JSON");
    }

    // Safely extract message
    const output =
      data?.choices?.[0]?.message?.content ||
      data?.message ||
      "No AI output returned";

    return output;

  } catch (err) {
    console.log("🔥 FULL AI ERROR:", err);
    return "AI analysis failed: " + err.message;
  }
}
