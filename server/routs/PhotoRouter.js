const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const controller = require('../controllers/PhotoController');
const { log } = require('console');

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const photographerID = req.params.id;
console.log(photographerID);
    if (!photographerID) {
      return cb(new Error('Missing photographer ID in request'));
    }

    const uploadPath = path.join(__dirname, '..', 'uploads', photographerID.toString());

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
// Route for uploading a photo
router.post("/:id", upload.single('photo'), async (req, res) => {
  console.log(req.file);
  const photographerID = req.params.id;
  const photoPath = path.join('uploads', photographerID.toString(), req.file.filename);
  const date = new Date();

  const data = {
    photographerID: photographerID,
    photo: photoPath,
    date: date
  };

  try {
    const result = await controller.createPhoto(data);
    console.log("ROUTER-PHOTO"+JSON.stringify(req.file.filename));
    res.json(result);
  } catch (err) {
    console.error("Error creating photo:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Route for fetching photos
router.get("/", async (req, res) => {
  try {
    const gallery = await controller.getPhotos();
    res.status(200).send(gallery);
  } catch (err) {
    console.error("Error fetching photos:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Route for deleting a photo
router.delete("/:id", async (req, res) => {
  const photoId = req.params.id;
  try {
    const result = await controller.deletePhoto(photoId);
    res.status(200).send(result);
  } catch (err) {
    console.error("Error deleting photo:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
