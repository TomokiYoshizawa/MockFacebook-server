const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });

//img upload api
router.post("/", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File has been uploaded");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
