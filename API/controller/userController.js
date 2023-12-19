const bcrypt = require("bcryptjs");

const User = require("../models/User");
const createToken = require("../utils/createToken");

/**
 * 1. Check user email already registered
 * 2. Plain text pword -> hashed pword
 * 3. User data store
 */

// const signup = (req, res) => {
//   console.log("signup");
// };
const signup = async (req, res) => {
  const { fullname, email, password, imageUrl } = req.body;
  const user = await User.findOne({ email }); //User -> db.users
  if (user)
    return res
      .status(400)
      .send({ error: `User with email ${email} already registered` });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const registeredUser = await User.create({
    email,
    fullname,
    password: hashedPassword,
    imageUrl,
  });
  const token = createToken(registeredUser._id);
  res.send({ name: registeredUser.fullname,id: registeredUser._id, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send({ error: "Invalid Email" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const token = createToken(user._id);
    res.send({ name: user.fullname,id: user.id, token });
  } else {
    res.status(400).send({ error: "Invalid Password" });
  }
};

const updatePassword = async (req, res) => {
  const id = req.params.id;
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(id);
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) return res.status(400).send({ msg: "Invalid Pasword" });
  const salt = bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hash(newPassword, salt);
  await User.findByIdAndUpdate(id, { $set: { passowrd: hashedPassword } });
  res.send({ msg: "password updated" });
};

exports.signup = signup;
exports.login = login;
exports.updatePassword = updatePassword;
