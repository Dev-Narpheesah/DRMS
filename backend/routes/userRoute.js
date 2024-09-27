const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  updateUserProfile,
  deleteUser,
} = require("../controllers/userController");
const { protect, authorize } = require("../Middleware/authMiddleware");

const router = express.Router();
router.post("/login", loginUser);

router.post("/register-user", registerUser);


router.get("/", protect, authorize('admin'), getAllUsers);


router.get("/:id", protect, getUser);


router.patch("/:id", protect, authorize('admin', 'manager'), updateUserProfile);


router.delete("/delete-user/:id", protect, authorize('admin'), deleteUser);

module.exports = router;
