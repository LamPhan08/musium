const express = require("express");
const Explore = require('../controllers/exploreController');

const router = express.Router();

router.get('/explore', Explore.getExplore);

module.exports = router;
