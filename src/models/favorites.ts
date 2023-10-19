import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
    githubId: {
        type: String,
        required: true
    },
    repositoryName: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: false
    },
    createdDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

export const Favorite = mongoose.model('Favorite', favoriteSchema);
