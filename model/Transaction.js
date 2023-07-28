const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
    points:{
        type: Number,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' ,
        required: true
    }
})

module.exports = mongoose.model("Transaction",TransactionSchema);