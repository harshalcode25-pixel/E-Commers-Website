const express = require("express");
const cookie = require("cookie-parser");
const path = require("node:path");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");

const app= express();
const publicDir = path.join(__dirname, "..", "public");
app.use(cookie());


app.use(express.json());
app.use(express.static(publicDir));

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

app.use("/api", (req, res) => {
    res.status(404).send({ message: "API route not found." });
});

app.get("*name", (req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
});


module.exports = app;
