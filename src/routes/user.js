const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const middleware = require("../middleware");
const { runValidation, validationRegister, validationLogin } = require("../validation");


router.post("/register", validationRegister, runValidation, userController.registerUser);
router.post("/login", validationLogin, runValidation, userController.loginUser);

router.get("/user", middleware, userController.getSingleUser);

router.put("/forgotpassword", userController.forgotPassword);
router.put("/resetpassword", userController.resetPassword);

module.exports = router;
