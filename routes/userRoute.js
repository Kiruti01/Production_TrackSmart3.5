const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userController");

//router obj
const router = express.Router();

//routers
//POST || LOGINUSER
router.post("/login", loginController);

//POST ||  REGISTERUSER
router.post("/register", registerController);

module.exports = router;
