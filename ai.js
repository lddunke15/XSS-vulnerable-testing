const API_URL = "http://sushi.it.ilstu.edu:8080/api/chat/completions";

const MODEL = "llama3.2-vision:latest"; // or whatever model is listed in /api/v1/models
const API_KEY = "sk-35f5c79a4e6a4e4592986c51dc71eca3";

export async function analyzeLog(logData) {
  const prompt = `
You are a cybersecurity analyst.

Analyze this log and explain:
1. What happened
2. Whether it is malicious
3. Why it is dangerous
4. How to fix it

Log:
${JSON.stringify(logData, null, 2)}
`;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        // Open WebUI usually accepts this OR ignores it
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        stream: false
      })
    });

    console.log("🔥 STATUS:", res.status);

    const text = await res.text();
    console.log("🔥 RAW RESPONSE:", text);

    if (!res.ok) {
      return `AI error (${res.status}): ${text}`;
    }

    const data = JSON.parse(text);

    return (
      data?.choices?.[0]?.message?.content ||
      data?.message?.content ||
      data?.response ||
      data?.output ||
      text
    );

  } catch (err) {
    console.log("🔥 ERROR:", err);
    return "AI analysis failed: " + err.message;
  }
}
