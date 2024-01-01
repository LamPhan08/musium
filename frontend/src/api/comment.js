import { mongoAPI } from "../axios/axios";

export const postComment = async (songId, userId, username, avatar, content, timestamp) => {
    try {
        await mongoAPI.post('/postComment', {
            songId,
            userId,
            username,
            avatar,
            content,
            timestamp
        })
    }
    catch (err) {
        console.log(err.response.data)
    }
}

export const deleteComment = async (songId, commentId) => {
    try {
        await mongoAPI.delete('/deleteComment', {
            data: {
                songId,
                commentId
            }
        })
    }
    catch (err) {
        console.log(err.response.data)
    }
}

export const getSongComments = async (songId) => {
    try {
        const response = await mongoAPI.get('/getSongComments', {
            params: {
                songId: songId
            }
        })

        // console.log(response)

        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

export const likeComment = async (songId, commentId, userId) => {
    try {
        await mongoAPI.post('/likeComment', {
            songId,
            commentId,
            userId
        })
    }
    catch (err) {
        console.log(err.response.data)
    }
}

export const unLikeComment = async (songId, commentId, userId) => {
    try {
        await mongoAPI.delete('/unLikeComment', {
            data: {
                songId,
                commentId,
                userId
            }
        })
    }
    catch (err) {
        console.log(err.response.data)
    }
}
