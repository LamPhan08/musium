const Comment = require('../models/Comment')

const postComment = async (req, res) => {
    try {
        const { songId, userId, username, avatar, content } = req.body;

        if (!songId || !userId || !username || !avatar || !content) {
            return res.status(400).json({ error: 'Missing parameter' });
        }

        let commentData = await Comment.findOne({encodeId: songId})

        if (!commentData) {
            commentData = new Comment({
                encodeId: songId,
                comments: []
            })
        }

        commentData.comments.push({
            userId,
            username,
            avatar,
            content
        })

        await commentData.save();

        res.json({
            success: true,
            message: 'Comment posted successfully!'
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error posting comment',
            error: err.message
        });
    }
}

const deleteComment = async (req, res) => {
    try {
        const { songId, commentId } = req.body

        if (!songId || !commentId) {
            return res.status(400).json({ error: 'Missing parameter' });
        }

        const result = await Comment.updateOne(
            {
                encodeId: songId,
            },

            {
                $pull: {
                    comments: {
                        _id: commentId
                    }
                }
            }
        )

        if (result.modifiedCount > 0) {
            return res.json({ message: 'Comment deleted successfully!' });
        } else {
            return res.status(404).json({ error: 'Comment not found!' });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error deleting comment',
            error: err.message
        });

    }
}

const getSongComments = async (req, res) => {
    try {
        const {songId} = req.query

        if (!songId) {
            return res.status(400).json({ error: 'Missing parameter' });
        }

        let comments = await Comment.findOne({encodeId: songId})

        if (!comments) {
            return res.json(undefined)
        }

        res.json(comments)
    }
    catch (err) {
        // console.error('Error in getFavoriteSongs:', err);

        res.status(500).json({ error: 'Internal server error' });
    }
}

const likeComment = async (req, res) => {
    try {
        const { songId, commentId } = req.body

        if (!songId || !commentId) {
            return res.status(400).json({ error: 'Missing parameter' });
        }

        const result = await Comment.updateOne(
            {
                encodeId: songId,
                comments: {
                    $elemMatch: {
                        _id: commentId
                    }
                }
            },

            {
                $inc: {
                    'comments.$.likes': 1
                }
            }
        )

        if (result.modifiedCount > 0) {
            return res.json({ message: 'Likes increased successfully!' });
        } else {
            return res.status(404).json({ error: 'Likes is not increeased!' });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error like comment',
            error: err.message
        });

    }
}

const unLikeComment = async (req, res) => {
    try {
        const { songId, commentId } = req.body

        if (!songId || !commentId) {
            return res.status(400).json({ error: 'Missing parameter' });
        }

        const result = await Comment.updateOne(
            {
                encodeId: songId,
                comments: {
                    $elemMatch: {
                        _id: commentId
                    }
                }
            },

            {
                $inc: {
                    'comments.$.likes': -1
                }
            }
        )

        if (result.modifiedCount > 0) {
            return res.json({ message: 'Likes decreased successfully!' });
        } else {
            return res.status(404).json({ error: 'Likes is not decreeased!' });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error unlike comment',
            error: err.message
        });

    }
}

module.exports = {
    postComment,
    deleteComment,
    getSongComments,
    likeComment,
    unLikeComment
};