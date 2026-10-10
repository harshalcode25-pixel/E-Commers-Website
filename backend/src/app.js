const express = require("express");
const cookie = require("cookie-parser");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");

const app= express();
app.use(cookie());


app.use(express.json());
// The frontend is hosted on Vercel; this service only serves the API.
app.get("/", (req, res) => {
    res.status(200).json({ message: "E-Commerce API is running." });
});

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

app.use("/api", (req, res) => {
    res.status(404).send({ message: "API route not found." });
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found." });
});


module.exports = app;
