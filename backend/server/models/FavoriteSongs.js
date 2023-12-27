const mongoose = require('mongoose');

const favoriteSongsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },

    songs: [
        {
            encodeId: {
                type: String,
                required: true,
                unique: true
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
});

module.exports = mongoose.model('FavoriteSongs', favoriteSongsSchema);