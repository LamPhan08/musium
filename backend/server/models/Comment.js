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

            likes: [
                {
                    userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User',
                        required: true,
                        unique: true
                    }
                }
            ],

            createdAt: {
                type: Date,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Comment', Comment);