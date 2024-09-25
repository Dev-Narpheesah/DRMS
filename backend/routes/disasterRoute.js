const express = require('express');
const  {createDisasterReport, getAllDisasterReports} = require('../controllers/disasterController');
const multer = require('multer');

const router = express.Router();

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Disaster report route
router.post('/report', upload.single('userImage'), createDisasterReport);
router.get('/',  getAllDisasterReports);

module.exports = router;
