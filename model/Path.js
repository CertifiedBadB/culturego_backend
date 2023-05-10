const mongoose = require("mongoose");
const LocationSchema = require("./schema/Location")


const PathSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    photo:{
        type: String
    },
    points:[{type: mongoose.Schema.Types.ObjectId, ref: 'Point', required: true}]
    ,
    location: {
        type: LocationSchema,
        required: true
      },
    date :{
        type: String,
        default: Date.now
    }
})

PathSchema.index({ location: "2dsphere" }); 
module.exports = mongoose.model("Path",PathSchema);