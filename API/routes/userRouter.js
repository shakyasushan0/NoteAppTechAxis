const express = require("express");
const auth = require("../middleware/auth");
const {
  signup,
  login,
  updatePassword,
} = require("../controller/userController");
const upload = require("../utils/uploadFile");
const router = express.Router();

router.post("/signup", upload.single("image"), signup);
router.post("/login", login);
router.get("/", auth, (req, res) => {
  res.send("All users");
});
router.put("/:id", updatePassword);

module.exports = router;
