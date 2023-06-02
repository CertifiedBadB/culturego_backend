const User = require("../model/User");
const jwt = require('jsonwebtoken');
const axios = require('axios');
//handleerrors
const handleErrors= (err) =>{
    console.log(err.message, err.code);
    let errors = {email: '', password: '', photo: ''}

    if (err.message === "verkeerde email"){
        errors.email = "Ingevoerde gegevens kloppen niet."
    }
    if (err.message === "verkeerde wachtwoord"){
        errors.email = "Ingevoerde gegevens kloppen niet."
    }
    //duplicate error code
if(err.code === 11000){
    errors.email = "Dit email adres heeft al een account bij ons"
    return errors;
}
    //validate errors 
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message
        })
    }
    return errors
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:maxAge});
}


module.exports.signup_post = async(req, res) => {
    const {email, password, photo} = req.body;
    try{
        const user = await User.create({email, password, photo});
        const token = createToken(user._id);
        res.status(201).json({user: user._id})
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
}

module.exports.logout_get = (req, res) => {
    res.status('jwt','',{maxAge:1});
}


module.exports.login_post = async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.login(email,password);
        const token = createToken(user._id);
        res.status(200).json({user:user._id , token: token});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.getByd = async (req, res) => {
    const { id } = req.body;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };