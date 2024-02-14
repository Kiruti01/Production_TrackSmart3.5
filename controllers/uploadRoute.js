const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const cloudinary = require("../utils/cloudinary");

router.post("/upload", upload.single("image"), function (req, res) {
  console.log("req.file:", req.file);
  console.log("req.body:", req.body);
  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error uploading to Cloudinary",
      });
    }

    // Process successful upload
    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result,
    });
  });
});

module.exports = router;
