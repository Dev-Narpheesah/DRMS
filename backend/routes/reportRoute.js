require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Data = require('../models/DataModel'); // Ensure the path to DataModel is correct

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/report', async (req, res) => {
    const { name, email, message } = req.body;
    
    try {
        // Check if the message already exists
        let data = await Data.findOne({ message });

        if (data) {
            return res.status(200).json({ msg: 'Data already submitted' });
        }

        // Create a new Data instance
        data = new Data({ name, email, message });

        // Save the data to the database
        await data.save();

        return res.status(201).json({ msg: 'Data submitted successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/user-count", async (req, res) => {
    try {
        const userCount = await Data.countDocuments();
        return res.status(200).json({ userCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
} )

// const getUserCount = async (req, res) => {
  
// };

module.exports = router;
