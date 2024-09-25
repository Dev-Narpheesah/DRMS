const express = require("express");
const {
  registerUser,
  getAllUsers,
  getUser,
  updateUserProfile,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register-user", registerUser);
router.get("/", getAllUsers);
router.get("/:_id", getUser);
router.patch("/:_id", updateUserProfile);

router.delete("/delete-user/:_id", deleteUser);

module.exports = router;
