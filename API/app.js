const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const notesRouter = require("./routes/notesRouter");
const cors = require('cors')
require("dotenv").config();

//initialize express app
const app = express();

//middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));


//routes
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
//establish mongodb connection mongodb://127.0.0.1:27017/notes
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to db"))
  .catch((e) => console.log(e.message));

app.listen(process.env.PORT, () => console.log("Server is running..."));
