const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const {
  authMiddleWare,
  userAuthMiddleware,
} = require("../middleware/authMiddleware");

router.post("/sign-up", UserController.createUser);
router.post("/sign-in", UserController.loginUser);
router.post("/sign-out", UserController.logoutUser);
router.get("/get-all", authMiddleWare, UserController.getAllUser);
router.get("/:id", userAuthMiddleware, UserController.getOneUser);
router.put("/update-user/:id", UserController.updateUser);
router.delete("/delete-user/:id", authMiddleWare, UserController.deleteUser);
// router.post("/refresh-token", UserController.verifyRefreshToken);

module.exports = router;
