// src/utils/gemini.js

/**
 * Send a chat message to Google Gemini and return the first reply.
 */
export async function generateGeminiReply(message, history = []) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) throw new Error("Missing VITE_GEMINI_API_KEY")

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

  // Build parts: prior history + this message
  const parts = [
    ...history.flatMap((h) => h.parts || []),
    { text: message }
  ]

  const body = {
    contents: [{ parts }]
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const text = await res.text()
    console.error("Gemini API error:", res.status, text)
    throw new Error(`Gemini ${res.status}: ${text}`)
  }

  const { candidates } = await res.json()
  const reply = candidates?.[0]?.content?.parts
    ?.map((p) => p.text)
    .join("") || ""
  return reply.trim()
}
