const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    encodeId: {
        type: String,
        required: true,
        unique: true
    },

    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
                unique: true
            },

            username: {
                type: String,
                required: true
            },

            avatar: {
                type: String,
                required: true
            },

            content: {
                type: String,
                required: true
            },

            likes: {
                type: Number,
                default: 0,
                required: true
            },

            createdAt: {
                type: Date,
                default: Date.now,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Comment', Comment);