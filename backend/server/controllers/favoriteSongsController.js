const FavoriteSongs = require('../models/FavoriteSongs')

const addToFavorites = async (req, res) => {
    try {
        const {userId, song} = req.body;
        console.log(userId, song)

        let favoriteSongs = await FavoriteSongs.findOne({userId})

        if (!favoriteSongs) {
            favoriteSongs = new FavoriteSongs({userId, songs: []});
        }

        favoriteSongs.songs.push(song);

        await favoriteSongs.save();

        res.json({ 
            success: true,
            message: 'Favorite songs added successfully!' 
        });
    }
    catch (err) {
        res.status(500).json({ 
            success: false,
            message: 'Error adding favorite songs', 
            error: err.message 
        });

    }
}

const removeFromFavorites = async (req, res) => {
    try {
        const {userId, songId} = req.body
        
        if (!userId || !songId) {
            return res.status(400).json({ error: 'Missing userId or songId parameter' });
        }

        const result = await FavoriteSongs.updateOne(
            {userId},
            {$pull: {
                songs: {
                    encodeId: songId
                }
            }}
        )

        if (result.modifiedCount > 0) {
            return res.json({ message: 'Song removed from favorites successfully' });
        } else {
            return res.status(404).json({ error: 'Song not found in favorites' });
        }
    }
    catch (err) {
        console.error('Error in removeFromFavorites:', err);
        return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
}

const getFavoriteSongs = async (req, res) => {
    try {
        const {userId} = req.query

        if (!userId) {
            return res.status(400).json({ error: 'Missing userId parameter' });
        }

        let favoriteSongs = await FavoriteSongs.findOne({userId})

        if (!favoriteSongs) {
            return res.json([])
        }

        res.json(favoriteSongs)
    }
    catch (err) {
        console.error('Error in getFavoriteSongs:', err);

        res.status(500).json({ error: 'Internal server error' });
    }
}   

module.exports = { addToFavorites, removeFromFavorites, getFavoriteSongs };
