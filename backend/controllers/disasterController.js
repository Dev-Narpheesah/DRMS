const DisasterReport = require('../models/DisasterReport');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

const upload = multer({ storage });

// Create a new disaster report
const createDisasterReport = async (req, res) => {
  try {
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req);

    const report = new DisasterReport({
      ...req.body,
      userImage: result.secure_url, // Store the image URL from Cloudinary
    });

    await report.save();
    res.status(201).json({ message: 'Disaster report created successfully', disasterReport: report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create disaster report' });
  }
};

// Get all disaster reports
const getAllDisasterReports = async (req, res) => {
  try {
    const reports = await DisasterReport.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch disaster reports' });
  }
};

// Get a single disaster report by ID
const getDisasterReportById = async (req, res) => {
  try {
    const report = await DisasterReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: 'Disaster report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch disaster report' });
  }
};

// Update a disaster report
const updateDisasterReport = async (req, res) => {
  try {
    const updatedReport = await DisasterReport.findByIdAndUpdate(
      req.params.id,
      { ...req.body, userImage: req.file ? req.file.path : req.body.userImage }, // Update image if a new one is uploaded
      { new: true }
    );
    if (!updatedReport) {
      return res.status(404).json({ error: 'Disaster report not found' });
    }
    res.status(200).json({ message: 'Disaster report updated successfully', disasterReport: updatedReport });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update disaster report' });
  }
};

// Delete a disaster report
const deleteDisasterReport = async (req, res) => {
  try {
    const deletedReport = await DisasterReport.findByIdAndDelete(req.params.id);
    if (!deletedReport) {
      return res.status(404).json({ error: 'Disaster report not found' });
    }
    res.status(200).json({ message: 'Disaster report deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete disaster report' });
  }
};

module.exports = {
  createDisasterReport,
  getAllDisasterReports,
  getDisasterReportById,
  updateDisasterReport,
  deleteDisasterReport,
  upload
};




