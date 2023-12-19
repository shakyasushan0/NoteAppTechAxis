const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //Bearer token
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ msg: "Jwt token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = _id;
    next();
  } catch (e) {
    res.status(401).send({ msg: "Invalid Token" });
  }
};
