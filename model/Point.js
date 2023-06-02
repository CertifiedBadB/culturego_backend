const mongoose = require("mongoose");
const QuestionSchema = require("./schema/Question")
const LocationSchema = require("./schema/Location")

const PointSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    question: {
        type: QuestionSchema,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    photo:{
        type: String
    },
     location: {
        type: LocationSchema,
        required: true
  },
    value:{
        type: Number,
        required: true,
        default: 1
    },
    date :{//
        type: String,
        default: Date.now
    }
})

PointSchema.index({ location: "2dsphere" }); 

module.exports = mongoose.model("Point",PointSchema);