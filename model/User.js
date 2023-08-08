const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const cron = require('node-cron');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Je bent vergeten een email adres in te vullen"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Vul een geldig email adres in"]
    },
    password: {
        type: String,
        required: [true, "Je bent vergeten een wachtwoord in te vullen"],
        minlength: [5, "Zorg dat het wachtwoord minimaal 5 tekens bevat"]
    },
    points: {
        type: Number,
        required: true,
        default: 0,
    },
    photo: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    },
    collectedPointsInPath: [{
        path: { type: mongoose.Schema.Types.ObjectId, ref: 'Path', required: true },
        point: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Point', required: true }]
    }],
    passwordReset: {
        token: {
            type: String,
            sparse: true,
        },
        expires: Date
    },
    userCreated: {
        type: String,
        default: Date.now
    }
});

UserSchema.post('save', function (doc, next) {
    console.log('new user was created en saved', doc);
    next();
});

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log('user about to be created', this);
    next();
});

UserSchema.methods.generatePasswordResetOTP = function () {
    const otp = otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false, alphabets: false });
    const expirationTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    this.passwordReset = {
        token: otp,
        expires: expirationTime,
    };
};

UserSchema.methods.isPasswordResetOTPValid = function () {
    return this.passwordReset && this.passwordReset.expires > Date.now();  // Check if passwordReset exists before checking expiration
};

// Background task to delete expired OTPs
const deleteExpiredOTPs = async () => {
    const expiredUsers = await User.find({
        $and: [
            { 'passwordReset.token': { $ne: null } }, // Check if token exists
            { 'passwordReset.expires': { $lt: Date.now() } }
        ]
    });

    for (const user of expiredUsers) {
        user.passwordReset = {
            token: null,
            expires: null,
        };
        await user.save();
    }
};

// Schedule the deleteExpiredOTPs task to run every minute
cron.schedule('* * * * *', deleteExpiredOTPs);

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('verkeerd wachtwoord');
    }
    throw Error('verkeerde email');
}

module.exports = mongoose.model("User", UserSchema);