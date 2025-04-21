// app.js
import { Server } from "socket.io";
import { createServer } from "http";
import socketHandler from './sockets/index.js';
import mongoose from 'mongoose';
import { config } from "dotenv";

config();

const PORT = 3006;
const MONGODB_URI = process.env.MONGODB_URI; // Replace with your actual connection string

const httpServer = createServer((req, res) => {
    // manual cors headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    res.writeHead(404);
    res.end('Not Found');
});

async function startSocketServer() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB using Mongoose');

        const io = new Server(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });

        io.on('connection', (socket) => {
            socketHandler(socket, io);
        });

        httpServer.listen(PORT, () => {
            console.log(`The socket server for Collab-Sphere: ` + PORT);
        });

    } catch (error) {
        console.error('Failed to connect to MongoDB using Mongoose:', error);
    }
}

startSocketServer();