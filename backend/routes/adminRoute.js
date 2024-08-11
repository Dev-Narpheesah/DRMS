const express = require('express');
const { registerAdmin, loginAdmin, getTotalUsers } = require('../controllers/adminController');

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/total-users', getTotalUsers);  // Add this line

module.exports = router;
