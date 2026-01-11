import axios from "axios";

export async function askGemini(prompt){
  try{
    const res = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        params: {
          key: process.env.GEMINI_API_KEY
        }
      }
    );

    return res.data?.candidates?.[0]?.content?.parts?.[0]?.text 
  || "Tell me a bit more 🙂";
  } catch (err) {
    console.error("Gemini error:", err.response?.status);
    return "I'm having a brief pause right now. Can you try again in a moment?";
  }
}
