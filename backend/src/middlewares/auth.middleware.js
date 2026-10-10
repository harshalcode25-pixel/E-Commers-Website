const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.startsWith("Bearer ")
        ? authorization.slice(7)
        : req.cookies?.token;

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

    const authorization = req.headers.authorization;
    const token = authorization?.startsWith("Bearer ")
        ? authorization.slice(7)
        : req.cookies?.token;

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
