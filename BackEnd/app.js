import dotenv from "dotenv";
dotenv.config();

import { connectToSocket } from "./src/controllers/socketManager.js";
import express from "express";
import mongoose, { connect } from "mongoose";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";
import userRoutes from "./src/routes/users.routes.js";
import bodyParser from 'body-parser';


const app = express();
const PORT = process.env.PORT || 3000;

const server = createServer(app);
const io = connectToSocket(server);

app.use(express.json({ limit: "40kb" }));

//config part
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['POST', 'GET', 'DELETE', 'PUT'],
    credentials: true,
}));

app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use(bodyParser.json());

//userReoute

app.use("/users", userRoutes);

app.listen(PORT, () => {
    console.log("App is listing on port", PORT);
})

const URL = process.env.URL_MONGO;
const main = async () => {
    
    await mongoose.connect(`${URL}/Zoom`)
        .then(() => {
            console.log("connect ot database on Zoom");
        })

}
main();


app.get("/", (req, res) => {
    res.json({ massage: "Ok its working" });
})

