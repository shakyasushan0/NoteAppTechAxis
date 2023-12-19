const jwt = require("jsonwebtoken");

module.exports = (_id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
  return token;
};
