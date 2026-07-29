const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("TOKEN:", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultsecretkey",
    );

    console.log(decoded);

    req.user = decoded;

    next();
  } catch (err) {
    console.log(err.message);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = verifyToken;
