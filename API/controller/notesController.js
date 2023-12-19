const Notes = require("../models/Note");

exports.getNotes = async (req, res) => {
  try {
    const notes = await Notes.find().populate("createdBy", "fullname");
    res.send(notes);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error", error: e.message });
  }
};

exports.addNotes = async (req, res) => {
  try {
    const note = await Notes.create(req.body);
    res.send({ msg: "Note added", note });
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error", error: e.message });
  }
};

exports.updateNotes = async (req, res) => {
  const id = req.params.id;
  const updatedNote = await Notes.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  );
  res.send({ msg: "Note updated", updatedNote });
};

exports.deleteNotes = async (req, res) => {
  const id = req.params.id;
  const deletedNote = await Notes.findByIdAndDelete(id);
  res.send({ msg: "Note deleted", deletedNote });
};
