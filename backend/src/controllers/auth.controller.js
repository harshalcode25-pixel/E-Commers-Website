const userModel = require("../models/usermodel");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function register(req, res) {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .send({ message: "Name, email and password are required." });
  }

  const { name, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(409).send({ message: "Email is already registered." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = JWT.sign(
        { id: user._id, role: user.role }
        , process.env.JWT_SECRET
    );

    res.cookie("token", token)

    return res.status(201).send({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
      console.log("Actual Error:", error.message);

    if (error.code === 11000) {
      return res.status(409).send({ message: "Email is already registered." });
    }

    return res.status(400).send({ message: "Invalid user data." });
  }
}



async function signin(req, res) {
   
  const { email, password} = req.body;
  
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).send({ message: "Invalid Email or Password." });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).send({ message: "Invalid Email or Password." });
  }

  const token = JWT.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(200).send({
    _id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
}

async function getUserProfile(req, res) {
  const user = await userModel.findById(req.user.id).select("name email role");

  if (!user) {
    return res.status(404).send({ message: "User not found." });
  }

  return res.status(200).send({
    _id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
}

module.exports = { signin, register, getUserProfile };
