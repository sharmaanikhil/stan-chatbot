import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  userId:String,
  messages:[
    {
      role:String,
      content:String
    }
  ],
  summary:String
});

export default mongoose.model("Conversation",conversationSchema);
