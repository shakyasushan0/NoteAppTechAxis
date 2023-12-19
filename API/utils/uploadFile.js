const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const uploadedFile = Date.now() + "-" + file.originalname;
    req.imageUrl = `http://localhost:${process.env.PORT}/images/${uploadedFile}`;
    cb(null, uploadedFile);
  },
});

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/.(jpg|jpeg|png|gif)$/)) {
    cb(new Error("Only image file accepted"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
