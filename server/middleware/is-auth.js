const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers["auth-token"];
  if (!token) {
    return res.status(401).json({Message: 'Access Denied'});
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = verified.id;
    req.username = verified.username;
    req.role = verified.role;
    next();
  } catch(err) {
    return res.status(401).json({Message: 'Invalid Token'});
  }
};
