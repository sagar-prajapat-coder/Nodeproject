let users = {}; // Store user locations

export const LocationServices = {
    // Home Page Render
    renderHomePage: (req, res) => {
        res.render("index");
    },

    // Handle WebSocket Connections
    handleSocketConnection: (socket, io) => {
        console.log("User connected:", socket.id);

        socket.on("updateLocation", (data) => {
            users[socket.id] = data;
            io.emit("locationUpdate", users);
        });

        socket.on("disconnect", () => {
            delete users[socket.id];
            io.emit("locationUpdate", users);
            console.log("User disconnected:", socket.id);
        });
    },

    // Create User API
    createUser: async (req, res) => {
        try {
            return res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            console.error("Error creating user:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
 