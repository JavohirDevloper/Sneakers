const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No Token, authorization denied!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(403).send("Token is not valid");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("You're not allowed to do that!");
    }
  });
};

const verifyTokenAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.body.user || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("You're not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("You're not allowed to do that!");
    }
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
};
