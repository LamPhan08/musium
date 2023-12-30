import { mongoAPI } from "../axios/axios";

export const createPlaylist = async (userId, title, username) => {
    try {
        await mongoAPI.post('/createPlaylist', {
            userId,
            title,
            username
        })
    }
    catch (err) {
        console.log(err.response.data)
    }
}

export const getUserPlaylists = async (userId) => {
    try {
        const response = await mongoAPI.get('/getUserPlaylists', {
            params: {
                userId: userId
            }
        })

        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

export const deletePlaylist = async (userId, playlistId) => {
    try {
        await mongoAPI.delete('/deletePlaylist', {
            data: {
                userId: userId,
                playlistId: playlistId
            }
        })

    }
    catch (err) {
        console.log(err)
    }
}

