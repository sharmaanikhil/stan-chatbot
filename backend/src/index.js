import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chatRoute from "./routes/chat.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/chat", chatRoute);

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.error(err));

app.listen(5000,()=>console.log("Server running on 5000"));
