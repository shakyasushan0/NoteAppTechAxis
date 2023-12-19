const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  text: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Note", noteSchema);
