const mongoose = require("mongoose");
const {isEmail} =require("validator");
const bcrypt = require('bcrypt');
const UserSchema = mongoose.Schema({
    email:{
        type: String,
        required: [true, "Je bent vergeten een email adres in te vullen"],
        unique:true,
        lowercase:true,
        validate:[isEmail, "Vul een geldig email adres in"]
    },
    password:{
        type: String,
        required: [true, "Je bent vergeten een wachtwoord in te vullen"],
        minlength: [5,"Zorg dat het wachtwoord minimaal 5 tekens bevat"]
    },
    points:{
        type: Number,
        required:true,
        default: 0,
    },
    photo:{
        type: String
    },
    active:{
        type: Boolean,
        default: false
    },
   
    collectedPointsInPath:[{
        path: {type: mongoose.Schema.Types.ObjectId, ref: 'Path', required: true},
        point:[{type: mongoose.Schema.Types.ObjectId, ref: 'Point', required: true}]
    }],
    userCreated :{
        type: String,
        default: Date.now
    }
});

//after saved to db
UserSchema.post('save',function(doc,next){
    console.log('new user was created en saved',doc)
    next();
});

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    console.log('user about to be created',this)
    next();
})

UserSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
        const auth =await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('verkeerd wachtwoord')
    }
    throw Error('verkeerde email');
}

module.exports = mongoose.model("user",UserSchema);