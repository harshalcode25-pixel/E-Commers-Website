// import express from "express";
// import userRoute from "./routes/userRoute.js";
// import productRoute from "./routes/productRoute.js";


// const app = express();

// app.use(express.json());
// app.use("/api/users", userRoute);
// app.use("/api/products", productRoute);

// export default app;

const express = require("express");
const cookie = require("cookie-parser");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");

const app= express();
app.use(cookie());


app.use(express.json());
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);



module.exports = app;
