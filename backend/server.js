import path from "path";
import express from "express";
import Process from "process";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.routes.js";
import connectDB from "./db/connectToMongodb.js";  
import userRoutes from "./routes/user.routes.js";
import {app,server} from './socket/socket.js';

connectDB();


dotenv.config();

app.use(cookieParser());
const port = Process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(express.json());
app.use("/api/auth" , authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users" , userRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist" , "index.html"));
})

server.listen(port, () => {});