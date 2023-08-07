//routes
const pathRoutes = require('./routes/path')
const pointRoutes = require('./routes/point')
const userRoutes = require('./routes/users')
const transactionRoutes = require('./routes/transaction')
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('./model/User');
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
app.use(express.json());
app.use(cookieParser());
const verifyToken = require('./verifyToken');


const options = {
    definition: {
        openapi:'3.0.0',
        info : {
            title:'Culture Go API',
            description: 'CultureGo api',
            version: '3.0.0'
        },
    },
    apis: ['routes/users.js','routes/point.js','routes/path.js','routes/transaction.js']
}


const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec));


app.use('/users', userRoutes);
app.use('/transactions',verifyToken,  transactionRoutes);
app.use('/paths', verifyToken,  pathRoutes);
app.use('/points',verifyToken,  pointRoutes);

//first route

app.get('/',(req,res) =>{
    res.send("hello world :)")
});



module.exports= app