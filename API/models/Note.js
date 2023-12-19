const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  text: String,
  isPublic: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Note", noteSchema);
