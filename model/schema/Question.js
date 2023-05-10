const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
    question:{
        type: String,
        required: true
    },
    photo:{
        type: String
    },
    //minimaal 1 slecht antwoord
    badAnswers: [{
        type: String,
        required:true}],
    goodAnswer:{
        type: String,
        required: true
    },
    value:{
        type: Number,
        required: true,
        default: 1
    },
    date :{
        type: String,
        default: Date.now
    }
})

module.exports = QuestionSchema;