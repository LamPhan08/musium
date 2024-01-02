const Playlist = require('../models/Playlist');

const createPlaylist = async (req, res) => {
    try {
        const { userId, title, username } = req.body;

        if (!userId || !title || !username) {
            return res.status(400).json({ error: 'Missing parameter' });
        }

        let playlistData = await Playlist.findOne({userId})

        if (!playlistData) {
            playlistData = new Playlist({
                userId,
                playlists: []
            })
        }

        playlistData.playlists.push({
            creator: username,
            title: title,
            playlistId: 'none',
            songs: []
        })


        await playlistData.save()

        res.json({ 
            success: true,
            message: 'Playlist created successfully!' 
        });

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error creating playlist',
            error: err.message
        });
    }
}

const addPlaylistToProfile = async (req, res) => {
    try {
        const { userId, title, songs, playlistId } = req.body;

        if (!userId || !title || !songs || !playlistId) {
            return res.status(400).json({ error: 'Missing parameter' });
        }

        let playlistData = await Playlist.findOne({userId})

        if (!playlistData) {
            playlistData = new Playlist({
                userId,
                playlists: []
            })
        }

        playlistData.playlists.push({
            creator: 'musium',
            playlistId: playlistId,
            title: title,
            songs: songs,

        })


        await playlistData.save()

        res.json({ 
            success: true,
            message: 'Playlist added successfully!' 
        });

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error adding playlist',
            error: err.message
        });
    }
}

const removePlaylistFromProfile = async (req, res) => {
    try {
        const { userId, playlistId } = req.body;

        if (!userId || !playlistId) {
            return res.status(400).json({ error: 'Missing parameter' });
        }

        const result = await Playlist.updateOne(
            {
                userId,
            },

            {
                $pull: {
                    playlists: { playlistId: playlistId }
                }
            }
        )

        if (result.modifiedCount > 0) {
            return res.json({ message: 'Playlist deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Playlist is not deleted' });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error deleting playlist',
            error: err.message
        });
    }
}

const deletePlaylist = async (req, res) => {
    try {
        const { userId, playlistId } = req.body;

        if (!userId || !playlistId) {
            return res.status(400).json({ error: 'Missing parameter' });
        }

        const result = await Playlist.updateOne(
            {
                userId,
            },

            {
                $pull: {
                    playlists: { _id: playlistId }
                }
            }
        )

        if (result.modifiedCount > 0) {
            return res.json({ message: 'Playlist deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Playlist is not deleted' });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error deleting playlist',
            error: err.message
        });
    }
}

const getUserPlaylists = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'Missing parameter'});
        }

        let playlistData = await Playlist.findOne({userId})

        if (!playlistData) {
            return res.json([])
        }

        res.json(playlistData);

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error creating playlist',
            error: err.message
        });
    }
}

const changePlaylistTitle = async (req, res) => {
    try {
        const { userId, playlistId, title } = req.body;

        if (!userId || !playlistId || !title) {
            return res.status(400).json({ error: 'Missing parameter' });
        }

        const result = await Playlist.updateOne(
            {
                userId,
                playlists: {
                    $elemMatch: {
                        _id: playlistId
                    }
                }
            },

            {
                $set: {
                    'playlists.$.title': title
                }
            }
        )

        if (result.modifiedCount > 0) {
            return res.json({ message: 'Playlist title changed successfully' });
        } else {
            return res.status(404).json({ error: 'Playlist title is not changed' });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error deleting playlist',
            error: err.message
        });
    }
}

const getSpecificPlaylist = async (req, res) => {
    try {
        const { userId, playlistId } = req.query;

        if (!userId || !playlistId) {
            return res.status(400).json({ error: 'Missing parameter' });
        }

        let playlistData = await Playlist.findOne(
            {userId},
            {playlists: {
                $elemMatch: {
                    _id: playlistId
                }
            }}
        )

        if (!playlistData) {
            return res.json('Playlist not found!')
        }

        res.json(playlistData.playlists[0]);

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error creating playlist',
            error: err.message
        });
    }
}

const addSongToPlaylist = async (req, res) => {
    try {
        const { userId, song, playlistId } = req.body;

        if (!userId || !song || !playlistId) {
            return res.status(400).json({ error: 'Missing parameter' });
        }

        const existingSong = await Playlist.findOne({
            userId,
            playlists: {
                $elemMatch: {
                    _id: playlistId,
                    songs: { 
                        $elemMatch: { 
                            encodeId: song.encodeId
                        } 
                    }
                  }
            }
        })

        if (existingSong) {
            return res.status(400).json({ error: 'Song already exists in the playlist' });
        }

        const result = await Playlist.updateOne(
            {
                userId,
                playlists: {
                    $elemMatch: {
                        _id: playlistId
                    }
                }
            },

            {
                $push: {
                    'playlists.$.songs': song
                }
            }
        )

        if (result.modifiedCount > 0) {
            return res.json({ message: 'Song added to playlist successfully' });
        } else {
            return res.status(404).json({ error: 'Song is not added in playlist' });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error adding song to playlist',
            error: err.message
        });
    }
}

const removeSongFromPlaylist = async (req, res) => {
    try {
        const { userId, songId, playlistId } = req.body

        if (!userId || !songId || !playlistId) {
            return res.status(400).json({ error: 'Missing parameter' });
        }

        const result = await Playlist.updateOne(
            {
                userId,
                playlists: {
                    $elemMatch: {
                        _id: playlistId
                    }
                }
            },

            {
                $pull: {
                    'playlists.$.songs': {
                        encodeId: songId
                    }
                }
            }
        )

        if (result.modifiedCount > 0) {
            return res.json({ message: 'Song removed from playlist successfully' });
        } else {
            return res.status(404).json({ error: 'Song not found in playlist' });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error removing song from playlist',
            error: err.message
        });

    }
}

module.exports = {
    createPlaylist,
    deletePlaylist,
    getUserPlaylists,
    getSpecificPlaylist,
    changePlaylistTitle,
    addSongToPlaylist,
    removeSongFromPlaylist,
    addPlaylistToProfile,
    removePlaylistFromProfile
}

