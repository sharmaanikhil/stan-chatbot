import express from "express";
import User from "../models/User.js";
import Conversation from "../models/conversation.js";
import { askGemini } from "../services/gemini.js";

const router = express.Router();

router.post("/", async (req,res)=>{
  const { userId, message } = req.body;

  let user = await User.findOne({userId});
  if(!user){
    user = await User.create({userId});
  }

  let convo = await Conversation.findOne({userId});
  if(!convo){
    convo = await Conversation.create({userId,messages:[]});
  }

  convo.messages.push({role:"user",content:message});

  // ---- Simple memory extraction ----
const lower = message.toLowerCase();

// Save name
if (lower.includes("my name is")) {
  const name = message.split("is").pop().trim();
  user.name = name;
  await user.save();
}

// Save interest
if (lower.includes("i like")) {
  const interest = message.split("like").pop().trim();
  user.preferences = user.preferences || [];
  if (!user.preferences.includes(interest)) {
    user.preferences.push(interest);
    await user.save();
  }
}

  const recent = convo.messages.slice(-8);

  const systemPrompt = `
You are a human-like assistant.
Never say you are an AI or bot.
You have memory of the user.

User profile:
Name: ${user.name || "Unknown"}
Preferences: ${user.preferences?.join(", ") || "None"}
Tone: ${user.tone}

Past summary:
${convo.summary || "None"}

Conversation:
${recent.map(m=>`${m.role}: ${m.content}`).join("\n")}
`;

  let reply;

if (!reply || reply.includes("brief pause")) {
  const prefs = user.preferences || [];

  if (message.toLowerCase().includes("remember")) {
    if (prefs.length > 0) {
      reply = `Yes 🙂 You told me you like ${prefs.join(", ")}.`;
    } else {
      reply = "I don’t think you’ve shared your interests yet.";
    }
  } 
  else if (message.toLowerCase().includes("anime")) {
    reply = "Anime is awesome! Do you prefer action, slice of life, or something darker?";
  }
  else if (message.toLowerCase().includes("hi") || message.toLowerCase().includes("hello")) {
    reply = "Hey 😊 How’s your day going so far?";
  }
  else {
    reply = "I’m here with you. Tell me a bit more.";
  }
}


  convo.messages.push({role:"assistant",content:reply});

  if(convo.messages.length % 10 === 0){
    convo.summary = await askGemini(
      `Summarize this conversation focusing on user preferences and identity:\n${convo.messages.map(m=>m.content).join("\n")}`
    );
  }

  await convo.save();

  res.json({reply});
});

export default router;
