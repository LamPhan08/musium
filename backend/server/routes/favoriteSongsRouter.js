const express = require("express");
const FavoriteSongs = require('../controllers/favoriteSongsController');

const router = express.Router();

router.post('/addToFavorites', FavoriteSongs.addToFavorites);

router.delete('/removeFromFavorites', FavoriteSongs.removeFromFavorites);

router.get('/getFavoriteSongs', FavoriteSongs.getFavoriteSongs);

module.exports = router


