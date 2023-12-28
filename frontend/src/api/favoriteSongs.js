import { mongoAPI } from "../axios/axios"

export const addSongToFavorites = async (userId, song) => {
    // console.log(song)
    try {
        await mongoAPI.post('/addToFavorites', {
            userId,
            song
        })

    }
    catch (err) {
        console.log(err)
    }
}

export const getFavoriteSongs = async (userId) => {
    try {
        const response = await mongoAPI.get('/getFavoriteSongs', {
            params: {
                userId: userId
            }
        })

        // console.log(response)

        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

export const removeSongFromFavorites = async (userId, songId) => {
    try {
        await mongoAPI.delete('/removeFromFavorites', {
            data: {
                userId,
                songId
            }
        })
    }
    catch (err) {
        console.log(err.response.data)
    }
}