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
const port = Process.env.PORT;
app.use(express.json());
app.use("/api/auth" , authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users" , userRoutes);


server.listen(port, () => {});