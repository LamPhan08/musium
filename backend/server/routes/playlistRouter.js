const express = require("express");
const Playlist = require('../controllers/playlistController');

const router = express.Router();

router.post('/createPlaylist', Playlist.createPlaylist);

router.delete('/deletePlaylist', Playlist.deletePlaylist);

router.get('/getUserPlaylists', Playlist.getUserPlaylists);

router.get('/getSpecificPlaylist', Playlist.getSpecificPlaylist);

router.post('/changePlaylistTitle', Playlist.changePlaylistTitle);

router.post('/addSongToPlaylist', Playlist.addSongToPlaylist);

router.delete('/removeSongFromPlaylist', Playlist.removeSongFromPlaylist)

module.exports = router
