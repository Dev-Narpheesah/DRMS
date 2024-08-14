// const express = require('express');
// const router = express.Router();
// const User = require('../models/UserModel');
// const Task = require('../models/TaskModel');
// const Message = require('../models/MessageModel');
// const Disaster = require('../models/DisasterModel')

// // Get user count
// router.get('/user-count', async (req, res) => {
//     try {
//         const userCount = await User.countDocuments();
//         res.json({ userCount });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Get overview data
// router.get('/overview', (req, res) => {
//     res.json({
//         status: 'Active',
//         affectedAreas: 10,
//         reliefCenters: 5,
//     });
// });

// // Get tasks
// router.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find();
//         res.json(tasks);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Get messages
// router.get('/messages', async (req, res) => {
//     try {
//         const messages = await Message.find();
//         res.json(messages);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Get user profile
// router.get('/profile', async (req, res) => {
//     try {
//         // Assuming there's only one user for simplicity
//         const user = await User.findOne();
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// router.get('/disasters', async (req, res) => {
//     const disasters = await Disaster.find().sort({ timestamp: -1 });
//     res.json(disasters)
// })

// router.post('/disasters', async (req, res) => {
//     const { location, description } = req.body;
//     const disaster = new Disaster({ location, description });
//     await disaster.save();
//     res.json(disaster);
// })

// module.exports = router;

const express = require('express');
const router = express.Router();

const  {
    registerUser,
    getAllUsers,
    getUser,
    updateUserProfile,
    deleteUser,
  } = ('../controllers/userController')

router.post('/register-user', registerUser)
router.get('/', getAllUsers)
router.get('/:_id', getUser)
router.patch('/:_id', updateUserProfile)
router.delete('/:_id', deleteUser)


module.exports = router;
