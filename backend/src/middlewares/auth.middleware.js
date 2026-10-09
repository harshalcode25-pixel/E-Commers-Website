// const jwt = require("jsonwebtoken");
// const crypto = require("node:crypto");

// function hashPassword(password) {
//     // Save a random salt beside the password hash so plain passwords are never stored.
//     const salt = crypto.randomBytes(16).toString("hex");
//     const hash = crypto.scryptSync(password, salt, 64).toString("hex");
//     return `scrypt$${salt}$${hash}`;
// }

// function passwordsMatch(password, storedPassword) {
//     if (!storedPassword.startsWith("scrypt$")) return password === storedPassword;
//     const [, salt, storedHash] = storedPassword.split("$");
//     const suppliedHash = crypto.scryptSync(password, salt, 64).toString("hex");
//     const suppliedBuffer = Buffer.from(suppliedHash, "hex");
//     const storedBuffer = Buffer.from(storedHash, "hex");
//     return suppliedBuffer.length === storedBuffer.length && crypto.timingSafeEqual(suppliedBuffer, storedBuffer);
// }

// function getToken(user) {
//     // The token lets protected routes identify the signed-in user.
//     return jwt.sign({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "48h" });
// }

// function isAuth(req, res, next) {
//     const authorization = req.headers.authorization;
//     if (!authorization?.startsWith("Bearer ")) {
//         return res.status(401).send({ msg: "Token is not supplied." });
//     }

//     try {
//         req.user = jwt.verify(authorization.slice(7), process.env.JWT_SECRET);
//         return next();
//     } catch {
//         return res.status(401).send({ msg: "Invalid Token" });
//     }
// }

// function isAdmin(req, res, next) {
//     if (req.user?.isAdmin) return next();
//     return res.status(401).send({ msg: "Admin Token is not valid" });
// }

// module.exports = { hashPassword, passwordsMatch, getToken, isAuth, isAdmin };


const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).send({ msg: "unauthorized" });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        return res.status(401).send({ msg: "Invalid Token" });
    }
}

function isAdmin(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send({ msg: "unauthorized" });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin") {
            return res.status(403).send({ msg: "you are not an admin" });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).send({ msg: "Invalid Token" });
    }
}

module.exports = { isAuth, isAdmin };
