const User = require("../model/User");
const jwt = require('jsonwebtoken');
const axios = require('axios');
const MailingController = require('./mailingController')
//handleerrors
const handleErrors = (err) => {
  let errors = { email: '', password: '', photo: '' };

  if (err.message === 'verkeerde email') {
    errors.email = 'Ingevoerde gegevens kloppen niet.';
  }
  if (err.message === 'verkeerde wachtwoord') {
    errors.email = 'Ingevoerde gegevens kloppen niet.';
  }
  // Check for duplicate email error
  if (err.code === 11000 && err.keyPattern && err.keyPattern.email === 1) {
    errors.email = 'Dit email adres heeft al een account bij ons';
    return err;
  }
  // Validate errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return err;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:maxAge});
}


module.exports.signup_post = async (req, res) => {
  const { email, password, photo } = req.body;
  try {
    const user = await User.create({ email, password, photo });
    const token = createToken(user._id);
    await MailingController.welcome_postmail(email);
    res.status(201).json({ user: user._id });
  } catch (err) {
    console.error('Error:', err);
    const errors = handleErrors(err);
    res.status(400).json(errors + err);
  }
};




module.exports.login_post = async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.login(email,password);
        const token = createToken(user._id);
        res.status(200).json({user:user._id , token: token, points:user.points});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
};


module.exports.passwordRequest = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Check if the user already has a password reset token
    if (!user.passwordReset || !user.passwordReset.token) {
      user.generatePasswordResetOTP();
      const updatedUser = await user.save();
      MailingController.password_reset(email, updatedUser.passwordReset.token);
    } else {
      return res.json({ message: 'Password reset token already exists' });
    }
    return res.json({ message: 'Password reset token sent' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.passwordReset = async (req, res) => {
  const { email, token, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({email});
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Check if the OTP token is valid and not expired
    if (!user.passwordReset || !user.passwordReset.token || user.passwordReset.token !== token || !user.isPasswordResetOTPValid()) {
      return res.status(400).json({ error: 'Invalid or expired OTP token' });
    }
    user.password = newPassword;
    user.passwordReset = undefined;
    await user.save();
    return res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    return res.status(500).json({ error: 'An error occurred' });
  }
};


module.exports.getByIdAndUpdatePoints = async (req, res) => {
  const { id, points } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id }, // Filter by user ID
      { $inc: { points: points } }, // Update points using $inc to increment/decrement
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

  module.exports.logout_get = (req, res) => {
    res.status('jwt','',{maxAge:1});
};
  module.exports.getById = async (req, res) => {
    const { id } = req.body;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };