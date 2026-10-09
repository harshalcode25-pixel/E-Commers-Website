const mongoose = require("mongoose");

async function connectDB() {
    const mongodbUrl = process.env.MONGODB_URL;
    if (!mongodbUrl) {
        throw new Error("MONGODB_URL is not set. Add it to backend/.env.");
    }

    await mongoose.connect(mongodbUrl);
    console.log("MongoDB connected");
}

module.exports = connectDB;
