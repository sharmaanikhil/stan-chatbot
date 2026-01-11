import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId:String,
  name:String,
  tone:{type:String,default:"neutral"},
  preferences:[String],
  personality:String
});

export default mongoose.model("User",userSchema);
