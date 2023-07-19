//routes
const pathRoutes = require('./routes/path')
const pointRoutes = require('./routes/point')
const userRoutes = require('./routes/users')
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('./model/User');
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
app.use(express.json());
app.use(cookieParser());


const options = {
    definition: {
        openapi:'3.0.0',
        info : {
            title:'Culture Go API',
            description: 'CultureGo api',
            version: '3.0.0'
        },
    },
    apis: ['routes/users.js','routes/point.js','routes/path.js']
}


const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec));

const checkToken = (req, res, next) => {
  var token;
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];

    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                else {
                    req._id = decoded._id;
                    next();
                }
            }
        )
    }
    };


// First, define the routes that require token authentication
app.use('/users', userRoutes); 
app.use('/paths', checkToken, pathRoutes);
app.use('/points', checkToken, pointRoutes);

app.get('/',(req,res) =>{
    res.send("hello world :)")
});



module.exports=app;