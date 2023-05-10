require('dotenv/config')
const mongoose = require('mongoose');
const connection = require('./dbConnect');
const app = require('./routes');
const bodyParser = require('body-parser');


connection();

app.use(bodyParser.json())
app.listen(process.env.PORT);
module.exports = app;
