const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    starttime: {
        type: Date,

    },
    endtime: {
        type: Date,

    },
    photo: {
        data: Buffer,
        contentType: String
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    likes: [{type: ObjectId, ref: "User"}],
    
    comments: [{
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: { type: ObjectId, ref: "User" }
    }]
});
module.exports = mongoose.model("Event", eventSchema);
