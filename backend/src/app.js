const express = require("express");
const cookie = require("cookie-parser");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");

const app= express();
app.use(cookie());


app.use(express.json());
app.use(express.static("publicDir"))

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);



module.exports = app;
