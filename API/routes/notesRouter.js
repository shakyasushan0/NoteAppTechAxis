const express = require("express");
const {
  getNotes,
  addNotes,
  updateNotes,
  deleteNotes,
  getMyNotes,
  getPublicNotes,
} = require("../controller/notesController");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", getNotes);
router.get("/mynotes", auth, getMyNotes);
router.get("/public", getPublicNotes);
router.post("/", auth, addNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);

module.exports = router;
