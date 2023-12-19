const express = require("express");
const {
  getNotes,
  addNotes,
  updateNotes,
  deleteNotes,
} = require("../controller/notesController");
const router = express.Router();

router.get("/", getNotes);
router.post("/", addNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);

module.exports = router;
