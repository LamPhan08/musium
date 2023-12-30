const express = require('express');
const userController = require("../controllers/userController");
const router = express.Router();

router.put("/updateprofile/:id", userController.updateprofile);
router.get("/getuser/:id",  userController.getuser);

module.exports = router;