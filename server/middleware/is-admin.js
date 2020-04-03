const jwt = require("jsonwebtoken");
const db = require("../config/db");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["auth-token"];

    const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
    const uid = verified.id;

    const checkRole = await db.users.findOne({
      where: {
        id: uid
      }
    });
    if (checkRole.role === "admin") {
      next();
    } else {
      throw "Unauthorized";
    }
  } catch (err) {
    return res.status(401).json({
      Error: err
    });
  }
};
