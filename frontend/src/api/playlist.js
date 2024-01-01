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

export const addPlaylistToProfile = async (userId, title, songs, playlistId) => {
    console.log(playlistId)
    try {
        await mongoAPI.post('/addPlaylistToProfile', {
            userId,
            title,
            songs,
            playlistId
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

export const changePlaylistTitle = async (userId, playlistId, title) => {
    try {
        await mongoAPI.post('/changePlaylistTitle', {
            userId: userId,
            playlistId: playlistId,
            title: title
        })
    }
    catch (err) {
        console.log(err.response.data)
    }
}

export const getSpecificPlaylist = async (userId, playlistId) => {
    try {
        const response = await mongoAPI.get('/getSpecificPlaylist', {
            params: {
                userId: userId,
                playlistId: playlistId
            }
        })

        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

export const addSongToPlaylist = async (userId, song, playlistId) => {
    try {
        await mongoAPI.post('/addSongToPlaylist', {
            userId,
            song,
            playlistId
        })
    }
    catch (err) {
        console.log(err.response.data)
    }
}

export const removeSongFromPlaylist = async (userId, songId, playlistId) => {
    try {
        await mongoAPI.delete('/removeSongFromPlaylist', {
            data: {
                userId: userId,
                songId: songId,
                playlistId: playlistId
            }
        })

    }
    catch (err) {
        console.log(err.response.data)
    }
}

export const removePlaylistFromProfile = async (userId, playlistId) => {
    try {
        await mongoAPI.delete('/removePlaylistFromProfile', {
            data: {
                userId: userId,
                playlistId: playlistId
            }
        })

    }
    catch (err) {
        console.log(err.response.data)
    }
}

