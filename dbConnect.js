const mongoose = require('mongoose');

module.exports = async function connection(){
    
    mongoose.set('strictQuery', true);
    try{
        const connectParams = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: true,
        }

        await mongoose.connect(process.env.DB_CONNECTION,connectParams);
        console.log('connected to db')
    } catch(error){
        console.log(error);
        console.log('could not connect');
    }

   
    
}