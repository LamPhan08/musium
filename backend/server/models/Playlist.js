const mongoose = require('mongoose');

const Playlist = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },

    playlists: [
        {
            creator: {
                type: String,
                required: true
            },

            playlistId: {
                type: String,
                required: true
            },

            title: {
                type: String,
                required: true
            },

            songs: [
                {
                    encodeId: {
                        type: String,
                        required: true,
                    },
        
                    title: {
                        type: String,
                        required: true
                    },
        
                    thumbnailM: {
                        type: String,
                        required: true
                    },
        
                    artistsNames: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ],
});

module.exports = mongoose.model('Playlist', Playlist);