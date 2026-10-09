// const app = require("./src/app");
// const connectDB = require("./src/db/db");
// const dotenv = require("dotenv");
// const express = require("express");
// const path = require("path");
// dotenv.config({ path: path.resolve(__dirname, ".env") });

// // Refuse to start without the secret used to sign login tokens.
// if (!process.env.JWT_SECRET) {
//     throw new Error("JWT_SECRET is not set in the environment.");
// }

// const PORT = process.env.PORT || 5000;

// // In production, Express serves the built React app from frontend/build.
// if (process.env.NODE_ENV === "production") {
//     const buildPath = path.resolve(__dirname, "..", "frontend", "build");
//     app.use(express.static(buildPath));

//     app.get("*", (req, res) => {
//         res.sendFile(path.join(buildPath, "index.html"));
//     });
// }

// const startServer = async () => {
//     try {
//         // Connect to MongoDB before accepting API requests.
//         await connectDB();

//         app.listen(PORT, () =>
//             console.log(
//                 "************************************************** \n The Server has started at : http://localhost:5000"
//             )
//         );
//     } catch (error) {
//         console.error("MongoDB connection failed:", error.message);
//         process.exit(1);
//     }
// };

// startServer();

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const app = require("./src/app");
const connectDB = require("./src/db/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exitCode = 1;
    }
}

startServer();
