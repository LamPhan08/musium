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
        console.log(err)
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