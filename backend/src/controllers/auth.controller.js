// const User = require("../models/usermodel");
// const { getToken, hashPassword, passwordsMatch } = require("../middlewares/auth.middleware");

// async function signin(req, res) {
//     try {
//         const user = await User.findOne({ email: req.body.email });
//         if (!user || !passwordsMatch(req.body.password, user.password)) {
//             return res.status(401).send({ message: "Invalid Email or Password." });
//         }

//         if (!user.password.startsWith("scrypt$")) {
//             user.password = hashPassword(req.body.password);
//             await user.save();
//         }

//         return res.send({
//             _id: user.id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin,
//             token: getToken(user)
//         });
//     } catch {
//         return res.status(500).send({ message: "Unable to sign in." });
//     }
// }

// async function register(req, res) {
//     if (!req.body.name || !req.body.email || !req.body.password) {
//         return res.status(400).send({ message: "Name, email and password are required." });
//     }

//     try {
//         const user = await User.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: hashPassword(req.body.password)
//         });
//         return res.status(201).send({
//             _id: user.id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin,
//             token: getToken(user)
//         });
//     } catch (error) {
//         if (error.code === 11000) {
//             return res.status(409).send({ message: "Email is already registered." });
//         }
//         return res.status(400).send({ message: "Invalid user data." });
//     }
// }

// async function getUserProfile(req, res) {
//     return res.send({ _id: req.user._id, name: req.user.name, email: req.user.email, isAdmin: req.user.isAdmin });
// }

// module.exports = { signin, register, getUserProfile };

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
        { id: user._id }
        , process.env.JWT_SECRET
    );

    res.cookie("token", token)

    return res.status(201).send({
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password
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
    { id: user._id },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(200).send({
    user: {
      _id: user.id,
      name: user.name,
      email: user.email
    },
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
