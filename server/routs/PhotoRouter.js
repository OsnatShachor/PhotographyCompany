const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const controller = require('../controllers/PhotoController');
 const authorizePhotographer = require('../middleware/authorizePhotographer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const photographerID = req.params.id;
    console.log(photographerID);
    if (!photographerID) {
      return cb(new Error('Missing photographer ID in request'));
    }

    const uploadPath = path.join(__dirname, '..', 'uploads', photographerID.toString());

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

router.post("/:id", [authorizePhotographer, upload.single('photo')], async (req, res) => {
  const photographerID = req.params.id;
  console.log(photographerID);
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
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log("GET PHOTOS");
    const gallery = await controller.getPhotos(req.params.id);
    res.status(200).send(gallery);
  } catch (err) {
    console.error("Error fetching photos:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.delete("/:id", authorizePhotographer, async (req, res) => {
  const photoId = req.params.id;
  try {
    const photo = await controller.getPhotoById(photoId);
    if (!photo) {
      return res.status(404).send({ error: "Photo not found" });
    }

    const filePath = path.join(__dirname, '..', photo.url_photo);
    fs.unlinkSync(filePath);

    const result = await controller.deletePhoto(photoId);
    res.status(200).send(result);
  } catch (err) {
    console.error("Error deleting photo:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});


module.exports = router;
