const mongoose = require("mongoose");

const MultiplayerSchema = mongoose.Schema({
    code:{
        type: String,
        required: true
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' ,
        required: true
    }],
    collectedPointsInPath:[{
        path: {type: mongoose.Schema.Types.ObjectId, ref: 'Path', required: true},
        points:[{type: mongoose.Schema.Types.ObjectId, ref: 'Point', required: true}]
    }],
})

module.exports = mongoose.model("Multiplayer",MultiplayerSchema);