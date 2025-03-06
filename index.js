import express from "express";
import http from "http";
import { Server } from "socket.io";
import { LocationServices } from "./Controllers/LocationController.js";
import config from "./config.js";
import router from "./Routes/routes.js";

const app = express();
const server = http.createServer(app); // ✅ Correctly create HTTP Server

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(express.static("public")); // ✅ Serve static files
app.set("view engine", "ejs");

app.use(express.json());
app.use("/api", router);

// WebSocket Handling
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    
    if (LocationServices.handleSocketConnection) {
        LocationServices.handleSocketConnection(socket, io);
    } else {
        console.error("❌ Error: handleSocketConnection function is missing in LocationServices.");
    }
});

// ✅ Correctly start server
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
